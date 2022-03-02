function getGithub(url){
    let request = new XMLHttpRequest()

    request.open("GET", url, false)
    request.send()

    return request.responseText
}

function getRepositorio(user){

    repository = document.createElement("tr")

    namerepos = document.createElement("td")
    description = document.createElement("td")
    stars = document.createElement("td")
    gitbranches = document.createElement("td")
    language = document.createElement("td")

    namerepos.innerHTML = user.name
    description.innerHTML = user.description
    stars.innerHTML = user.stargazers_count
    gitbranches.innerHTML = user.forks_count
    language.innerHTML = user.language

    repository.appendChild(namerepos)
    repository.appendChild(description)
    repository.appendChild(stars)
    repository.appendChild(gitbranches)
    repository.appendChild(language)

    return repository

}

function main(){

    let data = getGithub("https://api.github.com/users/douglasabnovato/repos")
    let users = JSON.parse(data)  
    
    let tablerepos = document.getElementById("tablerepos")

    users.forEach(element => {
        let repository = getRepositorio(element)

        tablerepos.appendChild(repository)
    })

}

main() 
