import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import SortBy from '../SelectField/sort'
import ListPosts from '../Posts'
import AddPostBtn from '../Buttons/floating'
import ScrollableDialog from 'material-ui/Dialog'
import { cyanA400, grey500, fullBlack } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
// import serializeForm from 'form-serialize'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 25,
    marginBottom: 25,
    fontWeight: 400,
    textTransform: 'capitalize'
  }
}

class ListTabs extends Component {
  state = {
    open: false
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
    const { categories, posts } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
        style={{marginRight: 15}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
        backgroundColor={cyanA400}
        hoverColor={cyanA400}
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

                <ListPosts posts={posts} />
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
          autoScrollBodyContent={true}
          titleStyle={{color: fullBlack}}>
          <TextField
            floatingLabelText="Title"
            floatingLabelStyle={{color: grey500}}
            inputStyle={{color: fullBlack}}
          />

          <TextField
            hintText="Your Name"
            floatingLabelText="Author"
            floatingLabelStyle={{color: grey500}}
            inputStyle={{color: fullBlack}}
            style={{marginLeft: 15}}
          />

          <TextField
            floatingLabelText="Message"
            floatingLabelStyle={{color: grey500}}
            textareaStyle={{color: fullBlack}}
            multiLine={true}
            rows={2}
            rowsMax={4}
            fullWidth={true}
          />
        </ScrollableDialog>
      </div>
    )
  }
}

export default ListTabs