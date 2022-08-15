const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/home", function (require, response) {
  const items = [
    {
      title: "D",
      message: "Desenvolver aplicações/serviços de forma fácil.",
    },
    {
      title: "E",
      message: "EJS usa JavaScript para renderizar HTML.",
    },
    {
      title: "M",
      message: "Muito fácil de usar.",
    },
    {
      title: "A",
      message: "Amorzinho.",
    },
    {
      title: "I",
      message: "install ejs.",
    },
    {
      title: "S",
      message: "Sintaxe Simples.",
    },
  ];

  const subtitle = "Uma linguagem de modelagem para criação de página HTML.";

  response.render("pages/index", {
    qualitys: items,
    subtitle: subtitle,
  });
});

app.get("/sobre", function (require, response) {
  response.render("pages/about");
});

app.listen(8080);
console.log("Loading - @douglasabnovato");
