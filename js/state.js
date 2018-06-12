let state = {}
let data = {}

const getNewState = () => { }

const getData = (url) => {
  window.fetch(url).then(res => {
    return res.json()
  }).then(json => {
    data = json
  })
}

state = getNewState()
data = getData('../roms/carnival.json')

export default state
