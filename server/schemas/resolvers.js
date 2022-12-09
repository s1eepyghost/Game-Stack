const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        self: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );
                return userData;
            }

            throw new AuthenticationError('Please log in to get user data');
        },
        users: async (parent, args, context) => {
            return User.find({});
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user registered under that email!');
            }

            const pwCheck = await User.isCorrectPassword(password);

            if (!pwCheck) {
                throw new AuthenticationError('User found, but incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveGame: async (parent, {input}, context) => {
            if (context.user) {
                const userData = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: {savedGames: input}},
                    { new: true, runValidators: true }
                );

                return userData;
            }

            throw new AuthenticationError('You must be logged in to save games to your stack.');
        },
        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const userData = await User.findByIdAndDelete(
                    { _id: context.user._id },
                    { $pull: { savedGames: { gameId: gameId }}},
                    { new: true }
                );

                return userData;
            }

            throw new AuthenticationError('You must be logged in to remove games from your stack.');
        },
        addPlatform: async (parent, { input }, context) => {
            if (context.user) {
                const userData = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedPlatforms: input }},
                    { new: true, runValidators: true }
                );

                return userData;
            }

            throw new AuthenticationError('You must be logged in to save game platforms to your account.');
        },
        removePlatform: async (parent, { platform }, context) => {
            if (context.user) {
                const userData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedPlatforms: platform }},
                    { new: true }
                );

                return userData;
            }

            throw new AuthenticationError('You must be logged in to remove game platforms from your account.');
        }
        
    }
};

module.exports = resolvers;