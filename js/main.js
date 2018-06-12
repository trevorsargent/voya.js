import { input$, output$ } from './engine.js'
import state from './state.js'
console.log('HELO!?')

const commandLine = document.getElementById('command_line')
const form = document.getElementById('form')
const log = document.getElementById('console')

const getCommandLineValue = () => {
  return commandLine.value.trim().toLowerCase()
}

const setCommandLineValue = (text) => {
  commandLine.value = text
}

const logText = x => {
  let p = document.createElement('p')
  p.innerHTML = x
  log.appendChild(x)
}

const smoothScrollWindow = (px) => {
  window.scrollBy({
    top: px, // could be negative value
    left: 0,
    behavior: 'smooth'
  })
}

form.onsubmit = () => {
  const input = getCommandLineValue()

  // TODO: Clean input here

  // send input to engine
  input$.write(input)

  // set command line empty
  setCommandLineValue('')
}

output$.each(x => {
  // print the output
  logText(x)

  // scroll the window up to accomodate for new text
  smoothScrollWindow(100)
})

console.log(state)
