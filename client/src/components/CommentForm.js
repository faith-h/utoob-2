import React from 'react'
import axios from 'axios'
import { AuthConsumer } from '../providers/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

class CommentForm extends React.Component {
  state = { body: '', user_id: 0, user_name: '', user_image: '' }

  componentDidMount() {
    const { id, video_id } = this.props
    if (id && video_id)
      axios.get(`/videos/${video_id}/comments/${id}`)
        .then(res => {
          this.setState({ body: res.data })
        })
        .catch(err => {
          console.log(err.response)
        })
  }

  handleChange = (e) => {
    const { user } = this.props.auth
    this.setState({ body: e.target.value })
    this.setState({ user_id: user.id })
    this.setState({ user_name: user.name })
    this.setState({ user_image: user.image })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const comment = { ...this.state }
    const { video_id } = this.props
    axios.post(`/videos/${video_id}/comments`, comment)
      .then(res => {
        this.props.add(res.data)
      })
    this.setState({ body: '' })
  }

  render() {
    const { body } = this.state

    return (
      <>
        <div style={{ boxShadow: 'none' }} class='section'>
          {this.props.auth.user !== null ?
            <>
              <img alt='User avatar' class='user-img' src={this.props.auth.user.image} />
              <form onSubmit={this.handleSubmit} >
                <input
                  required
                  class='comment-input'
                  type='text'
                  name='body'
                  value={body}
                  placeholder='Add a public comment'
                  onChange={this.handleChange}
                />
                <button
                  class='button'
                  type='submit'
                  style={{ float: 'right', background: 'white', color: 'grey', marginTop: '0.25rem' }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </>
            :
            <>
              <img class='user-img' alt='User icon' src={require('../images/user.png')} />
              <form>
                <input
                  class='comment-input'
                  type='text'
                  name='body'
                  value={body}
                  placeholder='Add a public comment'
                  onChange={this.handleChange}
                />
                <button
                  class='button'
                  onClick={() => this.props.history.push("/login")}
                  style={{ float: 'right', background: 'white', color: 'grey', marginTop: '0.25rem' }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </>
          }
        </div>
      </>
    )
  }
}

const ConnectedCommentForm = (props) => (
  <AuthConsumer>
    {auth =>
      <CommentForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedCommentForm