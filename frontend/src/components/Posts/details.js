import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { Link, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import { Tabs, Tab } from 'material-ui/Tabs'
import ListPosts from '../Posts'
import { connect } from 'react-redux'
import { getCategories } from '../Categories/actions'
import { getPosts } from './actions'

class PostDetails extends Component {
  // Get all categories and posts immediately after component is inserted into DOM
  componentDidMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }

  render() {
    const { categories, history, posts } = this.props,

            showingPosts = posts.filter( post => `/${post.category}/${post.id}` === window.location.pathname )

    return (
      <AppBar
        title="Readable"
        iconElementLeft={
          <Link to="/">
          	<IconButton>
          		<ActionHome />
          	</IconButton>
          </Link>
        }
        children={
        	<div style={{width: '75%'}}>
              <Tabs>
                {categories.map( (category, index) => (
                  /* TODO: Fix active tab with browser back button and add icons */
                <Tab
                  label={category.name}
                  key={index}
                  data-route={category.path}
                  onActive={ () => {
                    history.push(`/${category.path}`)
                  }}>
                  <h2 className="post-heading">Post Details</h2>

                  <ListPosts showingPosts={showingPosts} />
                </Tab>
              ))}
            </Tabs>
          </div>
        }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch( getCategories() ),
    getAllPosts: () => dispatch( getPosts() )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(PostDetails) )