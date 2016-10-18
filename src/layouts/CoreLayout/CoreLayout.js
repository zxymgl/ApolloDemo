import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import styles from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div id="page-wrapper" className="gray-bg" style={{marginLeft: 0}}>
    <Header />
    <div className="row border-bottom white-bg">
      {children}
    </div>
    <Footer />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
