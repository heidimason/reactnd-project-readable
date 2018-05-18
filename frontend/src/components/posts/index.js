import React, { Component } from 'react'
import '../../css/Posts.css'
import {
  blueGrey100,
  darkBlack, fullBlack
} from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import Divider from 'material-ui/Divider'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { upvotePost, downvotePost } from './actions'

const styles = {
  listItem: {
    color: darkBlack
  }
}

class ListPosts extends Component {
  state = {
    modalOpen: false
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    const { showingPosts, history, upvote, downvote } = this.props,

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
        <List className="post-list">
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
                </div>
              </Subheader>

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
                hoverColor={blueGrey100}
                onClick={ () => {
                  if (post.category)
                    history.push(`/${post.category}/${post.id}`)
                }}
              />

              {showingPosts.length > 1 &&
                <Divider inset={false} />
              }
            </div>
          ))}
        </List>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvote: p => dispatch( upvotePost(p) ),
    downvote: p => dispatch( downvotePost(p) )
  }
}

export default withRouter( connect(null, mapDispatchToProps)(ListPosts) )

