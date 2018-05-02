import React from 'react'
import { List, ListItem } from 'material-ui/List'
import IconMoodGood from 'material-ui/svg-icons/social/mood'
import IconMoodBad from 'material-ui/svg-icons/social/mood-bad'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';
import { white, grey400, darkBlack, fullBlack } from 'material-ui/styles/colors'
import { getWeekday, getTime } from '../../utils/helpers'
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
    <MenuItem style={{color: fullBlack}}>Reply</MenuItem>
    <MenuItem style={{color: fullBlack}}>Edit</MenuItem>
    <MenuItem style={{color: fullBlack}}>Delete</MenuItem>
  </IconMenu>
)

const vote = (
  <div style={{width: '25%'}}>
    <span className="vote-score">+10043</span>
    <IconMoodGood className="icon-mood icon-mood-good" />
    <IconMoodBad className="icon-mood" />
  </div>
)

const ListPosts = () => (
  <div>
      <List style={styles.list}>
        <Subheader
          style={{color: fullBlack}}>
          { getWeekday() } at { getTime() }
        </Subheader>

        <ListItem
          disabled={false}
          leftAvatar={<Avatar>B</Avatar>}
          rightIconButton={rightIconMenu}
          rightIcon={vote}
          style={{color: darkBlack}}
          primaryText="Heidi M."
          secondaryText={
            <p>
              <span style={{color: fullBlack}}>This project is hard!</span><br />
              347 comments
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
      </List>
  </div>
)

export default ListPosts