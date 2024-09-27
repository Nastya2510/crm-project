import * as model from './../model.js'
import * as view from './edit.view.js'


//Что запускается при старте страницы
function init(){
    const id = getRequestId()
    const request = model.getRequestById(id)
    view.renderRequest(request)
    setupEventListeners()
}

//Что прослушивается при старте страницы
function setupEventListeners(){
    view.elements.form.addEventListener('submit', formSubmitHandler)
}

//Сбор данный с формы. Обработка поведения при отправке с формы
function formSubmitHandler(e){
    e.preventDefault()
    const formData = view.getFormInput()
    model.updateRequest(formData)
}

//Получение ID из строки запроса. Передали ID и получили его на странице редактирования
function getRequestId(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    return id
}


init() 