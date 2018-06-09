// const times = (x, func) => {
//   while (x--) {
//     func()
//   }
// }

// const appendParagraph = x => {
//   var sp1 = document.createElement('p')
//   sp1.innerHTML = x.trim()
//   appendItem(sp1)
// }

// // p rints a line of text to the screen
// const println = lines => {
//   lines = lines || ''
//   lines.split('\n').forEach(appendParagraph)
// }

// const appendItem = x => {
//   document.getElementById('console').appendChild(x)
// }

// const getJSONCallback = (err, json) => {
//   if (err !== null) {
//     window.alert('Something went wrong: ' + err)
//   } else {
//     data = json
//     // document.getElementById('image').src = data.settings['background-url']
//     // document.title.innerHTML = data.settings.title
//     // document.getElementById('logo').innerHTML = data.settings.title
//     // document.getElementById('prepend').innerHTML = data.settings.prepend
//   }
// }

// const getJSON = (url, callback) => {
//   var xhr = new window.XMLHttpRequest()
//   xhr.open('GET', url, true)
//   xhr.responseType = 'json'
//   xhr.onload = function () {
//     var status = xhr.status
//     if (status === 200) {
//       callback(null, xhr.response)
//     } else {
//       callback(status)
//     }
//   }
//   xhr.send()
// }
