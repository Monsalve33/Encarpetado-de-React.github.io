//Realizar las operaciones Eliminar y Editar

function validateForm() {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let doc = document.getElementById("doc").value;
    let accio = document.getElementById("accio").value;

    if (email === "" || name === "" || doc === "" || accio === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (!email.includes("@")) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

function showData() {
  let listData;
  if (localStorage.getItem("listData") == null) {
      listData = [];
  } else {
    listData = JSON.parse(localStorage.getItem("listData"));
  }
  let html = "";
  listData.forEach(function (element, index) {
      html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.doc + "</td>";
        html += "<td>" + element.accio + "</td>";
        html += "<td><button onclick='deleteData(" +
        index + ")'class='btn btn-danger'>Eliminar</button><button onclick='updateData(" +
        index +")'class='btn btn-warning'>editar</button></td>";
        html += "</tr>";
    });
    document.querySelector("#tableData tbody").innerHTML = html;
}

document.onload = showData();

function addData() {
    if (validateForm() == true) {
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let doc = document.getElementById("doc").value;
        let accio = document.getElementById("accio").value;

        let listData;
        if (localStorage.getItem("listData") == null) {
            listData = [];
        } else {
            listData = JSON.parse(localStorage.getItem("listData"));
        }
        listData.push({
            email: email,
            name: name,
          doc: doc,
          accio: accio
        });
        localStorage.setItem("listData", JSON.stringify(listData));
        showData();
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
      document.getElementById("doc").value = "";
      document.getElementById("accio").value = "";
  }
}

function deleteData(index) {
  let listData;
  if (localStorage.getItem("listData") == null) {
    listData = [];
  } else {
    listData = JSON.parse(localStorage.getItem("listData"));
  }
  listData.splice(index, 1);
  localStorage.setItem("listData", JSON.stringify(listData));
  showData();
}

function updateData(index) {
  let listData;
  if (localStorage.getItem("listData") == null) {
    listData = [];
  } else {
    listData = JSON.parse(localStorage.getItem("listData"));
  }
  document.getElementById("email").value = listData[index].email;
  document.getElementById("name").value = listData[index].name;
  document.getElementById("doc").value = listData[index].doc;
  document.getElementById("accio").value = listData[index].accio;
  document.getElementById("index").value = index;
}

