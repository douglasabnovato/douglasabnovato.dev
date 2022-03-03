function getApi(url){
    let request = new XMLHttpRequest()

    request.open("GET", url,false)
    request.send()

    return request.responseText
}

function createTest(user){
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

function test(){
    let data = getApi("https://api.github.com/users/douglasabnovato/repos")
    let users = JSON.parse(data)
    let tableRepo = document.getElementById("tableRepo")

    users.forEach(project => {
        let repository = createTest(project)

        tableRepo.appendChild(repository)
    })
}

function createRepository(user){
    
    let project = document.createElement("div")
        project.className = 'project'
        project.className = 'cards'

        let fragment = document.createElement("div")
            fragment.className = 'fragment'

            let title_project = document.createElement("div")
                title_project.className = 'title-project'

                let icons_folder = document.createElement("span")
                    icons_folder.className = 'icons-folder'

                let text_title = document.createElement("span")
                    text_title.innerHTML = user.name

            title_project.appendChild(icons_folder)
            title_project.appendChild(text_title)
            
            
            let text_description_project = document.createElement("div") 
                text_description_project.className = 'description-project'
                text_description_project.innerHTML = user.description
            
            let details_project = document.createElement("div") 
                details_project.className = 'details_project'
            
                let stars_branches = document.createElement("div") 
                    stars_branches.className = 'stars-branches'
                    
                    let details_star = document.createElement("div") 

                        let icons_star = document.createElement("span") 
                            icons_star.className = 'icons-star'

                        let text_star = document.createElement("span") 
                            text_star.innerHTML = user.stargazers_count
                    
                    details_star.appendChild(icons_star)
                    details_star.appendChild(text_star)

                    let details_gitbranch = document.createElement("div")

                        let icons_gitbranch = document.createElement("span") 
                            icons_gitbranch.className = 'icons_gitbranch'

                        let text_gitbranch = document.createElement("span")
                            text_gitbranch.innerHTML = user.forks_count
                    
                    details_gitbranch.appendChild(icons_gitbranch)
                    details_gitbranch.appendChild(text_gitbranch)
                                    
                    let details_languages = document.createElement("div")

                        let icons_languages = document.createElement("span") 
                            icons_languages.className = 'icons-languages'

                        let text_languages = document.createElement("span")
                            text_languages.innerHTML = user.language
                    
                    details_languages.appendChild(icons_languages)
                    details_languages.appendChild(text_languages)

                stars_branches.appendChild(details_star)
                stars_branches.appendChild(details_gitbranch)
                stars_branches.appendChild(details_languages)

            details_project.appendChild(stars_branches)

        fragment.appendChild(title_project)
        fragment.appendChild(text_description_project) 
        fragment.appendChild(details_project)
    
    project.appendChild(fragment)

    return project
}

function main(){
    let data = getApi("https://api.github.com/users/douglasabnovato/repos")
    let users = JSON.parse(data)
    let tableRepo = document.getElementById("box-projects")

    users.forEach(project => {
        let repository = createRepository(project)

        tableRepo.appendChild(repository)
    })
}

main()
