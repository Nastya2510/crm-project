// DOM элементы
//Находим рабочие элементы. Слушаем отправку формы, а не только формы
const elements = {
    form: document.querySelector('#form'),
    name: document.querySelector('#name'),
    phone: document.querySelector('#phone'),
    email: document.querySelector('#email'),
    product: document.querySelector('#product'),
}

//Фун вставляет тестовые данные в форму
function insertTestData(data){
    elements.name.value = data.name;
    elements.phone.value = data.phone;
    elements.email.value = data.email;
    elements.product.value = data.product;
}

//Собрать данные с формы, которые ввел пользователь
function getFormInput(){
    //Создаем объект с данными формы на основе класса form.data
    return new FormData(elements.form)
}

//Очистка формы. Сброс
function clearForm(){
    elements.form.reset()
}



export {elements, insertTestData, getFormInput, clearForm}