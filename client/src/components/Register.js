import React from 'react'
import { AuthConsumer } from '../providers/AuthProvider'

class Register extends React.Component {
  state = { name: '', email: '', password: '', passwordConfirmation: '', image: 'https://res.cloudinary.com/dddst4ppd/image/upload/v1595787821/user_mo23jq.png' }

  handleSubmit = (e) => {
    e.preventDefault()
    const { password, passwordConfirmation } = this.state
    const { auth: { handleRegister }, history } = this.props

    if (password === passwordConfirmation)
      handleRegister({ ...this.state }, history)
    else
      alert('Passwords do not match.')
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { name, email, password, passwordConfirmation } = this.state

    return (
      <>
        <div class='register-box'>
          <h1> Register </h1>
          <form onSubmit={this.handleSubmit}>
            <p> Username </p>
            <input
              class='login-input'
              label='Username'
              required
              autoFocus
              name='name'
              value={name}
              placeholder='Username'
              onChange={this.handleChange}
            />
            <p> E-mail </p>
            <input
              class='login-input'
              label='Email'
              required
              autoFocus
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
            <p> Password </p>
            <input
              class='login-input'
              required
              label='Password'
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={this.handleChange}
            />
            <p> Password Confirmation </p>
            <input
              class='login-input'
              label='Password Confirmation'
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              placeholder='Password Confirmation'
              type='password'
              onChange={this.handleChange}
            />
            <input
              class='login-submit'
              type='submit'
            />
          </form>
        </div>
      </>
    )
  }
}

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}