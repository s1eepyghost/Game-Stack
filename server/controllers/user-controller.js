const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: "Cannot fond a user with that ID"});
        }

        res.json(foundUser);
    },
    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Oh no! How did this happen?!' });
        }

        const token = signToken(user);
        res.json({ token, user });
    },
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
            return res.status(400).json({ message: 'Cannot find user specified!' });
        }

        const pwCheck = await User.isCorrectPassword(body.password);

        if (!pwCheck) {
            return res.status(400).json({ message: 'User found, but incorrect password! '});
        }

        const token = signToken(user);
        res.json({ token, user });        
    },
    async saveGame({ user, body }, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedGames: body }},
                { new: true, runValidators: true }
            );

            return res.json(updatedUser);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    async deleteGame({ user, params}, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedGames: { gameId: params.gameId }}},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'Could not find user with id!'});
        }

        return res.json(updatedUser);
    },
    //Way to add game systems to a user. Display on their shelf/profile, probably? -JL
    async addPlatform({ user, body }, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedPlatforms: body.name }},
                { new: true }
            );
            
            return res.json(updatedUser);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);            
        }
    },
    async removePlatform({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedPlatforms: params.name }},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'Could not find user with id!'});
        }

        return res.json(updatedUser);
    }
};