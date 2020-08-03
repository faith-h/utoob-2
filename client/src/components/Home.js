import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Iframe from 'react-iframe'

class Home extends React.Component {
  state = { videos: [] }

  componentDidMount() {
    axios.get(`/videos`)
      .then(res => {
        this.setState({ videos: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  showVideos = () => {
    return this.state.videos.map(v => (v.id === 1 ?
      <Link class='link' key={v.id} to={`/videos/${v.id}`}>
        <Iframe className='grid-item' url={v.trailer} />
        <p> {v.title} </p>
      </Link>
      :
      <Link class='link' key={v.id} to={`/videos/${v.id}`}>
        <Iframe className='link-frame' url={v.trailer} />
        <p> {v.title} </p>
      </Link>
    ))
  }

  render() {

    return (
      <>
        <div class='home-container'>
          <p style={{ fontSize: '1.5rem' }}> All Videos </p>
          <div class='grid'>
            {this.showVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default Home