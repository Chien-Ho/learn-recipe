
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './context/AuthContext'
import RecipeContextProvider from './context/RecipeContext'
import Dashboard from './views/Dashboard'
import About from './views/About'
import PrivateRoute from './components/routing/PrivateRoute'
function App() {
  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/login' render={props => <Auth {...props} authRoute='login'></Auth>}></Route>
            <Route exact path='/register' render={props => <Auth {...props} authRoute='register'></Auth>}></Route>
            <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>

          </Switch>
        </Router>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
