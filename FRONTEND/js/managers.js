async function handleCreateManager(e) {
    e.preventDefault();
  
    const name = document.getElementById("inputNome").value;
    const employer_id = document.getElementById("employer_id").value;
  
    try {
      await fetch("http://localhost:3000/manager/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name: name,
          employer_id: employer_id,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  const buttonSend = document.getElementById("send");
  buttonSend.onclick = (e) => handleCreateManager(e);
  