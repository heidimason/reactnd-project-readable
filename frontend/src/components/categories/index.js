import React, { Component } from 'react'
import { cyanA400, grey500, fullBlack } from 'material-ui/styles/colors'
import { Tabs, Tab } from 'material-ui/Tabs'
import SortBy from '../SelectField/sort'
import ListPosts from '../Posts'
// import sortBy from 'sort-by'
import AddPostBtn from '../Buttons/floating'
import ScrollableDialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
// import serializeForm from 'form-serialize'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from './actions'
import { getPosts } from '../Posts/actions'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 25,
    marginBottom: 25,
    fontWeight: 400,
    textTransform: 'capitalize'
  }
}

class ListCategories extends Component {
  // Get all categories immediately after component is inserted into DOM
  componentDidMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }

  state = {
    modalOpen: false
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   const values = serializeForm(e.target, { hash: true })
  //   console.log(values)

  //   if (this.props.onCreatePost)
  //     this.props.onCreatePost(values)
  // }

  render() {
    const { categories, history, posts } = this.props,

            actions = [
              <Link to="/">
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onClick={this.closeModal}
                  style={{marginRight: 15}}
                />
              </Link>,

              <Link to="/">
                <FlatButton
                  label="Submit"
                  primary={true}
                  keyboardFocused={true}
                  onClick={this.closeModal}
                  backgroundColor={cyanA400}
                  hoverColor={cyanA400}
                />
              </Link>
            ]

    // posts.sort(sortBy('timestamp')) // Default

    return (
      <div style={{width: '75%'}}>
        <Tabs>
          {categories.map( (category, index) => (
            /* TODO: Fix active tab with browser back button */
            <Tab
              label={category.name}
              key={index}
              data-route={category.path}
              onActive={ path => {
                history.push('/' + category.path)
              }}>
              <div>
                <SortBy />
                <h2 style={styles.headline}>{category.name}</h2>

                { /* TODO: Show all posts at '/' and do not show post padding when there is no post! */ }
                {category.path === 'all' &&
                  <ListPosts showingPosts={posts}/>
                }
                {category.path !== 'all' &&
                  <ListPosts showingPosts={posts.filter( post => post.category === category.name )}/>
                }
              </div>
            </Tab>
          ))}
        </Tabs>

        <Link to="new-post">
          <AddPostBtn
            onClick={this.openModal}
          />
        </Link>

        <ScrollableDialog
          title="Create Post"
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.closeModal}
          autoScrollBodyContent={true}
          titleStyle={{color: fullBlack}}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="Title"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              name="title"
            />

            <TextField
              hintText="Your Name"
              floatingLabelText="Author"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              style={{marginLeft: 15}}
              name="author"
            />

            <TextField
              floatingLabelText="Message"
              floatingLabelStyle={{color: grey500}}
              textareaStyle={{color: fullBlack}}
              multiLine={true}
              rows={2}
              rowsMax={4}
              fullWidth={true}
              name="body"
            />
          </form>
        </ScrollableDialog>
      </div>
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ListCategories) )