function getPoint() {
  return JSON.parse(localStorage.getItem("point"));
}

function getEmployee() {
  return JSON.parse(localStorage.getItem("employee"));
}

function initialize() {
  const point = getPoint();
  const location = document.getElementById("location");
  const hour = document.getElementById("hour");

  location.value = point.location;
  hour.value = point["DATETIME(created_at)"];
}

window.onload = () => initialize();

function handleEditPoint(e) {
  e.preventDefault();

  const employee = getEmployee();
  const point = getPoint();
  const location = document.getElementById("location");
  const hour = document.getElementById("hour");

  fetch(`http://localhost:3000/ponto/update/${point.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      employee_id: employee.id,
      location: location.value,
      new_date: hour.value,
    }),
  });
}

const send = document.getElementById("send");
send.onclick = (e) => handleEditPoint(e);
