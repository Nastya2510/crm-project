//Сразу выберем и опишем элементы, с которыми тут будем работать
//elements - это объект, в котором опишем таблицу
const elements = {
    table: document.querySelector('#tbody'),
    select: document.querySelector('#productSelect'),
    topStatusBar: document.querySelector('#topStatusBar'),
    leftStatusLinks: document.querySelectorAll('[data-role="left-status"]'),
    leftPanelNav: document.querySelector('.left-panel__navigation'),
    badgeNew: document.querySelector('#badge-new'),
    badgeInwork: document.querySelector('#badge-inwork'),
    badgeComplete: document.querySelector('#badge-complete')
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

function updateTopStatusBar(value){
    //Меняем топ статус бар
    elements.topStatusBar.querySelectorAll('a').forEach((link) => link.classList.remove('active'))
    elements.topStatusBar.querySelector(`a[data-value="${value}"]`).classList.add('active')

    //Левое навигационное меню
    elements.leftStatusLinks.forEach((link) => link.classList.remove('active'))
    elements.leftPanelNav.querySelector(`a[data-value="${value}"]`).classList.add('active')
}

function renderBadgeNew(valueNew, valueInWork, valueComplete){
    elements.badgeNew.innerText = valueNew
    elements.badgeInwork.innerText = valueInWork
    elements.badgeComplete.innerText = valueComplete
    
    valueNew == 0 ? elements.badgeNew.classList.add('none') : elements.badgeNew.classList.remove('none')
    valueInWork == 0 ? elements.badgeInwork.classList.add('none') : elements.badgeInwork.classList.remove('none')
    valueComplete == 0 ? elements.badgeComplete.classList.add('none') : elements.badgeComplete.classList.remove('none')

    // if (valueInWork == 0){
    //     elements.badgeInwork.classList.add('none')
    // } else {
    //     elements.badgeInwork.classList.remove('none')
    // }
}

function updateFilter(filter){
    //Фильтр по продукту, выпадающий список
    elements.select.value = filter.products
    //Топ статус бар
    elements.topStatusBar.querySelectorAll('a').forEach((link) => link.classList.remove('active'))
    elements.topStatusBar.querySelector(`a[data-value="${filter.status}"]`).classList.add('active')
    //Ссылки слева
    elements.leftStatusLinks.forEach((link) => link.classList.remove('active'))
    elements.leftPanelNav.querySelector(`a[data-value="${filter.status}"]`).classList.add('active')
}


export {elements, renderRequests, updateTopStatusBar, renderBadgeNew, updateFilter}