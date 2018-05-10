import React, { Component } from 'react'
import '../../css/Posts.css'
import { white, grey400, darkBlack, fullBlack } from 'material-ui/styles/colors'
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
import { connect } from 'react-redux'
import { upvotePost } from './actions'
import { downvotePost } from './actions'
import { removePost } from './actions'

const styles = {
  list: {
    backgroundColor: white,
    borderRadius: 4
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
  render() {
    const { showingPosts, upvote, downvote, remove } = this.props,

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
      <List style={styles.list}>
        {showingPosts.map( (post, index) => (
          <div key={index}>
            <Subheader
              style={{color: fullBlack}}>
              { new Date(post.timestamp).toLocaleString([], options) }
            </Subheader>

            <ListItem
              disabled={false}
              leftAvatar={<Avatar>{ post.author.charAt(0) }</Avatar>}
              rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem style={{color: fullBlack}}>Edit</MenuItem>
                  <MenuItem
                    style={{color: fullBlack}}
                    onClick={e => remove(post)}>Delete
                  </MenuItem>
                </IconMenu>
              }
              rightIcon={
                <div style={{width: '25%'}}>
                  <span className="vote-score">{post.voteScore}</span>
                  <IconMoodGood
                    className="icon-mood icon-mood-good"
                    onClick={e => upvote(post)}
                    />
                  <IconMoodBad
                    className="icon-mood"
                    onClick={e => downvote(post)}
                  />
                </div>
              }
              style={{color: darkBlack}}
              primaryText={post.author}
              secondaryText={
                <p>
                  <span style={{color: fullBlack}}>{post.title}</span><br />
                  {post.commentCount} comments
                </p>
              }
              secondaryTextLines={2}
            />

            <Divider inset={true} />
          </div>
        ))}
      </List>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvote: post => dispatch( upvotePost(post) ),
    downvote: post => dispatch( downvotePost(post) ),
    remove: post => dispatch( removePost(post) )
  }
}

export default connect(null, mapDispatchToProps)(ListPosts)
