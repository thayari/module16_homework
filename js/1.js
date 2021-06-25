function task1() {
  const parser = new DOMParser();

  const xmlString = `<list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
    </list>`;

  const xmlDOM = parser.parseFromString(xmlString, "text/xml");

  const listNode = xmlDOM.querySelector('list');
  const studentNodes = listNode.querySelectorAll('student');

  const students = [];

  studentNodes.forEach(element => {
    const student = {};
    student.name = `${element.querySelector('first').textContent} ${element.querySelector('second').textContent}`
    student.age = element.querySelector('age').textContent;
    student.prof = element.querySelector('prof').textContent;
    student.lang = element.querySelector('name').getAttribute('lang');

    console.log(student);
  });
}

document.querySelector('#task-1').addEventListener('click', (e) => {
  e.preventDefault();
  task1();
});
