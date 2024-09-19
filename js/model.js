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



export {addRequest, getRequests, getRequestById}