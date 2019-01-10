const clone = require('clone')

let db = {}

const defaultData = {
  // "8xf0y6ziyjabvozdd253nd": {
  //   id: '8xf0y6ziyjabvozdd253nd',
  //   timestamp: 1467166872634,
  //   title: 'Udacity is the best place to learn React',
  //   body: 'Everyone says so after all.',
  //   author: 'thingtwo',
  //   category: 'react',
  //   voteScore: 6,
  //   deleted: false,
  //   commentCount: 2
  // },
  // "6ni6ok3ym7mf1p33lnez": {
  //   id: '6ni6ok3ym7mf1p33lnez',
  //   timestamp: 1468479767190,
  //   title: 'Learn Redux in 10 minutes!',
  //   body: 'Just kidding. It takes more than 10 minutes to learn technology.',
  //   author: 'thingone',
  //   category: 'redux',
  //   voteScore: -5,
  //   deleted: false,
  //   commentCount: 0
  // },
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1545522853000,
    title: 'Behold, my corydora army.',
    body: '',
    author: 'Brino21',
    category: 'freshwater',
    voteScore: 122,
    deleted: false,
    commentCount: 3
  },
  "7xf0y6ziyjabvozdd253nd": {
    id: '7xf0y6ziyjabvozdd253nd',
    timestamp: 1544989806000,
    title: 'I want to start a nitrogen cycle but I don\'t know what I need',
    body: 'I want to start a nitrogen cycle in my aquarium, but I don\'t understand any videos or websites. Also, I don\'t trust them because LOTS of the told me to put feeder goldfish in 1.5-2 gallon spaces each goldfish.\nWhat I think I should buy is Flourite Black Sand, Nitrogen, and Flourish (All Seachem products). Tell me if I should add or remove anything. Also, I don\'t want to spend amounts up to $100 for just plants\nIf you are certain types of plants I should get, telling that would be helpful too.\nAlso, is there a difference between Onyx Sand and Flourite Black Sand? (Both are Seachem products)',
    author: 'SomePersonWithCamera',
    category: 'planted',
    voteScore: 0,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1546435269000,
    title: 'Does anyone think catfish are cute?',
    body: 'I personally think they are adorable little buggers.',
    author: 'Unphaseme',
    category: 'discussion',
    voteScore: 45,
    deleted: false,
    commentCount: 20
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
