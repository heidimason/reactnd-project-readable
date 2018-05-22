import React, { Component } from 'react'
import {
  cyanA400,
  grey400, grey500,
  fullBlack
} from 'material-ui/styles/colors'
import { Link, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import ScrollableDialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { getComments, editComment, upvoteComment, downvoteComment, removeComment } from './actions'
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

class CommentDetails extends Component {
  componentDidMount() {
    const postId = window.location.pathname.split('/').pop()

    this.props.getAllComments(postId)
  }

  state = {
    modalOpen: false
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  changeBody = e => {
    this.setState({body: e.target.value})
  }

  editComment = e => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    const comment = Object.assign(values, {
      id: this.state.id,
      body: this.state.body
    })

    // Dispatch action
    this.props.commentEdit(comment)

    // Close modal upon submitting form
    this.closeModal()
  }

  render() {
    const { comments, commentUpvote, commentDownvote, commentRemove } = this.props,

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
      <div>
        <List>
          {comments.map( (comment, index) => (
            <div key={index}>
              <Subheader className="comment-subheader">
                { new Date(comment.timestamp).toLocaleString([], options) }

                <div className="comment-icons">
                  <span className="vote-score">{comment.voteScore}</span>

                  <IconMoodGood
                    className="icon-mood icon-mood-good"
                    onClick={e => commentUpvote(comment)}
                    />

                  <IconMoodBad
                    className="icon-mood"
                    onClick={e => commentDownvote(comment)}
                  />

                  <IconMenu
                    iconButtonElement={iconButtonElement}
                    style={{float: 'right'}}>
                    <MenuItem style={{color: fullBlack}}
                      onClick={ () => {
                        this.setState({
                          modalOpen: true,
                          id: comment.id,
                          body: comment.body,
                          author: comment.author
                        })
                      }}>Edit
                    </MenuItem>

                    { /* TODO: Add confirmation dialog */ }
                    <MenuItem
                      style={{color: fullBlack}}
                      onClick={e => commentRemove(comment)}>Delete
                    </MenuItem>
                  </IconMenu>
                </div>
              </Subheader>

              <ListItem
                value={3}
                disabled={true}
                primaryText={comment.author}
                secondaryText={
                  <p>
                    <span style={{color: fullBlack}}>{comment.body}</span><br />
                  </p>
                }
                secondaryTextLines={2}
                leftAvatar={<Avatar>{ comment.author ? comment.author.charAt(0) : null }</Avatar>}
                style={{color: fullBlack}}
              />
            </div>
          ))}
        </List>

        {comments.map( (comment, index) => (
          <ScrollableDialog
            title="Edit Comment"
            actions={
              <div>
                <Link to={window.location.pathname}>
                  <FlatButton
                    label="Cancel"
                    primary={true}
                    onClick={this.closeModal}
                    style={{marginRight: 15}}
                  />
                </Link>

                <Link to={window.location.pathname}>
                  <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.editComment}
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
              <TextField
                floatingLabelText="Author"
                inputStyle={{color: fullBlack}}
                value={this.state.author}
                className="input-author"
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllComments: c => dispatch( getComments(c) ),
    commentEdit: c => dispatch( editComment(c) ),
    commentUpvote: c => dispatch( upvoteComment(c) ),
    commentDownvote: c => dispatch( downvoteComment(c) ),
    commentRemove: c => dispatch( removeComment(c) )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CommentDetails) )