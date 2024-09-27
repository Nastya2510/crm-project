//Все заявки, которые отправились с формы
//Переменная равна результату работы функции с тернарным оператором
const requests = loadRequests()

//Заявки - это объекты. Чтобы создавать объекты нужно использовать конструктор
class Request {
    constructor(id, name, phone, email, product){
        this.id = id
        this.name = name
        this.phone = phone
        this.email = email
        this.product = product
        this.date = new Date().toISOString()
        this.status = 'new'
    }
}

const products = {
    'course-html': 'Курс по верстке',
    'course-js': 'Курс по JavaScript',
    'course-vue': 'Курс по Vue JS',
    'course-php': 'Курс по PHP',
    'course-wordpress': 'Курс WordPress',
}

const statuses = {
    'new': 'Новая',
    'inwork': 'В РАБоте',
    'complete': 'Завершена',
}

//Объект, который описывает текущи фильтр по двум параметрам
const filter = {
    products: 'all',
    status: 'all'
}


//Фун принимает свойства фильтра (products/status) и меняет их. Обновляет фильтр и возвращает его же
function changeFilter(prop, value){
    filter[prop] = value
    return filter
}

function filteredRequests(filter){
    let filteredRequests

    //Фильтрация по продукту
    if (filter.products !== 'all'){
        //Массив с отфильтрованными заявками
        filteredRequests = requests.filter((request) => request.product === filter.products)
    } else {
        //Создали копию массива. Деструктуризация
        filteredRequests = [...requests]
    }

    //Фильтрация по статусу
    if (filter.status !== 'all'){
        filteredRequests = filteredRequests.filter((request) => request.status === filter.status)
    }


    return prepareRequests(filteredRequests)
}

//Добавить заявку
function addRequest(formData){
    //Определяем id
    const id = requests.length > 0 ? requests[requests.length - 1]['id'] + 1 : 1

    //Создаем заявку через конструктор класса
    const request = new Request(id, formData.get('name'), formData.get('phone'), formData.get('email'), formData.get('product'))

    //Добавляем созданную заявку в массив с заявками
    requests.push(request)

    //Сохранить в localStorage
    saveRequests()
}

//Сохранение в localStorage. Работает в модели
function saveRequests(){
    localStorage.setItem('requests', JSON.stringify(requests))
}

//Загрузить данные в localStorage. Исправление перезаписи
function loadRequests(){
    return localStorage.getItem('requests') ? JSON.parse(localStorage.getItem('requests')) : []
}

//Вернуть заявки
function getRequests(){
    return prepareRequests(requests)
}

//Обработка заявок. Данные представляются в определенном формате
function prepareRequests(requests){
    //Обработаем каждый элемент и вернем новый массив
    return requests.map((item) => {
        return {
            ...item,
            date: new Date(item.date).toLocaleDateString(),
            productName: products[item.product],
            statusName: statuses[item.status]
        }
    })
}

//Найди заявку по id. Возвращает ссылку на элемент в массиве, который нам нужен
function getRequestById(id){
    const request = requests.find((item) => item.id == id) //Тут не строгое стравнение. число == строка
    //Корректное отображение даты и времени в форме. Создали 2 новых свойства исключительно для вывода
    request.dateDate = new Date(request.date).toLocaleDateString()
    request.dateTime = new Date(request.date).toLocaleTimeString()
    return request
}

//Обновление заявок после редактирования
function updateRequest(formData){
    //Найти искомую заявку, которую нужно обновить
    const request = getRequestById(formData.get('id'))
    //Изменили значения заявки
    request.name = formData.get('name')
    request.email = formData.get('email')
    request.phone = formData.get('phone')
    request.product = formData.get('product')
    request.status = formData.get('status')
    //Сохранили измененные заявки в LS
    saveRequests()
    //После изменений переместиться назад
    window.location = '/table.html'
}

export {addRequest, getRequests, getRequestById, updateRequest, changeFilter, filteredRequests}