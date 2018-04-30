import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  btn: {
    marginRight: 25,
    marginTop: 15,
    position: 'absolute',
    right: 0,
    bottom: 15,
    zIndex: 1
  }
}

const AddPostBtn = () => (
  <div>
    <FloatingActionButton style={styles.btn}
      className="btn-primary">
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default AddPostBtn