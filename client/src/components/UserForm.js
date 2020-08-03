import React from 'react'
import axios from 'axios'

class UserForm extends React.Component {
  state = { name: '', image: '' }

  componentDidMount() {
    const { id } = this.props
    if (id)
      axios.get(`/users/${id}`)
        .then(res => {
          this.setState({ name: res.data.name, image: res.data.desc })
        })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const user = { ...this.state }
    const { id, update } = this.props
    axios.put(`/users/${id}`, user)
      .then(res => {
        update(res.data)
      })
  }

  render() {
    const { name, image } = this.state

    return (
      <>
        <div class='register-box'>
          <h1> Edit Profile </h1>
          <form onSubmit={this.handleSubmit} >
            <p> Name </p>
            <input
              class='login-input'
              required
              autoFocus
              type='text'
              name='name'
              value={name}
              placeholder='Name'
              onChange={this.handleChange}
            />
            <p> Image </p>
            <input
              class='login-input'
              required
              type='text'
              name='image'
              value={image}
              placeholder='Image URL'
              onChange={this.handleChange}
            />
            <input class='login-submit' type='submit' value='Submit' />
          </form>
        </div>
      </>
    )
  }
}

export default UserForm