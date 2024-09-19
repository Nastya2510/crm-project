//Сразу выберем и опишем элементы, с которыми тут будем работать
//elements - это объект, в котором опишем таблицу
const elements = {
    table: document.querySelector('#tbody')
}



//Отображение заявок
function renderRequests(requests){
    //Обнуление тестовой разметки
    elements.table.innerHTML = ''

    const badges = {
        new: 'badge-danger',
        inwork: 'badge-warning',
        complete: 'badge-success',
    }

    //Отображение полученных заявок
    for (let request of requests){
        //Формирование разметки под задачу
        const template = `
        <tr>
            <th scope="row">${request.id}</th>
                <td>${request.date}</td>
                <td>${request.productName}</td>
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.phone}</td>
                <td>
                    <div class="badge badge-pill ${badges[request.status]}">${request.statusName}</div>
                </td>
                <td>
                    <a href="edit.html?id=${request.id}">Редактировать</a>
                </td>
        </tr>`

        elements.table.insertAdjacentHTML('beforeend', template)
    }
}

export {elements, renderRequests}