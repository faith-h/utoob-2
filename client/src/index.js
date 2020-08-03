import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { initMiddleware } from 'devise-axios'

initMiddleware()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)