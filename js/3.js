function task3() {
  const createTable = (data) => {
    const resultNode = document.querySelector("#result");
    resultNode.innerHTML = '';
    const table = document.createElement("table");
    table.classList = 'table';
    table.innerHTML = `<thead>
        <tr>
          <th scope="col">1 кв.</th>
          <th scope="col">2 кв.</th>
          <th scope="col">3 кв.</th>
          <th scope="col">4 кв.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${data.sales.q1}</td>
          <td>${data.sales.q2}</td>
          <td>${data.sales.q3}</td>
          <td>${data.sales.q4}</td>
        </tr>
      </tbody>`;
    
    resultNode.insertAdjacentElement('afterbegin', table);
  };

  const createChartButton = (data, year) => {
    const openChartButton = `
    <a class="btn btn-primary" 
      href="https://quickchart.io/chart?bkg=white&c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'],datasets:[{label:'Выручка за ${year} год',data:[${data.sales.q1},${data.sales.q2},${data.sales.q3},${data.sales.q4}]}]}}">
      Открыть график
    </a>`;
    document.querySelector('#show-chart').innerHTML = openChartButton;
  };

  const year = document.querySelector('.form-select');

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440');
  xhr.send();

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
    } else { 
      const data = JSON.parse(xhr.response);
      const result = data.filter(item => item.year == year.value)[0];
      createTable(result); 
      createChartButton(result, year.value);
    }
  };
}

document.querySelector('#load').addEventListener('click', (e) => {
  e.preventDefault();
  task3();
});