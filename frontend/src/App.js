import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './component/Main'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div style={{ fontSize: "15px" }}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </div>
        </ApolloProvider>
    );
}

export default App;