import React from 'react'
import axios from 'axios'
import { AuthConsumer } from '../providers/AuthProvider'
import Iframe from 'react-iframe'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserForm from './UserForm'

class Profile extends React.Component {
  state = { user: {}, videos: [], open: false }

  componentDidMount() {
    axios.get(`/users/${this.props.auth.user.id}`)
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

  showModal = () => this.setState({ open: !this.state.open })

  update = (data) => {
    this.setState({ user: data })
    this.showModal()
  }

  render() {
    const { user, open } = this.state
    
    return (
      <>
        {open ?
          <div class='modal'>
            <div class='modal-content'>
              <span class='close' onClick={() => this.showModal()}>&times;</span>
              <UserForm id={user.id} update={this.update} />
            </div>

          </div>
          :
          null
        }
        <div style={{ textAlign: 'center' }}>
          <div class='section' style={{ display: 'inline-block' }}>
            <button class='button' style={{ float: 'right' }} onClick={() => this.showModal()}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <img alt='User avatar' class='user-img' style={{ height: '8rem', width: '8rem' }} src={user.image} />
            <p> {user.name} </p>
            <p> {user.email} </p>
          </div>

          <div class='section'>
            <p style={{ fontSize: '1.5rem' }} > My Videos </p>
            <div class='grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {this.showVideos()}
            </div>
          </div>
          {/* TODO: add subscribe functionality */}
          {/* <div class='section'>
          <p style={{ fontSize: '1.5rem' }} > Subscriptions </p>
          <div class='grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          </div>
        </div> */}
        </div>
      </>
    )
  }
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    {auth =>
      <Profile {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile