import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

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
    <Tabs style={{width: "80%"}}>
      {categories.map( (category, index) => (
        <Tab label={category.name} key={index}>
          <div>
            <h2 style={styles.headline}>{category.name}</h2>
            <p>
              This is an example tab.
            </p>
            <p>
              You can put any sort of HTML or react component in here. It even keeps the component state!
            </p>
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ListTabs