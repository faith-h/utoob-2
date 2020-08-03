import React from 'react'
import axios from 'axios'

class VideoForm extends React.Component {
  state = { title: '', desc: '', trailer: '' }

  componentDidMount() {
    const { id } = this.props
    if (id)
      axios.get(`/videos/${id}`)
        .then(res => {
          this.setState({ title: res.data.name, desc: res.data.desc, trailer: res.data.trailer })
        })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const video = { ...this.state }
    const { id, update } = this.props
    if (id) {
      axios.put(`/videos/${id}`, video)
        .then(res => {
          update(res.data)
        })
    } else {
      axios.post(`/videos/`, video)
        .then(res => {
          this.props.history.push(`/`)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }

  render() {
    const { title, desc, trailer } = this.state
    const { id } = this.props

    return (
      <>
        <div class='login-box' style={{ height: '35rem' }}>
          {id ?
            <h1> Edit Video </h1>
            :
            <h1> Upload Video </h1>
          }
          <form onSubmit={this.handleSubmit} >
            <p> Title </p>
            <input
              class='login-input'
              required
              autoFocus
              type='text'
              name='title'
              value={title}
              placeholder='Title'
              onChange={this.handleChange}
            />
            <p> Description </p>
            <input
              class='login-input'
              required
              type='text'
              name='desc'
              value={desc}
              placeholder='Description'
              onChange={this.handleChange}
            />
            <p> URL </p>
            <input
              class='login-input'
              required
              type='text'
              name='trailer'
              value={trailer}
              placeholder='URL'
              onChange={this.handleChange}
            />
            <input class='login-submit' type='submit' value='Submit' />
          </form>
        </div>
      </>
    )
  }
}

export default VideoForm