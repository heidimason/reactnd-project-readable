import React, { Component } from 'react'
import {
  CategoriesDiv,
  PostsDiv,
  PostHeading,
  PostIconsDiv,
  VoteScoreSpan,
  PostTitleSpan,
  postList
} from '../../utils/styles'
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
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import IconComment from 'material-ui/svg-icons/communication/comment'
import CommentDetails from '../Comments/details'
import Divider from 'material-ui/Divider'
import ScrollableDialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { getCategories } from '../Categories/actions'
import { getPosts, editPost, upvotePost, downvotePost, removePost } from './actions'
import { addComment } from '../Comments/actions'
import serializeForm from 'form-serialize'
import uuid from 'uuid'

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
    this.props.getAllCategories()
    this.props.getAllPosts()
  }

  state = {
    tabValue: this.props.location.pathname.split('/')[1], // Category name/path
    postModalOpen: false,
    commentModalOpen: false,
    author: '',
    body: ''
  }

  closePostModal = () => {
    this.setState({postModalOpen: false})
  }

  openCommentModal = () => {
    // So "Add Comment" fields are not filled with "Edit Post" values
    this.setState({
      author: '',
      body: ''
    })

    this.setState({commentModalOpen: true})
  }

  closeCommentModal = () => {
    this.setState({commentModalOpen: false})
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
    this.closePostModal()
  }

  // TODO: Add form validations
  submitComment = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    const comment = Object.assign(values, {
      id: uuid(),
      parentId: this.props.location.pathname.split('/').pop(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author
    })

    // Dispatch action
    this.props.add(comment)

    // Close modal upon submitting form
    this.closeCommentModal()

    // Reset fields
    this.setState({
      body: '',
      author: ''
    })
  }

  render() {
    const { categories, history, location, posts, postUpvote, postDownvote, postRemove } = this.props,

            showingPosts = posts.filter( post => `/${post.category}/${post.id}` === location.pathname ),

            options = {
              weekday: 'short',
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            },

            // Edit post
            postActions = [
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closePostModal}
                style={{marginRight: 15}}
              />,

              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.editPost}
                backgroundColor={cyanA400}
                hoverColor={cyanA400}
              />
            ],

            // Submit comment
            commentActions = [
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeCommentModal}
                style={{marginRight: 15}}
              />,

              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submitComment}
                backgroundColor={cyanA400}
                hoverColor={cyanA400}
              />
            ]

    return (window.innerWidth > 767 ?
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
        	<CategoriesDiv>
              <Tabs value={this.state.tabValue}>
                {categories.map( (category, index) => (
                  /* TODO: Fix active tab with browser back button and add icons */
                <Tab
                  label={category.name}
                  key={index}
                  value={category.name}
                  onActive={ () => {
                    history.push(`/${category.path}`)
                  }}>
                  <PostsDiv>
                    <PostHeading>Post Details</PostHeading>

                    {showingPosts.length !== 0 ?
                      <List style={postList}>
                        {showingPosts.map( (post, index) => (
                          <PostsContainer key={index}>
                            <Subheader style={{color: fullBlack}}>
                              { new Date(post.timestamp).toLocaleString([], options) }

                              <PostIconsDiv>
                                <VoteScoreSpan>{post.voteScore}</VoteScoreSpan>

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
                                  onClick={this.openCommentModal}
                                />

                                <IconMenu
                                  iconButtonElement={iconButtonElement}
                                  style={{float: 'right'}}>
                                  <MenuItem style={{color: fullBlack}}
                                    onClick={ () => {
                                      this.setState({
                                        postModalOpen: true,
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
                              </PostIconsDiv>
                            </Subheader>

                            <ListItem
                              value={1}
                              disabled={true}
                              leftAvatar={
                                <Avatar
                                  src={`/logos/${post.category}.svg`}
                                  style={{backgroundColor: grey500}}
                                  alt={`${post.category} logo`}
                                />
                              }
                              innerDivStyle={{color: darkBlack}}
                              primaryText={post.author}
                              secondaryText={
                                <p>
                                  <PostTitleSpan style={{color: fullBlack}}>{post.title}</PostTitleSpan>
                                    {post.commentCount}
                                    {post.commentCount === 1 ? ' comment' : ' comments'}
                                </p>
                              }
                              secondaryTextLines={2}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                              nestedItems={[
                                <ListItem value={2}
                                  disabled={true}
                                  primaryText={post.body}
                                  innerDivStyle={{color: fullBlack}}
                                  initiallyOpen={true}
                                  autoGenerateNestedIndicator={false}
                                  nestedItems={[
                                    <ListItem disabled={true}>
                                      <CommentDetails />
                                    </ListItem>
                                  ]}>
                                </ListItem>
                              ]}
                            />

                            {showingPosts.length > 1 &&
                              <Divider />
                            }
                          </PostsContainer>
                        ))}
                      </List>
                      :
                      <p>Nothing to see here!</p>
                    }
                  </PostsDiv>

                  {showingPosts.map( (post, index) => (
                    <ScrollableDialog
                      title="Edit Post"
                      actions={postActions}
                      modal={false}
                      open={this.state.postModalOpen}
                      onRequestClose={this.closePostModal}
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
                            className="input-title-post"
                          />

                          <TextField
                            floatingLabelText="Author"
                            inputStyle={{color: fullBlack}}
                            value={this.state.author}
                            disabled={true}
                            className="input-author-post"
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

                    <ScrollableDialog
                      title="Add Comment"
                      actions={commentActions}
                      modal={false}
                      open={this.state.commentModalOpen}
                      onRequestClose={this.closePostModal}
                      autoScrollBodyContent={true}
                      titleStyle={{color: fullBlack}}>
                      <form>
                        <TextField
                          hintText="Your Name"
                          floatingLabelText="Author"
                          floatingLabelStyle={{color: grey500}}
                          inputStyle={{color: fullBlack}}
                          value={this.state.author}
                          className="input-author-comment"
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
                </Tab>
              ))}
            </Tabs>
          </CategoriesDiv>
        }
      />
      :
      /* No title */
      <AppBar
        iconElementLeft={
          <Link to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
          </Link>
        }
        children={
          <CategoriesDiv>
              <Tabs value={this.state.tabValue}>
                {categories.map( (category, index) => (
                  /* TODO: Fix active tab with browser back button and add icons */
                <Tab
                  label={category.name}
                  key={index}
                  value={category.name}
                  onActive={ () => {
                    history.push(`/${category.path}`)
                  }}>
                  <PostsDiv>
                    <PostHeading>Post Details</PostHeading>

                    {showingPosts.length !== 0 ?
                      <List style={postList}>
                        {showingPosts.map( (post, index) => (
                          <PostsContainer key={index}>
                            <Subheader style={{color: fullBlack}}>
                              { new Date(post.timestamp).toLocaleString([], options) }

                              <PostIconsDiv>
                                <VoteScoreSpan>{post.voteScore}</VoteScoreSpan>

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
                                  onClick={this.openCommentModal}
                                />

                                <IconMenu
                                  iconButtonElement={iconButtonElement}
                                  style={{float: 'right'}}>
                                  <MenuItem style={{color: fullBlack}}
                                    onClick={ () => {
                                      this.setState({
                                        postModalOpen: true,
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
                              </PostIconsDiv>
                            </Subheader>

                            <ListItem
                              value={1}
                              disabled={true}
                              leftAvatar={
                                <Avatar
                                  src={`/logos/${post.category}.svg`}
                                  style={{backgroundColor: grey500}}
                                  alt={`${post.category} logo`}
                                />
                              }
                              innerDivStyle={{color: darkBlack}}
                              primaryText={post.author}
                              secondaryText={
                                <p>
                                  <PostTitleSpan style={{color: fullBlack}}>{post.title}</PostTitleSpan>
                                    {post.commentCount}
                                    {post.commentCount === 1 ? ' comment' : ' comments'}
                                </p>
                              }
                              secondaryTextLines={2}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                              nestedItems={[
                                <ListItem value={2}
                                  disabled={true}
                                  primaryText={post.body}
                                  innerDivStyle={{color: fullBlack}}
                                  initiallyOpen={true}
                                  autoGenerateNestedIndicator={false}
                                  nestedItems={[
                                    <ListItem disabled={true}>
                                      <CommentDetails />
                                    </ListItem>
                                  ]}>
                                </ListItem>
                              ]}
                            />

                            {showingPosts.length > 1 &&
                              <Divider />
                            }
                          </PostsContainer>
                        ))}
                      </List>
                      :
                      <p>Nothing to see here!</p>
                    }
                  </PostsDiv>

                  {showingPosts.map( (post, index) => (
                    <ScrollableDialog
                      title="Edit Post"
                      actions={postActions}
                      modal={false}
                      open={this.state.postModalOpen}
                      onRequestClose={this.closePostModal}
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
                            className="input-title-post"
                          />

                          <TextField
                            floatingLabelText="Author"
                            inputStyle={{color: fullBlack}}
                            value={this.state.author}
                            disabled={true}
                            className="input-author-post"
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

                    <ScrollableDialog
                      title="Add Comment"
                      actions={commentActions}
                      modal={false}
                      open={this.state.commentModalOpen}
                      onRequestClose={this.closePostModal}
                      autoScrollBodyContent={true}
                      titleStyle={{color: fullBlack}}>
                      <form>
                        <TextField
                          hintText="Your Name"
                          floatingLabelText="Author"
                          floatingLabelStyle={{color: grey500}}
                          inputStyle={{color: fullBlack}}
                          value={this.state.author}
                          className="input-author-comment"
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
                </Tab>
              ))}
            </Tabs>
          </CategoriesDiv>
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
    getAllPosts: () => dispatch( getPosts() ),
    postEdit: p => dispatch( editPost(p) ),
    postUpvote: p => dispatch( upvotePost(p) ),
    postDownvote: p => dispatch( downvotePost(p) ),
    postRemove: p => dispatch( removePost(p) ),
    add: c => dispatch ( addComment(c) )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(PostDetails) )