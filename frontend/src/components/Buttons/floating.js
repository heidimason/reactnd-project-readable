import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  btn: {
    position: 'absolute',
    right: 15,
    bottom: 15
  }
}

function AddPostBtn (props) {
  const { onClick } = props

  return (
    <div onClick={onClick}>
      <FloatingActionButton style={styles.btn}
        className="btn-primary">
        <ContentAdd />
      </FloatingActionButton>
    </div>
  )
}

export default AddPostBtn