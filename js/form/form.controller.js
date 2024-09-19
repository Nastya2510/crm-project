import getRandomData from './form.test-data.js'
//Импортировать под один объект (Вызов - view.insertTestData)
import * as view from './form.view.js'
import * as model from './../model.js'


//Запуски прослушек
function init(){
    renderTestData()
    setupEventListenrs()
}

function renderTestData(){
    const randomData = getRandomData()
    view.insertTestData(randomData)
}

//Функция прослушки. Отправляем форму
function setupEventListenrs(){
    view.elements.form.addEventListener('submit', formSubmitHandler)
}

//Отменяем стандартное поведение - отправку формы
function formSubmitHandler(e){
    e.preventDefault()
    const formData = view.getFormInput()
    model.addRequest(formData)
    view.clearForm()
    renderTestData()
}

init()