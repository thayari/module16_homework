let userData = {};

if (!localStorage.getItem('userData')) {
  const name = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
  let date = new Date();
  userData = {name: name, date: date};
} else {
  userData = JSON.parse(localStorage.getItem('userData'));
  console.log(`Добрый день, ${userData.name}! Давно не виделись. В последний раз вы были у нас ${formatDate(userData.date)}.`);
  userData.date = new Date();
}

localStorage.setItem('userData', JSON.stringify(userData));

// возвращает строку с датой и временем
function formatDate(rawDate) {
  const date = new Date(rawDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

document.querySelector('#clear-localstorage').addEventListener('click', () => {
  localStorage.removeItem('userData');
})