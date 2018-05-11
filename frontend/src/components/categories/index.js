import React, { Component } from 'react'
import { cyanA400, grey500, fullBlack } from 'material-ui/styles/colors'
import { Tabs, Tab } from 'material-ui/Tabs'
import OrderBy from '../SelectField/sort'
import ListPosts from '../Posts'
import AddPostBtn from '../Buttons/floating'
import ScrollableDialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from './actions'
import { getPosts } from '../Posts/actions'
import { addPost } from '../Posts/actions'
import serializeForm from 'form-serialize'
import uuid from 'uuid'

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
  // Get all categories and posts immediately after component is inserted into DOM
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

  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  submitPost = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })
    console.log(values)

    const post = Object.assign(values, {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.value
    })

    // Dispatch action
    this.props.add(post)

    // Close modal upon submitting form
    this.closeModal()
  }

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
                  onClick={this.submitPost}
                  backgroundColor={cyanA400}
                  hoverColor={cyanA400}
                />
              </Link>
            ]

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
                <OrderBy />

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
          <form>
            <TextField
              floatingLabelText="Title"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              value={this.state.title}
              onChange={this.handleChange}
            />

            <TextField
              hintText="Your Name"
              floatingLabelText="Author"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              style={{marginLeft: 15}}
            />

            <TextField
              floatingLabelText="Message"
              floatingLabelStyle={{color: grey500}}
              textareaStyle={{color: fullBlack}}
              multiLine={true}
              rows={2}
              rowsMax={4}
              fullWidth={true}
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
    getAllPosts: () => dispatch( getPosts() ),
    add: post => dispatch ( addPost(post) )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ListCategories) )