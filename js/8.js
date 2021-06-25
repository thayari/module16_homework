const requestButton = document.querySelector('#request-button');
const inputNumber = document.querySelector('#input-number');
const inputLimit = document.querySelector('#input-limit');
const output = document.querySelector('#output');
const container = document.querySelector('.container');

requestButton.addEventListener('click', handleRequest);

function handleRequest() {
  output.innerHTML = '';

  const number = inputNumber.value;
  const limit = inputLimit.value;

  let error = false;
  const showErrorMsg = (msg) => {
    error = true;
    errorMsg = msg;
    container.classList.remove('container-nomargin');
  }

  if (checkInput(number) && checkInput(limit)) {
    showErrorMsg('Номер страницы и лимит вне диапазона от 1 до 10');
  } else if (checkInput(number)) {
    showErrorMsg('Номер страницы вне диапазона от 1 до 10');
  } else if (checkInput(limit)) {
    showErrorMsg('Лимит вне диапазона от 1 до 10');
  };

  if (error) {
    output.innerHTML = `<p>${errorMsg}</p>`;
  } else {
    fetchData(number, limit);
  };
}

function checkInput(n) {
  if (n < 1 || n > 10 || isNaN(n)) {
    return true;
  }
}

function fetchData(number, limit) {
  fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
    .then(response => response.json())
    .then(json => renderList(json))
    .catch((err) => { 
      console.error(err);
    });
}

function renderList(list) {
  console.log(list);
  saveList(list);
  container.classList.add('container-nomargin');
  list.forEach(element => {
    output.insertAdjacentHTML('beforeend', `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 g-4" >
      <a class="image"
        href=${element.download_url}
        id=${element.id} 
        style="background-image: url(${element.download_url})"
        title="${element.author}">
      </a>
    </div>`)
  });
}

function saveList(list) {
  localStorage.setItem('images', JSON.stringify(list));
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('test');
  if (localStorage.getItem('images')) {
    renderList(JSON.parse(localStorage.getItem('images')))
  }
})