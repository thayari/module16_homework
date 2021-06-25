const listNode = document.querySelector('.list-group');

function renderList(list) {
  list.forEach(element => {
    let html = `
      <li class="list-group-item${element.completed ? ' text-decoration-line-through' : ''}">
        ${element.title}
      </li>`;
    listNode.insertAdjacentHTML('beforeend', html);
  });
}

function fetchData(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    .then(response => response.json())
    .then(json => renderList(json))
    .catch((err) => { 
      console.log(err);
      listNode.innerHTML = '<li class="list-group-item bg-danger text-white">Пользователь с указанным id не найден</li>';
    });
}

document.querySelector('#fetch-button').addEventListener('click', () => 
  {
    listNode.innerHTML = '';
    fetchData(document.querySelector('#id-input').value);
  }
);