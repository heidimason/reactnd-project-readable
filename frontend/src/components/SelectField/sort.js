import React, {Component} from 'react'
import sortBy from 'sort-by'
import {white, fullBlack} from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { getPosts } from '../Posts/actions'

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
class OrderBy extends Component {
  	state = {
    	orderValue: '-timestamp'
  	}

  	orderPosts = (event, index, orderValue) => {
    	this.setState({orderValue})

    	this.props.getAllPosts()
  	}

  	render() {
    	const { posts } = this.props

		posts.sort(sortBy(this.state.orderValue))

    	return (
      		<div style={{float: 'right'}}>
        		<SelectField
            		floatingLabelText="Order By"
            		value={this.state.orderValue}
            		onChange={this.orderPosts}
            		floatingLabelStyle={{color: white}}
            		menuItemStyle={{color: fullBlack}}>
                    <MenuItem value="-timestamp" primaryText="Timestamp (most recent)" />
                    <MenuItem value="timestamp" primaryText="Timestamp (least recent)" />
            		<MenuItem value="-voteScore" primaryText="Vote Score (highest)" />
                    <MenuItem value="voteScore" primaryText="Vote Score (lowest)" />
          		</SelectField>
      		</div>
    	)
  	}
}

const mapStateToProps = state => {
  	return {
    	posts: state.posts
  	}
}

const mapDispatchToProps = dispatch => {
  	return {
    	getAllPosts: () => dispatch( getPosts() )
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy)