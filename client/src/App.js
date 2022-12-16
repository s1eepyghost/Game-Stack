import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Games from "./Pages/Games"
import Profile from "./Pages/Profile";
import React, { lazy, Suspense } from "react"

// const Home = lazy(() => import("./Components/Home"))

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Navbar />
        <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/games"
              element={<Games />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
        </Routes>  
      </Router>
    </ApolloProvider>  
  )
}

export default App