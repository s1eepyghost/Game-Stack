import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home"
import About from "./Pages/About"
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
  const API_KEY = process.env.REACT_APP_API_KEY
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
            <Route
              path="/"
              element={<Navbar />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/about"
              element={<About />}
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