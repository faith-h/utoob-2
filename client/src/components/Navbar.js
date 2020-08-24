import React from 'react'
import { AuthConsumer } from '../providers/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component {

  openBurger() {
    var x = document.getElementById('topnav')
    if (x.className === 'topnav') {
      x.className += 'responsive'
    } else {
      x.className = 'topnav'
    }
  }

  dropdownItems = () => {
    const { auth: { user, handleLogout } } = this.props

    if (user) {
      return (
        <>
          <div class='dropdown'>
            <button class='dropbtn'>
              <img class='nav-img' alt='user icon' src={user.image} />
            </button>
            <div class='dropdown-content'>
              <a href='/profile'> Profile </a>
              <span class='nav-text' onClick={() => handleLogout(this.props.history)}>
                Logout
              </span>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div class='dropdown'>
            <button class='dropbtn'>
              <img class='nav-img' alt='user icon' src={require('../images/user.png')} />
            </button>
            <div class='dropdown-content'>
              <a href='/login'> Login </a>
              <a href='/register'> Register </a>
            </div>
          </div>
        </>
      )
    }
  }

  render() {

    return (
      <>
        <div class='topnav' id='topnav'>
          <a href='/'>
            <img class='logo' alt='logo' src={require('../images/logo.png')} />
          </a>
          {this.dropdownItems()}
          <a href='/new_video'>
            <button class='button'> Upload video </button>
          </a>
          <FontAwesomeIcon class='icon' icon={faBars} onClick={() => this.openBurger()} />
        </div>
      </>
    )
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth =>
          <Navbar {...this.props} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar)