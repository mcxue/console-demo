const methodStringList = [
  'assert',
  'clear',
  'count',
  'countReset',
  'debug',
  'dir',
  'dirxml',
  'error',
  'group',
  'groupCollapsed',
  'groupEnd',
  'info',
  'log',
  'table',
  'time',
  'timeEnd',
  'timeLog',
  'trace',
  'warn'
]

const judgeIsArrayString = (string) => {
  return string[0] === '[' && string[-1] === ']'
}

const judegIsObjectString = (string) => {
  console.log(string[0])
  console.log(string[-1])
  return string[0] === '{' && string[-1] === '}'
}

const convertTextContentToJsonForJs = (textInput) => {
  if(textInput || !judgeIsArrayString(textInput) || !judegIsObjectString(textInput)) return textInput
  return eval(`(${textInput})`)
}

const createConsoleButtonHtml = (name) => {
  return `<button class="button ${name ? name : ''}">${name}</button>`
}

const craeteTextInputHtml = (className) => {
  return `<textarea class="input-console${className ? ' ' + className : ''}"></textarea>`
}

const createButtonListHtml = (methodStringList) => {
  let buttons = ''
  methodStringList.forEach(methodString => {
    buttons += createConsoleButtonHtml(methodString)
  })
  return `<div class="button-wrapper">${buttons}</div>`
}

const insertHtmlToPage = (html) => {
  $('#root').append(html)
}

const bindOneButtonEvent = (methodString) => {
  $(`.${methodString}`).on('click', () => {
    const text = $('.input-console').val()
    const newText = convertTextContentToJsonForJs(text)
    if(!newText){
      console[methodString]('')
    }else{
      console[methodString](newText)
    }
  })
}

const bindButtonsEvent = () => {
  methodStringList.forEach(methodString => {
    bindOneButtonEvent(methodString)
  })
}

const main = () => {
  const inputHtml = craeteTextInputHtml()
  const buttonHtml = createButtonListHtml(methodStringList)
  insertHtmlToPage(inputHtml)
  insertHtmlToPage(buttonHtml)
  bindButtonsEvent()
}

main()