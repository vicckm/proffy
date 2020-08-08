// dados

const proffys = [
  {
    name: "Diego Fernandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "21996857489",
    bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from:[720],
    time_to: [4872]
  },
  {
    name: "Victoria Marques",
    avatar: "https://avatars1.githubusercontent.com/u/32624288?s=460&u=473717f076dbbe0745a13ea9fc6b1edc59d4b6d8&v=4",
    whatsapp: "21996857489",
    bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [1],
    time_from:[720],
    time_to: [4872]
  }
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

// funcionalidades

function getSubject(subjectNumber){
  const position = +subjectNumber - 1;
  return subjects[position];
}

function pageLanding(req, res) {
  return res.render("index.html");
}

function pageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
  const data = req.query;
  const isNotEmpty = Object.keys(data).length > 0;
  if(isNotEmpty){
    data.subject = getSubject(data.subject);

    proffys.push(data);

    return res.redirect("/study");
  } 
  
  return res.render("give-classes.html", {subjects, weekdays});
}

// antes de usar o nunjucks, a página estava sendo renderizada assim: 
// function pageLanding(req, res) {
//   return res.sendFile(__dirname + "/views/index.html");
// }

// function pageStudy(req, res) {
//   return res.sendFile(__dirname + "/views/study.html");
// }

// function pageGiveClasses(req, res) {
//   return res.sendFile(__dirname + "/views/give-classes.html");
// }


// servidor

const express = require("express");
const server = express();

// configurar nunjucks (template engine)
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,

})

// inicio e configuração do servidor

server
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  // start do servidor
  .listen(5500);
