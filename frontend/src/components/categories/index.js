import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import SortBy from '../SelectField/sort'
import ListPosts from '../Posts'
import AddPostBtn from '../Buttons/floating'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 25,
    marginBottom: 25,
    fontWeight: 400,
    textTransform: 'capitalize'
  },
}

function ListTabs (props) {
  const { categories } = props

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

      <AddPostBtn />
    </div>
  )
}

export default ListTabs