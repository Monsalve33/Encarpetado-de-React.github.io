const person = {
  name: "Juan Carlos Valencia",
  age: 30,
  city: "Cali",
  profession: "Desarrollador"
};

const tbody = document.querySelector("tbody");
const emptyState = document.getElementById("emptyState");

function addData() {
  tbody.innerHTML = "";
  emptyState.classList.add("d-none");

  const { name, age, city, profession } = person;

  tbody.innerHTML = `
    <tr>
      <td>
        <strong>Nombre:</strong> ${name}<br>
        <strong>Edad:</strong> ${age}<br>
        <strong>Ciudad:</strong> ${city}<br>
        <strong>Profesión:</strong> ${profession}
      </td>
    </tr>
  `;
}
