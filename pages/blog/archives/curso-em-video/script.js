function toLoad() {
  var img = window.document.getElementById("image");
  var msg = window.document.getElementById("message");

  var date = new Date();
  var hour = date.getHours();

  msg.innerHTML = `Agora são ${hour} horas.`;
  if (hour >= 0 && hour < 12) {
    img.src = "./assets/manha-1.jpeg";
    document.body.style.background = "rgb(237, 216, 171)";
  } else if (hour >= 12 && hour < 18) {
    img.src = "./assets/tarde-1.jpg";
    document.body.style.background = "rgb(199, 161, 138)";
  } else {
    img.src = "./assets/noite-1.jpg";
    document.body.style.background = "rgb(142, 149, 97)";
  }
}

function toCheck() {
  var date = new Date();
  var year = date.getFullYear();

  var fyear = document.getElementById("txtyear");
  var response = document.querySelector("div#response");

  if (fyear.value.length == 0 || Number(fyear.value) > year) {
    window.alert("[ERRO] verifique os dados e tente novamente.");
  } else {
    var fsex = document.getElementsByName("radsex");
    var age = year - Number(fyear.value);
    var genre = "";
    var img = document.createElement("img");

    img.setAttribute("id", "picture-person");
    img.setAttribute("class", "image");

    if (fsex[0].checked) {
      genre = "Man";
      if (age >= 0 && age < 10) {
        img.setAttribute("src", "./assets/he.jpg");
      } else if (age < 21) {
        img.setAttribute("src", "./assets/young-man.jpg");
      } else if (age < 50) {
        img.setAttribute("src", "./assets/man.jpg");
      } else {
        img.setAttribute("src", "./assets/granfather.jpg");
      }
    } else if (fsex[1].checked) {
      genre = "Woman";
      if (age >= 0 && age < 10) {
        img.setAttribute("src", "./assets/she.jpg");
      } else if (age < 21) {
        img.setAttribute("src", "./assets/young-woman.jpg");
      } else if (age < 50) {
        img.setAttribute("src", "./assets/woman.jpg");
      } else {
        img.setAttribute("src", "./assets/granmother.jpg");
      }
    }

    response.style.textAlign = "center";
    response.innerHTML = `Detectamos ${genre} com ${age} anos`;
    response.appendChild(img);
  }
}

function toCount() {
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var step = document.getElementById("step");

  var contar = document.querySelector("div#contar-dados");

  if (
    start.value.length == 0 ||
    end.value.length == 0 ||
    step.value.length == 0
  ) {
    contar.innerHTML += "Impossível contar.";
    window.alert("[ERRO] Faltam dados.");
  } else {
    contar.innerHTML = "Contando...";

    let startaux = Number(start.value);
    let endaux = Number(end.value);
    let stepaux = Number(step.value);

    if (stepaux == 0) {
      window.alert("Passo zero. Considerando passo igual a um.");
      sp = 1;
    }

    if (startaux < endaux) {
      for (let count = startaux; count <= endaux; count += stepaux) {
        contar.innerHTML += `${count} \u{1F449}`;
      }
    } else {
      for (let count = startaux; count >= endaux; count -= stepaux) {
        contar.innerHTML += `${count} \u{1F449}`;
      }
    }

    contar.innerHTML += `\u{1F3C1}`;
  }
}

function toCalculate() {
  let num = document.getElementById("intabuada");
  let tab = document.getElementById("tabuada");

  if (num.value.length == 0) {
    window.alert("Por favor, digite um número.");
  } else {
    let n = Number(num.value);
    let count = 0;

    tab.innerHTML = "";

    while (count <= 10) {
      let item = document.createElement("option");

      if (count == 0) {
        item.text = `Tabuada do ${n}`;
      } else {
        item.text = `${n} x ${count} = ${n * count}`;
        item.value = `${count}`;
      }

      tab.appendChild(item);
      count++;
    }
  }
}
