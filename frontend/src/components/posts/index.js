import React, { Component } from 'react'
import '../../css/Posts.css'
import { cyanA400,
        white,
        grey400, grey500,
        darkBlack, fullBlack
} from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import Divider from 'material-ui/Divider'
import ScrollableDialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { editPost, upvotePost, downvotePost, removePost } from './actions'
import serializeForm from 'form-serialize'

const styles = {
  list: {
    backgroundColor: white,
    borderRadius: 4
  },
  listItem: {
    color: darkBlack
  },
  listItemDetails: {
    color: darkBlack,
    cursor: 'initial'
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

class ListPosts extends Component {
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
    this.props.edit(post)

    // Close modal upon submitting form
    this.closeModal()
  }

  render() {
    const { showingPosts, history, upvote, downvote, remove } = this.props,

            options = {
              weekday: 'short',
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            },

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
                  onClick={this.editPost}
                  backgroundColor={cyanA400}
                  hoverColor={cyanA400}
                />
              </Link>
            ]

    return (
      <div>
        <List style={styles.list}>
          {showingPosts.map( (post, index) => (
            <div key={index}>
              <Subheader
                style={{color: fullBlack}}>
                { new Date(post.timestamp).toLocaleString([], options) }

                <div style={{width: '25%', float: 'right'}}>
                  <span className="vote-score">{post.voteScore}</span>
                  <IconMoodGood
                    className="icon-mood icon-mood-good"
                    onClick={e => upvote(post)}
                    />
                  <IconMoodBad
                    className="icon-mood"
                    onClick={e => downvote(post)}
                  />

                  {`/${post.category}/${post.id}` === window.location.pathname &&
                    <IconMenu iconButtonElement={iconButtonElement}>
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
                        }}>Edit</MenuItem>

                      { /* TODO: Add confirmation dialog */ }
                      <MenuItem
                        style={{color: fullBlack}}
                        onClick={e => remove(post)}>Delete
                      </MenuItem>
                    </IconMenu>
                  }
                </div>
              </Subheader>

              {`/${post.category}/${post.id}` !== window.location.pathname &&
                <ListItem
                  disabled={false}
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
                  hoverColor={cyanA400}
                  onClick={ () => {
                    if (post.category)
                      history.push(`/${post.category}/${post.id}`)
                  }}
                />
              }

              {`/${post.category}/${post.id}` === window.location.pathname &&
                <ListItem
                  disabled={false}
                  leftAvatar={<Avatar>{ post.author ? post.author.charAt(0) : null }</Avatar>}
                  style={styles.listItemDetails}
                  primaryText={post.author}
                  secondaryText={
                    <p>
                      <span style={{color: fullBlack}}>{post.title}</span><br />
                        {post.body}
                    </p>
                  }
                  secondaryTextLines={2}
                />
              }

              {showingPosts.length > 1 &&
                <Divider inset={false} />
              }
            </div>
          ))}
        </List>

        {showingPosts.map( (post, index) => (
          <ScrollableDialog
              title="Edit Post"
              actions={actions}
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
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    edit: p => dispatch( editPost(p) ),
    upvote: p => dispatch( upvotePost(p) ),
    downvote: p => dispatch( downvotePost(p) ),
    remove: p => dispatch( removePost(p) )
  }
}

export default withRouter( connect(null, mapDispatchToProps)(ListPosts) )

