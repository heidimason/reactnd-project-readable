import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

function AddPostBtn (props) {
  const { onClick } = props

  return (
    <div onClick={onClick}>
      <FloatingActionButton
        className="btn-primary btn-add-post">
        <ContentAdd />
      </FloatingActionButton>
    </div>
  )
}

export default AddPostBtn