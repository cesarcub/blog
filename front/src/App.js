import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Componentes
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
