import { input$, output$ } from './engine'
// import state from './state.js'
// import { sanitize } from './lib/operative.js';

const commandLine = document.getElementById('command_line')
const form = document.getElementById('form')
const log = document.getElementById('console')

window.input = input$

const getCommandLineValue = () => {
  return commandLine.value.trim().toLowerCase()
}

const setCommandLineValue = (text) => {
  commandLine.value = text
}

const logText = x => {
  let p = document.createElement('p')
  p.innerText = x
  log.appendChild(p)
}

const smoothScrollWindow = (px) => {
  window.scrollBy({
    top: px, // could be negative value
    left: 0,
    behavior: 'smooth'
  })
}

form.onsubmit = (e) => {
  e.preventDefault()

  // get input
  let input = getCommandLineValue()

  // send input to engine
  input$.write(input)

  // set command line empty
  setCommandLineValue('')
}

output$.each(x => {
  // print the output
  logText(x)

  // scroll the window up to accomodate for new text
  smoothScrollWindow(500)
})
