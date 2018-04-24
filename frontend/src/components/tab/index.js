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

const ListTabs = () => (
  <Tabs>
    <Tab label="Category 1">
      <div>
        <h2 style={styles.headline}>Category 1</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
      </div>
    </Tab>
    <Tab label="Category 2">
      <div>
        <h2 style={styles.headline}>Category 2</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab label="Category 3">
      <div>
        <h2 style={styles.headline}>Category 3</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
)

export default ListTabs