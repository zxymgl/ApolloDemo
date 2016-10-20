import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

function mapStateToProps (state) {
  return {
    ...state
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
    dispatch
  }
}
const Loading = () => (
  <div>
    <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
  </div>
)
const DataTable = (props) => {
  let {viewer} =props
  let {myrepository} = viewer
  return(
    <table className='table table-bordered'>
      <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>name</td>
        <td>{viewer.name}</td>
      </tr>
      <tr>
        <td>avatarURL</td>
        <td>{viewer.avatarURL}</td>
      </tr>
      <tr>
        <td>company</td>
        <td>{viewer.company}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{viewer.email}</td>
      </tr>
      <tr>
        <td>login</td>
        <td>{viewer.login}</td>
      </tr>
      <tr>
        <td>myrepository_path</td>
        <td>{viewer.path}</td>
      </tr>
      <tr>
        <td>myrepository_name</td>
        <td>{myrepository.name}</td>
      </tr>
      <tr>
        <td>myrepository_projectsPath</td>
        <td>{myrepository.projectsPath}</td>
      </tr>
      <tr>
        <td>myrepository_url</td>
        <td>{myrepository.url}</td>
      </tr>
      <tr>
        <td>myrepository_description</td>
        <td>{myrepository.description}</td>
      </tr>
      <tr>
        <td>isViewer</td>
        <td>{viewer.location}</td>
      </tr>
      </tbody>
    </table>
)}
class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }
  }
  render () {
    console.log(this.props)
    let {viewer,loading} = this.props

    return (
      <div>
        <h4>Welcome!</h4>
        <div style={{ zIndex: 1000, position: 'relative' }}>
          <h1>this some Data</h1>
          {loading ? <Loading /> : null}
          {viewer ? <DataTable viewer ={viewer} /> : null}
        </div>
      </div>
    )
  }

}
const HOME_QUERY = gql`
query getOrganization($name: String!) {
  viewer {
    name
    avatarURL
    company
    email
    login
    location
    myrepository: repository(name: $name) {
      path
      name
      projectsPath
      url
      description
    }
  }
}
`

const withData = graphql(HOME_QUERY, {
  // ownProps are the props that are passed into the `ProfileWithData`
  // when it is used by a parent component {
  options(props) {
    return {
      variables: {
        name: 'ApolloDemo'
      },
      forceFetch: true,
    };
  },
  props: ({ ownProps, data: { viewer, refetch ,loading} }) => ({
    loading,
    viewer: viewer
  })
})


export default connect(mapStateToProps,mapDispatchToProps)(withData(HomeView))
