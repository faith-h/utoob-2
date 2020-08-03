import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Iframe from 'react-iframe'

class Channel extends React.Component {
  state = { user: {}, videos: [] }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/users/${id}`)
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
    axios.get(`/videos`)
      .then(res => {
        this.setState({ videos: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  showVideos = () => {
    return this.state.videos.map(v => (
      <>
        {v.user_id === this.state.user.id ?
          <>
            <div>
              <Link class='link' key={v.id} to={`/videos/${v.id}`}>
                <p> {v.title} </p>
              </Link>
              <Iframe src={v.trailer} />
            </div>
          </>
          :
          null
        }
      </>
    ))
  }

  render() {
    const { user } = this.state
    
    return (
      <>
        <div style={{ textAlign: 'center' }}>

          <div class='section' style={{ display: 'inline-block' }}>
            <img alt='User avatar' class='user-img' style={{ height: '8rem', width: '8rem' }} src={user.image} />
            <p> {user.name} </p>
            <p> {user.email} </p>
          </div>

          <div class='section'>
            <p style={{ fontSize: '1.5rem' }} > {user.name}'s Videos </p>
            <div class='grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {this.showVideos()}
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default Channel