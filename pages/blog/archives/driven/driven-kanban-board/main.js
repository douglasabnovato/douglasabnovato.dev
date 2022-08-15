/* adicionar uma tarefa */
function addCard(element) {
  const ulId = element.previousElementSibling.id;
  const text = prompt("Qual é a tarefa?");
  const board = document.getElementById(ulId);

  const template = `
    <li id="${new Date().getTime()}" draggable="true" ondragstart="drag(event)">
        <p>${text}</p>
        <p class="remove" onclick="removeCard(this)">x</p>
    </li>
  `;

  board.innerHTML += template;
}

/* remover uma tarefa */
function removeCard(element) {
  document.getElementById(element.parentElement.id).remove();
}

/* arrastar uma tarefa entre os quadros */
function drag(event) {
  event.dataTransfer.setData("card", event.target.id);
}

function over(event) {
  event.preventDefault();
}

function drop(event, id) {
  event.preventDefault();
  
  const target = document.getElementById(id);
  const data = event.dataTransfer.getData("card");
  const card = document.getElementById(data);

  target.appendChild(card);
  event.dataTransfer.clearData();
}
