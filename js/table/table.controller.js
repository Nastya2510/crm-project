import * as model from './../model.js'
import * as view from './table.view.js'


function init (){
    //Получили все заявки в контроллер
    const requests = model.getRequests()
    view.renderRequests(requests)
}


init()