import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import {white, fullBlack} from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem'

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class SelectFieldAutoWidth extends Component {
  state = {
    value: 1,
  }

  handleChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div style={{float: 'right'}}>
        <SelectField
          floatingLabelText="Sort By"
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={true}
          floatingLabelStyle={{color: white}}
          menuItemStyle={{color: fullBlack}}
        >
          <MenuItem value={1} primaryText="Vote Score" />
          <MenuItem value={2} primaryText="Timestamp" />
        </SelectField>
      </div>
    )
  }
}