import './App.css'
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import Header from "./components/Header";
// import Books from './components/Books';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Books /> */}
      </div>
    </ApolloProvider>
  );
}
export default App;