document.body.onload = adcElemento;

function adcElemento () {

  // cria um novo elemento div e dá à ele conteúdo
  var divNova = document.createElement("div");
  var conteudoNovo = document.createTextNode("Olá, cumprimentos!");

  //adiciona o nó de texto à nova div criada
  divNova.appendChild(conteudoNovo); 

  // adiciona o novo elemento criado e seu conteúdo ao DOM
  var divAtual = document.getElementById("div1");
  document.body.insertBefore(divNova, divAtual);

}

function getApi(url){
    let request = new XMLHttpRequest()
    request.open("GET", url,false)
    request.send()
    return request.responseText
}

function createRepository(user){

}

function main(){
    data = getApi("https://api.github.com/users/douglasabnovato/repos")
    users = JSON.parse(data)

    for(let i=0; i < users.length; i++){        
        console.log("Repository: ",i)
        console.log(users[i].name)
        console.log(users[i].description)
        console.log(users[i].stargazers_count)
        console.log(users[i].forks_count)
        console.log(users[i].language) 
    }
    
}

main()
