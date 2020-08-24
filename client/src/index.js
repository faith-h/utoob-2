import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { initMiddleware } from 'devise-axios'

initMiddleware()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
          <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)