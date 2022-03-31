function getApi(url_github){
    let request = new XMLHttpRequest()

    request.open("GET", url_github, false)
    request.send()

    return request.responseText
}

function createRepo(repository){

        const div_project_cards = document.createElement('div')
        div_project_cards.setAttribute('class', 'project cards')

        const a_repos = document.createElement('a')
        a_repos.setAttribute('href', repository.html_url)
        a_repos.setAttribute('target', '_blank')
        a_repos.setAttribute('rel', 'noopener') 

            const div_fragment = document.createElement('div')
            div_fragment.setAttribute('class', 'fragment')

            const div_title_project = document.createElement('div')
            div_title_project.setAttribute('class', 'title-project')

            const span_icons_folder = document.createElement('span')
            span_icons_folder.setAttribute('class', 'icons-folder')

            const span_title = document.createElement('span')
            span_title.innerText = repository.name

            div_title_project.appendChild(span_icons_folder)
            div_title_project.appendChild(span_title)

            const div_description_project = document.createElement('div')
            div_description_project.setAttribute('class', 'description-project')
            div_description_project.innerText = repository.description

            const div_details_project = document.createElement('div')
            div_details_project.setAttribute('class', 'details-project')

            const div_stars_branches = document.createElement('div')
            div_stars_branches.setAttribute('class', 'stars-branches')

            const div_stars = document.createElement('div')
            const span_icons_star = document.createElement('span')
            span_icons_star.setAttribute('class', 'icons-star')

            const span_star = document.createElement('span')
            span_star.innerText = repository.stargazers_count
            div_stars.appendChild(span_icons_star)
            div_stars.appendChild(span_star)

            const div_gitbranch = document.createElement('div')
            const span_icons_gitbranch = document.createElement('span')
            span_icons_gitbranch.setAttribute('class', 'icons-gitbranch')

            const span_gitbranch = document.createElement('span')
            span_gitbranch.innerText = repository.forks_count
            div_gitbranch.appendChild(span_icons_gitbranch)
            div_gitbranch.appendChild(span_gitbranch)

            div_stars_branches.appendChild(div_stars)
            div_stars_branches.appendChild(div_gitbranch)

            const div_languages = document.createElement('div')
            const span_icons_languages = document.createElement('span')
            span_icons_languages.setAttribute('class', 'icons-languages')

            const span_languages = document.createElement('span')
            span_languages.innerText = repository.language
            div_languages.appendChild(span_icons_languages)
            div_languages.appendChild(span_languages)

            div_details_project.appendChild(div_stars_branches)
            div_details_project.appendChild(div_languages)

            div_fragment.appendChild(div_title_project)
            div_fragment.appendChild(div_description_project)
            div_fragment.appendChild(div_details_project)

        a_repos.appendChild(div_fragment)
        div_project_cards.appendChild(a_repos)

        return div_project_cards

}

function main(){
    let data = getApi("https://api.github.com/users/douglasabnovato/repos")
    let repositories = JSON.parse(data)
    let div_box_projects = document.getElementById('box-projects')
    
    repositories.forEach(repository => {
        let repo = createRepo(repository)
        div_box_projects.appendChild(repo)
    })
}

main()
