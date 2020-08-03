import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Channel from './components/Channel'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NoMatch from './components/NoMatch'
import Video from './components/Video'
import VideoForm from './components/VideoForm'
import FetchUser from './components/FetchUser'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'

const App = () => (
  <>
  <FetchUser>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/videos/:id' component={Video} />
      <Route exact path='/users/:id' component={Channel} />
      <ProtectedRoute exact path='/new_video' component={VideoForm} />
      <ProtectedRoute exact path='/profile' component={Profile} />
      <Route component={NoMatch} />
    </Switch>
  </FetchUser>
  </>
)

export default App