function task2() {
  const obj = {
    name: "Anton", 
    age: 36, 
    skills: ["Javascript", "HTML", "CSS"], 
    salary: 80000,
  };

  console.log(JSON.stringify(obj));
}

document.querySelector('#task-2').addEventListener('click', (e) => {
  e.preventDefault();
  task2();
});