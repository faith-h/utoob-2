import React from 'react'
import axios from 'axios'
import VideoForm from './VideoForm'
import { AuthConsumer } from '../providers/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

class VideoInfo extends React.Component {
  state = { video: {}, users: [], user: {}, open: false }

  async componentDidMount() {
    try {
      const response = await axios.get(`/videos/${this.props.id}`)
      const video = response.data
      this.setState({ video: video })
    } catch (err) {
      console.log(err.response)
    }
    if (this.state.video !== {}) {
      try {
        const response2 = await axios.get(`/users/${this.state.video.user_id}`)
        const user = response2.data
        this.setState({ user: user })
      } catch (err) {
        console.log(err.response)
      }
    }
  }

  render() {
    const { video, open } = this.state

    return (
      <>
        <div class='section' >
          <p> {video.title} </p>
          {
            this.props.auth.user.id === video.user_id ?
              <>
                <button class='button' style={{ float: 'right', marginLeft: '1rem' }} onClick={() => this.showModal()}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button class='button' style={{ float: 'right' }} onClick={() => this.handleDelete()}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </>
              :
              <button class='button' style={{ float: 'right' }}> Subscribe </button>
          }
          <p> {video.desc} </p>
          <p> {video.user} </p>
          {open ?
            <div class="modal">
              <div class="modal-content">
                <span class="close" onClick={() => this.showModal()}>&times;</span>
                <VideoForm id={video.id} update={this.update} />
              </div>
            </div>
            :
            null
          }
        </div>
      </>
    )
  }
}

const ConnectedVideoInfo = (props) => (
  <AuthConsumer>
    {auth =>
      <VideoInfo {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedVideoInfo