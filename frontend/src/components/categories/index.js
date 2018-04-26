import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ListPosts from '../posts'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

function ListTabs (props) {
  const { categories } = props

  return (
    <Tabs style={{width: '75%'}}>
      {categories.map( (category, index) => (
        <Tab label={category.name} key={index}>
          <div>
            <h2 style={styles.headline}>{category.name}</h2>

            <ListPosts />
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ListTabs