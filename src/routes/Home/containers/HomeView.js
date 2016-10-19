import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Select = () => (
  <div>
    <h4>this a Select </h4>
  </div>
)
class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h4>Welcome!</h4>
        <div style={{ zIndex: 1000, position: 'relative' }}>
        </div>
      </div>
    )
  }

}
const HOME_QUERY = gql`
query {
  viewer {
    login
  }
}
`

const withData = graphql(HOME_QUERY)


export default withData(HomeView)
