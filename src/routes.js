import React from 'react';


const Dashboard = React.lazy(() => import('./views/Page/Dashboard/Dashboard'));
const login = React.lazy(() => import('./views/Page/Login/Login'));
const Employeelist = React.lazy(() => import('./views/Page/Employeelist/Employeelist'));
const Employeeasset = React.lazy(() => import('./views/Page/Employeeasset/Employeeasset'));
const Assetlist = React.lazy(() => import('./views/Page/Assetlist/Assetlist'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: null},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component:login },
  { path: '/theme', exact: true, name: 'Theme', component: Employeelist },
  { path: '/employeelist', name: 'Employeelist', component: Employeelist },
  { path: '/employeeasset', name: 'Employeeasset', component: Employeeasset },
  { path: '/assetlist', name: 'Assetlist', component: Assetlist },
  
];

export default routes;
