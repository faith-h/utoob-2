import React from 'react'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../providers/AuthProvider'

class Login extends React.Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.auth.handleLogin({ email, password }, this.props.history)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state

    return (
      <>
        <div class='login-box'>
          <h1> Login </h1>
          <form onSubmit={this.handleSubmit}>
            <p> E-mail </p>
            <input
              class='login-input'
              required
              type='text'
              name='email'
              value={email}
              placeholder='E-mail'
              onChange={this.handleChange}
            />
            <p> Password </p>
            <input
              class='login-input'
              required
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={this.handleChange}
            />
            <input class='login-submit' type='submit' name='' value='Login' />
          </form>

          <Link
            to='/register'
            style={{ textDecoration: 'none' }}
          >
            <p class='register'>
              Don't have an account? Register here.
            </p>
          </Link>
        </div>
      </>
    )
  }
}

export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}