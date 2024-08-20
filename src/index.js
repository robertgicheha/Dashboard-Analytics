import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import ExampleComponent from './ExampleComponent';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ExampleComponent />
  </ApolloProvider>,
  document.getElementById('root')
);
