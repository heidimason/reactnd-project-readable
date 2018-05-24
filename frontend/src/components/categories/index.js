import React, { Component } from 'react'
import { cyanA400, grey500, fullBlack } from 'material-ui/styles/colors'
import { Tabs, Tab } from 'material-ui/Tabs'
import OrderBy from '../SelectField/sort'
import ListPosts from '../Posts'
import AddPostBtn from '../Buttons/floating'
import ScrollableDialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from './actions'
import { getPosts, addPost } from '../Posts/actions'
import serializeForm from 'form-serialize'
import uuid from 'uuid'

class ListCategories extends Component {
  // Get all categories and posts immediately after component is inserted into DOM
  componentDidMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }

  state = {
    tabValue: this.props.location.pathname.split('/')[1], // Category name/path
    postModalOpen: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }

  changeTab = tabValue => {
    this.setState({tabValue})
  }

  openPostModal = () => {
    this.setState({postModalOpen: true})
  }

  closePostModal = () => {
    this.setState({postModalOpen: false})
  }

  changeCategory = (event, index, category) => {
    this.setState({category})
  }

  changeTitle = e => {
    this.setState({title: e.target.value})
  }

  changeAuthor = e => {
    this.setState({author: e.target.value})
  }

  changeBody = e => {
    this.setState({body: e.target.value})
  }

  submitPost = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    const post = Object.assign(values, {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    })

    // Dispatch action
    this.props.add(post)

    // Close modal upon submitting form
    this.closePostModal()
  }

  render() {
    const { categories, history, posts } = this.props,

            actions = [
              <Link to="/">
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onClick={this.closePostModal}
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
        <Tabs
          value={this.state.tabValue}
          onChange={this.changeTab}>
          {categories.map( (category, index) => (
            /* TODO: Fix active tab with browser back button and add icons */
            <Tab
              label={category.name}
              key={index}
              value={category.name}
              onActive={ () => {
                history.push(`/${category.path}`)
              }}>
              <div style={{height: '85vh', overflowY: 'auto'}}>
                <OrderBy />

                <h2 className="post-heading">{category.name}</h2>

                {category.path === 'all' &&
                  <ListPosts showingPosts={posts} />
                }
                {category.path !== 'all' &&
                  <ListPosts showingPosts={posts.filter( post => post.category === category.name )} />
                }
              </div>
            </Tab>
          ))}
        </Tabs>

        <AddPostBtn
          onClick={this.openPostModal}
        />

        <ScrollableDialog
          title="Create Post"
          actions={actions}
          modal={false}
          open={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          autoScrollBodyContent={true}
          titleStyle={{color: fullBlack}}>
          <form>
            <SelectField
              floatingLabelText="Category"
              value={this.state.category}
              onChange={this.changeCategory}
              autoWidth={true}
              menuItemStyle={{color: fullBlack}}
              className="select-category">
              <MenuItem value="react" primaryText="React" />
              <MenuItem value="redux" primaryText="Redux" />
              <MenuItem value="udacity" primaryText="Udacity" />
            </SelectField>

            <TextField
              floatingLabelText="Title"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              value={this.state.title}
              onChange={this.changeTitle}
              className="title-input"
            />

            <TextField
              hintText="Your Name"
              floatingLabelText="Author"
              floatingLabelStyle={{color: grey500}}
              inputStyle={{color: fullBlack}}
              style={{marginLeft: 15}}
              value={this.state.author}
              onChange={this.changeAuthor}
            />

            <TextField
              floatingLabelText="Message"
              floatingLabelStyle={{color: grey500}}
              textareaStyle={{color: fullBlack}}
              multiLine={true}
              rows={2}
              rowsMax={4}
              fullWidth={true}
              value={this.state.body}
              onChange={this.changeBody}
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