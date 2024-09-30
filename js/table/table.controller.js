import * as model from './../model.js'
import * as view from './table.view.js'


function init (){
    //Получили все заявки в контроллер
    const requests = model.getRequests()
    view.renderRequests(requests)
    addEventListeners()
    model.countNewRequests()

    const newRequestsCount = model.countNewRequests()
    const newRequestsCountWork = model.countNewRequestsWork()
    const newRequestsCountComplete = model.countNewRequestsComplete()
    view.renderBadgeNew(newRequestsCount, newRequestsCountWork, newRequestsCountComplete)

    //Отображение фильтра после обновления страницы
    const filter = model.getFilter() 
    view.updateFilter(filter)
    
}

//Прослушка фильтра
function addEventListeners(){
    view.elements.select.addEventListener('change', filterProducts)
    view.elements.topStatusBar.addEventListener('click', filterByStatus)
    view.elements.leftStatusLinks.forEach((link)=> {
        link.addEventListener('click', filterByStatus)
    })
}

//Запуск методов фильтрации из модели
function filterProducts(){
    const filter = model.changeFilter('products', this.value)
    const filteredRequests = model.filteredRequests(filter)
    view.renderRequests(filteredRequests)
}

function filterByStatus(e){
    //Обновили фильтр
    const filter = model.changeFilter('status', e.target.dataset.value)
    const filteredRequests = model.filteredRequests(filter)
    
    view.renderRequests(filteredRequests)
    view.updateTopStatusBar(e.target.dataset.value)
}

init()