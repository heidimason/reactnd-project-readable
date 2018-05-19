import React, { Component } from 'react'
import {
  cyanA400,
  grey400, grey500,
  darkBlack, fullBlack
} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import { Link, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import { Tabs, Tab } from 'material-ui/Tabs'
import IconArrow from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import IconComment from 'material-ui/svg-icons/communication/comment'
import Divider from 'material-ui/Divider'
import ScrollableDialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { getCategories } from '../Categories/actions'
import { getPosts, editPost, upvotePost, downvotePost, removePost } from './actions'
import { getComments, editComment, upvoteComment, downvoteComment, removeComment } from '../Comments/actions'
import serializeForm from 'form-serialize'

const styles = {
  iconArrow: {
    cursor: 'pointer',
    verticalAlign: 'middle'
  },
  listItem: {
    color: darkBlack
  }
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

let PostsContainer = makeSelectable(List)

class PostDetails extends Component {
  // Get all categories and posts immediately after component is inserted into DOM
  componentDidMount() {
    const c = window.location.pathname.split("/").pop()

    this.props.getAllCategories()
    this.props.getAllPosts()
    this.props.getAllComments(c)
  }

  state = {
    modalOpen: false
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  changeTitle = e => {
    this.setState({title: e.target.value})
  }

  changeBody = e => {
    this.setState({body: e.target.value})
  }

  editPost = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    const post = Object.assign(values, {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body
    })

    // Dispatch action
    this.props.postEdit(post)

    // Close modal upon submitting form
    this.closeModal()
  }

  editComment = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    const comment = Object.assign(values, {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body
    })

    // Dispatch action
    this.props.commentEdit(comment)

    // Close modal upon submitting form
    this.closeModal()
  }

  render() {
    const { categories, history,
            posts, postUpvote, postDownvote, postRemove,
            comments, commentUpvote, commentDownvote, commentRemove } = this.props,

            showingPosts = posts.filter( post => `/${post.category}/${post.id}` === window.location.pathname ),

            options = {
              weekday: 'short',
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }

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
                  <h2 className="post-heading">
                    <IconArrow
                      hoverColor={cyanA400}
                      style={styles.iconArrow}
                      onClick={ () => {
                        history.goBack()
                      }}/>&nbsp;&nbsp;Post Details
                  </h2>

                  <List className="post-list">
                    {showingPosts.map( (post, index) => (
                      <PostsContainer key={index}>
                        <Subheader
                          style={{color: fullBlack}}>
                          { new Date(post.timestamp).toLocaleString([], options) }

                          <div className="post-icons">
                            <span className="vote-score">{post.voteScore}</span>

                            <IconMoodGood
                              className="icon-mood icon-mood-good"
                              onClick={e => postUpvote(post)}
                            />

                            <IconMoodBad
                              className="icon-mood icon-mood-bad"
                              onClick={e => postDownvote(post)}
                            />

                            <IconComment
                              className="icon-mood"

                            />

                            <IconMenu
                              iconButtonElement={iconButtonElement}
                              style={{float: 'right'}}>
                              <MenuItem style={{color: fullBlack}}
                                onClick={ () => {
                                  this.setState({
                                    modalOpen: true,
                                    id: post.id,
                                    title: post.title,
                                    body: post.body,
                                    author: post.author,
                                    category: post.category
                                  })
                                }}>Edit
                              </MenuItem>

                              { /* TODO: Add confirmation dialog */ }
                              <MenuItem
                                style={{color: fullBlack}}
                                onClick={e => postRemove(post)}>Delete
                              </MenuItem>
                            </IconMenu>
                          </div>
                        </Subheader>

                        <ListItem
                          value={1}
                          disabled={true}
                          leftAvatar={<Avatar>{ post.author ? post.author.charAt(0) : null }</Avatar>}
                          style={styles.listItem}
                          primaryText={post.author}
                          secondaryText={
                            <p>
                              <span style={{color: fullBlack}}>{post.title}</span><br />
                                {post.commentCount} comments
                            </p>
                          }
                          secondaryTextLines={2}
                          initiallyOpen={true}
                          autoGenerateNestedIndicator={false}

                        />

                        {showingPosts.length > 1 &&
                          <Divider inset={false} />
                        }
                      </PostsContainer>
                    ))}
                  </List>

                  {showingPosts.map( (post, index) => (
                    <ScrollableDialog
                        title="Edit Post"
                        actions={
                          <div>
                            <Link to={`/${post.category}/${post.id}`}>
                              <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={this.closeModal}
                                style={{marginRight: 15}}
                              />
                            </Link>

                            <Link to={`/${post.category}/${post.id}`}>
                              <FlatButton
                                label="Submit"
                                primary={true}
                                keyboardFocused={true}
                                onClick={this.editPost}
                                backgroundColor={cyanA400}
                                hoverColor={cyanA400}
                              />
                            </Link>
                          </div>
                        }
                        modal={false}
                        open={this.state.modalOpen}
                        onRequestClose={this.closeModal}
                        autoScrollBodyContent={true}
                        titleStyle={{color: fullBlack}}
                        key={index}>
                        <form>
                          <SelectField
                            floatingLabelText="Category"
                            value={this.state.category}
                            autoWidth={true}
                            menuItemStyle={{color: fullBlack}}
                            className="select-category"
                            disabled={true}>
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
                            floatingLabelText="Author"
                            inputStyle={{color: fullBlack}}
                            style={{marginLeft: 15}}
                            value={this.state.author}
                            disabled={true}
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
                    ))}


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
    posts: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch( getCategories() ),
    getAllPosts: () => dispatch( getPosts() ),
    postEdit: p => dispatch( editPost(p) ),
    postUpvote: p => dispatch( upvotePost(p) ),
    postDownvote: p => dispatch( downvotePost(p) ),
    postRemove: p => dispatch( removePost(p) ),
    getAllComments: c => dispatch( getComments(c) ),
    commentEdit: c => dispatch( editComment(c) ),
    commentUpvote: c => dispatch( upvoteComment(c) ),
    commentDownvote: c => dispatch( downvoteComment(c) ),
    commentRemove: c => dispatch( removeComment(c) )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(PostDetails) )