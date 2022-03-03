function getGithub(url){
    let request = new XMLHttpRequest()

    request.open("GET", url, false)
    request.send()

    return request.responseText
}

function getRepositorio(user){



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
