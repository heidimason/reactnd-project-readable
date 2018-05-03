import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';
import { white, grey400, darkBlack, fullBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import '../../css/Posts.css'

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

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem style={{color: fullBlack}}>Edit</MenuItem>
    <MenuItem style={{color: fullBlack}}>Delete</MenuItem>
  </IconMenu>
)

class ListPosts extends Component {
  render() {
    const { posts } = this.props

    return (
      <List style={styles.list}>
        {posts.map( (post, index) => (
          <div key={index}>
            <Subheader
              style={{color: fullBlack}}>
              {post.timestamp}
            </Subheader>

            <ListItem
              disabled={false}
              leftAvatar={<Avatar>{post.author.charAt(0)}</Avatar>}
              rightIconButton={rightIconMenu}
              rightIcon={
                <div style={{width: '25%'}}>
                  <span className="vote-score">{post.voteScore}</span>
                  <IconMoodGood className="icon-mood icon-mood-good" />
                  <IconMoodBad className="icon-mood" />
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

export default ListPosts