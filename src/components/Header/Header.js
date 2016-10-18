import React from 'react'
import { IndexLink, Link } from 'react-router'

import { MenuItem } from 'react-bootstrap'
import DropdownToggle from 'react-bootstrap/lib/DropdownToggle'
import DropdownMenu from 'react-bootstrap/lib/DropdownMenu'
import Dropdown from 'react-bootstrap/lib/Dropdown'

import classNames from 'classnames'

import styles from './Header.scss'
import ZcLogoImage from './assets/zc_logo.png'

class Header extends React.Component {
  render () {
    return (
      <div className='row border-bottom'>
        <nav role='navigation' className='navbar navbar-static-top' style={{marginBottom: 0}}>
          <div className={classNames(styles.navbarHeader, 'navbar-header')}>
            <IndexLink to='/' className='navbar-brand'><img src={ZcLogoImage} style={{height: 40 + 'px'}} /></IndexLink>
          </div>
          <ul className='nav navbar-top-links navbar-right'>
            <li><span className='m-r-sm text-muted welcome-message'>阿波罗Demo</span></li>
            <Dropdown componentClass='li' id='alerts-bar-dropdown'>
              <DropdownToggle useAnchor noCaret className='count-info'>
                <i className='fa fa-bell' /><span className='label label-primary'>8</span>
              </DropdownToggle>
              <DropdownMenu className='dropdown-alerts'>
                <MenuItem eventKey='1' href='mailbox.html'>
                  <div>
                    <i className='fa fa-envelope fa-fw' /> You have 16 messages
                    <span className='pull-right text-muted small'>4 minutes ago</span>
                  </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='2' href='profile.html'>
                  <div>
                    <i className='fa fa-twitter fa-fw' /> 3 New Followers
                    <span className='pull-right text-muted small'>12 minutes ago</span>
                  </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='2' href='notifications.html'>
                  <div className='text-center link-block'>
                    <strong>See All Alerts</strong>
                    <i className='fa fa-angle-right' />
                  </div>
                </MenuItem>
              </DropdownMenu>
            </Dropdown>
            <li><Link to='/counter'><i className='fa fa-sign-out' /> Log out</Link></li>
            <li><a className='right-sidebar-toggle'><i className='fa fa-tasks' /></a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

Header.propTypes = {

}

export default Header
