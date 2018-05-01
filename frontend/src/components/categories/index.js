import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import SortBy from '../SelectField/sort'
import ListPosts from '../Posts'
import AddPostBtn from '../Buttons/floating'
import ScrollableDialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
// import serializeForm from 'form-serialize'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 25,
    marginBottom: 25,
    fontWeight: 400,
    textTransform: 'capitalize'
  },
}

class ListTabs extends Component {
  state = {
    open: false,
    posts: []
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   const values = serializeForm(e.target, { hash: true })
  //   // console.log(values)

  //   if (this.props.onCreatePost)
  //     this.props.onCreatePost(values)
  // }

  // createPost(post) {
  //     ReadableAPI.create(post).then(post => {
  //         this.setState(state => ({
  //             posts: state.posts.concat([ post ])
  //         }))
  //     })
  // }

  render() {
    const { categories } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div style={{width: '75%'}}>
        <Tabs>
          {categories.map( (category, index) => (
            <Tab label={category.name} key={index}>
              <div>
                <SortBy />
                <h2 style={styles.headline}>{category.name}</h2>

                <ListPosts />
              </div>
            </Tab>
          ))}
        </Tabs>

        <AddPostBtn
          onClick={this.handleOpen}
        />

        <ScrollableDialog
          title="Create Post"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        </ScrollableDialog>
      </div>
    )
  }
}

export default ListTabs