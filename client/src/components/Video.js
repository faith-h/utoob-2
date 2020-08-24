import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../providers/AuthProvider'
import Iframe from 'react-iframe'
import CommentForm from './CommentForm'
import VideoForm from './VideoForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

class Video extends React.Component {
  state = { video: {}, comments: [], videos: [], open: false, video_user: {} }

  async componentDidMount() {
    const { id } = this.props.match.params
    try {
      const response = await axios.get(`/videos/${id}`)
      const video = response.data
      this.setState({ video: video })
    } catch (err) {
      console.log(err.response)
    }
    try {
      const response2 = await axios.get(`/videos/${id}/comments`)
      const comments = response2.data
      this.setState({ comments: comments })
    } catch (err) {
      console.log(err.response)
    }
    try {
      const response3 = await axios.get(`/videos/`)
      const videos = response3.data
      this.setState({ videos: videos })
    } catch (err) {
      console.log(err.response)
    }
    if (this.state.video !== {}) {
      try {
        const response4 = await axios.get(`/users/${this.state.video.user_id}`)
        const video_user = response4.data
        this.setState({ video_user: video_user })
      } catch (err) {
        console.log(err.response)
      }
    }
  }

  // reload video data when clicking on another video
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.location.reload();
    }
  }

  update = (data) => {
    this.setState({ video: data })
    this.showModal()
  }

  handleDelete = () => {
    const { id } = this.props.match.params
    axios.delete(`/videos/${id}`)
      .then(res => {
        this.props.history.push("/")
      })
  }

  addComment = (comment) => {
    this.setState({ comments: [comment, ...this.state.comments] })
  }

  deleteComment = (id) => {
    const { comments } = this.state
    axios.delete(`/videos/${this.props.match.params.id}/comments/${id}`)
      .then(() => this.setState({ comments: comments.filter(c => c.id !== id) }))
  }

  showComments = () => {
    return this.state.comments.map(c => (
      <>
        <div style={{ boxShadow: 'none' }} class='section'>
          <Link key={c.id} class='link' to={`/users/${c.user_id}`}>
            <img alt='User avatar' class='user-img' src={c.user_image} />
          </Link>
          {this.props.auth.user !== null &&
            this.props.auth.user.id === c.user_id ?
            <>
              <button class='button' style={{ float: 'right' }} onClick={() => this.deleteComment(c.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </>
            :
            null
          }
          <span> {c.user_name} </span>
          <p> {c.body} </p>
        </div>
      </>
    ))
  }

  otherVideos = () => {
    const { videos } = this.state
    const other_videos = videos.slice(-5);
    return other_videos.map(v => (
      <>
        <Link className='link' key={v.id} to={`/videos/${v.id}`}>
          <Iframe className='link-frame' url={v.trailer} />
          <p> {v.title} </p>
        </Link>
      </>
    ))
  }

  showModal = () => this.setState({ open: !this.state.open })

  showVideoUser = () => {
    const { video } = this.state
    const { auth: { user } } = this.props;

    if (user) {
      return (
        <>
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
              null
          }
        </>
      )
    } else {
      return (
        // TODO: add subscribe functionality
        // <button class='button' style={{ float: 'right' }} onClick={() => this.props.history.push("/login")}> Subscribe </button>
        null
      )
    }
  }

  render() {
    const { video, open, video_user } = this.state

    return (
      <>
        <Iframe className='frame' src={video.trailer} />

        <div style={{ textAlign: 'center' }}>
          <div class='section' >
            <Link to={`/users/${video_user.id}`}>
              <img alt='User avatar' class='user-img' style={{ height: '3rem' }} src={video_user.image} />
            </Link>
            {this.showVideoUser()}
            <p> {video.title} </p>
            <p style={{ color: 'grey' }}> {video_user.name} </p>
            <p style={{ marginLeft: '4.5rem' }}> {video.desc} </p>

            {open ?
              <div class="modal">
                <div class="modal-content">
                  <div class="close" onClick={() => this.showModal()} >&times;</div>
                  <VideoForm id={video.id} update={this.update} />
                </div>
              </div>
              :
              null
            }
          </div>

          <div class='row'>
            <div class='column left'>
              <CommentForm add={this.addComment} video_id={video.id} />
              {this.showComments()}
            </div>
            <div class='column right'>
              <p style={{ fontSize: '1.5rem' }}> Other Videos </p>
              {this.otherVideos()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

const ConnectedVideo = (props) => (
  <AuthConsumer>
    {auth =>
      <Video {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedVideo