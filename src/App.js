import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Cookies from 'universal-cookie';
import './App.scss';
const cookies = new Cookies();
var islogged
if(cookies.get('Employee Code')){
  islogged=true;

}
else{
  islogged=false;
  
}

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout/DefaultLayout'),
  loading
});


const Login = Loadable({
  loader: () => import('./views/Page/Login/Login'),
  loading
});



class App extends Component {

  render() {
    return (
     
      <HashRouter>
       
        <Switch>
         {!islogged?(<Route  path="/" name="Login Page" component={Login} />):
          (<Route path="/" name="Home" component={DefaultLayout} />)}
          {/* <Route path="/" name="Home" component={DefaultLayout} /> */}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
