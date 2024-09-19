import * as model from './../model.js'
import * as view from './edit.view.js'


//Что запускается при старте страницы
function init(){
    const id = getRequestId()
    const request = model.getRequestById(id)
    console.log(request)
    view.renderRequest(request)
}

//Получение ID из строки запроса. Передали ID и получили его на странице редактирования
function getRequestId(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    return id
}

init() 