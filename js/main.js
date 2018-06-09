import { input$, output$ } from './engine.js'

const commandLine = document.getElementById('command_line')
const form = document.getElementById('form')

const getCommandLineValue = () => {
  return commandLine.value.trim().toLowerCase()
}

const setCommandLineValue = (text) => {
  commandLine.value = text
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

  // scroll the window up to accomodate for new text
  smoothScrollWindow(100)
})
