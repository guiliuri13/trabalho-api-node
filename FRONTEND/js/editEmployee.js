function getEmployee() {
  return JSON.parse(localStorage.getItem("employee"));
}

function initialize() {
  const employee = getEmployee();
  const nameInput = document.getElementById("inputNome");
  const idInput = document.getElementById("inputId");

  nameInput.value = employee.name;
  idInput.value = employee.id;
}

window.onload = () => initialize();

function handleEditManager(e) {
  e.preventDefault();

  const id = document.getElementById("inputId");
  const name = document.getElementById("inputNome");

  fetch("http://localhost:3000/employee/update", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      name: name.value,
      id: id.value,
      is_pj: false,
    }),
  });
}

const send = document.getElementById("send");
send.onclick = (e) => handleEditManager(e);
