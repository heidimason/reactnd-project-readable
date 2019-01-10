const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  // "894tuq4ut84ut8v4t8wun89g": {
  //   id: '894tuq4ut84ut8v4t8wun89g',
  //   parentId: "8xf0y6ziyjabvozdd253nd",
  //   timestamp: 1468166872634,
  //   body: 'Hi there! I am a COMMENT.',
  //   author: 'thingtwo',
  //   voteScore: 6,
  //   deleted: false,
  //   parentDeleted: false
  // },
  // "8tu4bsun805n8un48ve89": {
  //   id: '8tu4bsun805n8un48ve89',
  //   parentId: "8xf0y6ziyjabvozdd253nd",
  //   timestamp: 1469479767190,
  //   body: 'Comments. Are. Cool.',
  //   author: 'thingone',
  //   voteScore: -5,
  //   deleted: false,
  //   parentDeleted: false
  // },
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1545529539000,
    body: 'Nothing sadder than a single Cory hiding in the corner, they\'re totally different fish with loads of personality in groups of 6 or more. Thank you for keeping them in a nicely sized group. They look so happy!',
    author: 'hotwetcherryshrimp',
    voteScore: 18,
    deleted: false,
    parentDeleted: false
  },
  "804tuq4ut84ut8v4t8wun89g": {
    id: '804tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1545568682000,
    body: 'If you give em a sand substrate, they\'d be even happier. A fun thing to do with corydoras on sand, is to bury some food in the substrate (just barely under the surface). They\'ll act like true dogs, turning over the sand to find their treats.',
    author: 'GTAinreallife',
    voteScore: 7,
    deleted: false,
    parentDeleted: false
  },
  "814tuq4ut84ut8v4t8wun89g": {
    id: '814tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1545579173000,
    body: 'I\'m gonna have a group of 8 in my 20 long, I can\'t wait. They\'re so fun!',
    author: 'xzElmozx',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "794tuq4ut84ut8v4t8wun89g": {
    id: '794tuq4ut84ut8v4t8wun89g',
    parentId: "7xf0y6ziyjabvozdd253nd",
    timestamp: 1544992739000,
    body: 'You could just add some fish food to the tank every few days. The food will start to degrade and release ammonia into the water. This will start the nitrogen cycle. It will take a while though. 4 to 6 weeks to be fully cycled and ready for fish. Thats how I do it.',
    author: 'Luigijaguarcichlid',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "704tuq4ut84ut8v4t8wun89g": {
    id: '794tuq4ut84ut8v4t8wun89g',
    parentId: "7xf0y6ziyjabvozdd253nd",
    timestamp: 1544994126000,
    body: 'use seachem stability and follow the direction on it',
    author: 'giwnet',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6tu4bsun605n6un46ve69": {
    id: '6tu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546438446000,
    body: 'Corydoras are cute indeed !',
    author: 'Boobiebears2',
    voteScore: 18,
    deleted: false,
    parentDeleted: false
  },
  "6uu4bsun605n6un46ve69": {
    id: '6uu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546438871000,
    body: 'Cory cats are adorable',
    author: 'VermontNurse2',
    voteScore: 12,
    deleted: false,
    parentDeleted: false
  },
  "6vu4bsun605n6un46ve69": {
    id: '6vu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546443940000,
    body: 'Cory cats are like little water bunnies, just snufflin\' around, bein\' cute as a button.',
    author: 'wolk-king',
    voteScore: 12,
    deleted: false,
    parentDeleted: false
  },
  "6wu4bsun605n6un46ve69": {
    id: '6wu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546435943000,
    body: 'Agreed! I like the Eel-tailed catfish, tandanus tandanus. Apparently they are a good species to use in Aquaculture? Seem to do well in a nice sized social tank.',
    author: 'Spacewalk_Squirrel',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "6xu4bsun605n6un46ve69": {
    id: '6xu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546440141000,
    body: 'Yes! I love their little whiskery faces, especially the dwarf varieties.',
    author: 'cryptid_bones',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "6yu4bsun605n6un46ve69": {
    id: '6yu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546442099000,
    body: 'Catfish is a very broad group, but yeah they\'re adorable lol',
    author: 'wolfsongpmvs',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "6zu4bsun605n6un46ve69": {
    id: '6zu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546445216000,
    body: 'Most catfish are the cutest things ever.\nIf I could only ever keep one category of fish, I would keep Corydoras catfish.',
    author: 'TimTheRandomPerson',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "6au4bsun605n6un46ve69": {
    id: '6au4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546458612000,
    body: 'My tank is 99% bottom feeders because of this',
    author: 'AggressiveTable',
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  },
  "6bu4bsun605n6un46ve69": {
    id: '6bu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546447575000,
    body: 'Synodontis petricola are my favorite!!!!',
    author: 'Fisheboi',
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  },
  "6cu4bsun605n6un46ve69": {
    id: '6cu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546454321000,
    body: 'Of course!! My personal favorite, though uhm, I could never own one, being a tank buster and all, is the red tailed cat! I love their sweet monstrous faces!',
    author: 'QuibblingSnail',
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  },
  "6cu4bsun605n6un46ve69": {
    id: '6cu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546457689000,
    body: 'The pudgy bellies on them are adorable. I had a bumblebee catfish but they spend most of their times hiding so you rarely get to see them.\nSalt and Pepper Cories are adorable though, not to be confused with peppered cories.',
    author: 'Imakedo',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  },
  "6du4bsun605n6un46ve69": {
    id: '6du4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546459881000,
    body: 'Absolutely. My striped Raphael catfish is so much fun to watch. He\'s just a big lumbering oaf',
    author: 'WorkingSquiid',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  },
  "6eu4bsun605n6un46ve69": {
    id: '6eu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546469882000,
    body: 'I think red tail catfish and any kind of synodontis are the cutest things.',
    author: 'Blitz_Reddit',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  },
  "6fu4bsun605n6un46ve69": {
    id: '6fu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546451152000,
    body: 'Agreed, I have a bunch of cory\'s as well as 13 types of plecos in my tank. Gotta love the cat fish.',
    author: 'Textile302',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6gu4bsun605n6un46ve69": {
    id: '6gu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546455741000,
    body: 'They’re my favorite and they’re all adorable from Cory’s to synodontis to wels!',
    author: 'freezerpops',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6hu4bsun605n6un46ve69": {
    id: '6hu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546457331000,
    body: 'Cutest fish ever has got to be the Flowerhorn',
    author: 'Charlie-Winburg',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6iu4bsun605n6un46ve69": {
    id: '6iu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546457634000,
    body: 'I love my glass cats and Schwartzi Corys!',
    author: 'handypenboi',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6ju4bsun605n6un46ve69": {
    id: '6ju4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546464554000,
    body: 'Everyone’s talking about the adorable corydoras and other bottom feeders, and here I was excited to share about the baby channel catfish that are down at the local pond, haha!',
    author: 'FrigidLollipop',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6ku4bsun605n6un46ve69": {
    id: '6ku4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546480237000,
    body: 'Personally I think ripsaw catfish are, they are like a mix of a pleco and a corycat, just like 3 feet long lol. They are so peaceful and friendly, I even got to pet one at my lfs once',
    author: 'jeffyjoo',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
  "6lu4bsun605n6un46ve69": {
    id: '6lu4bsun605n6un46ve69',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1546485440000,
    body: 'I love corydoras! They are the best. :D And there\'s lots of cuties.',
    author: 'mahourain',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
