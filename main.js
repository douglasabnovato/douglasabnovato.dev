function getApi(url){
    let request = new XMLHttpRequest()

    request.open("GET", url,false)
    request.send()

    return request.responseText
}

function createRepository(user){
    let repository = document.createElement("tr")

    let name = document.createElement("td")
    let description = document.createElement("td")
    let stargazers_count = document.createElement("td")
    let forks_count = document.createElement("td")     
    let language = document.createElement("td")

    name.innerHTML = user.name
    description.innerHTML = user.description
    stargazers_count.innerHTML = user.stargazers_count
    forks_count.innerHTML = user.forks_count
    language.innerHTML = user.language

    repository.appendChild(name)
    repository.appendChild(description)
    repository.appendChild(stargazers_count)
    repository.appendChild(forks_count)
    repository.appendChild(language)

    return repository
}

function main(){
    let data = getApi("https://api.github.com/users/douglasabnovato/repos")
    let users = JSON.parse(data)
 
    let tableRepo = document.getElementById("tableRepo")

    users.forEach(project => {
        let repository = createRepository(project)
        tableRepo.appendChild(repository)
    })
}

main()
