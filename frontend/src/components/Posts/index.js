import React, { Component } from 'react'
import {
  PostIconsDiv,
  VoteScoreSpan,
  PostTitleSpan,
  postList
} from '../../utils/styles'
import {
  cyanA400,
  blueGrey100,
  grey400, grey500,
  darkBlack, fullBlack
} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import Divider from 'material-ui/Divider'
import ScrollableDialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { editPost, upvotePost, downvotePost, removePost } from './actions'
import serializeForm from 'form-serialize'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

class ListPosts extends Component {
  state = {
    postModalOpen: false
  }

  closePostModal = () => {
    this.setState({postModalOpen: false})
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
    this.closePostModal()
  }

  render() {
    const { showingPosts, history, upvote, downvote, postRemove } = this.props,
                                                { postModalOpen } = this.state,

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
            actions = [
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
            ]

    return (showingPosts.length > 0 &&
      <List style={postList}>
        {showingPosts.map( (post, index) => (
          <div key={index}>
            <Subheader style={{color: fullBlack}}>
              { new Date(post.timestamp).toLocaleString([], options) }

              <PostIconsDiv>
                <VoteScoreSpan>{post.voteScore}</VoteScoreSpan>

                <IconMoodGood
                  className="icon-mood icon-mood-good"
                  onClick={e => upvote(post)}
                  />

                <IconMoodBad
                  className="icon-mood"
                  onClick={e => downvote(post)}
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
              disabled={false}
              leftAvatar={
                <Avatar
                  src={`/aquariums/${post.category}.jpg`}
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
              hoverColor={blueGrey100}
              onClick={ () => {
                if (post.category)
                  history.push(`/${post.category}/${post.id}`)
              }}
            />

            {showingPosts.length > 1 &&
              <Divider inset={false} />
            }

            {showingPosts.map( (post, index) => (
              <ScrollableDialog
                title="Edit Post"
                actions={actions}
                modal={false}
                open={postModalOpen}
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
                      <MenuItem value="freshwater" primaryText="Freshwater" />
                      <MenuItem value="planted" primaryText="Planted" />
                      <MenuItem value="discussion" primaryText="Discussion" />
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
          </div>
        ))}
      </List>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postEdit: p => dispatch( editPost(p) ),
    upvote: p => dispatch( upvotePost(p) ),
    downvote: p => dispatch( downvotePost(p) ),
    postRemove: p => dispatch( removePost(p) )
  }
}

export default withRouter( connect(null, mapDispatchToProps)(ListPosts) )
