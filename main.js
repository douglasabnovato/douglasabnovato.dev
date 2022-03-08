const div_box_projects = document.getElementById('box-projects')

    const div_project_cards = document.createElement('div')
    div_project_cards.setAttribute('class', 'project cards')

        const div_fragment = document.createElement('div')
        div_fragment.setAttribute('class', 'fragment')

            const div_title_project = document.createElement('div')
            div_title_project.setAttribute('class', 'title-project')

                const span_icons_folder = document.createElement('span')
                span_icons_folder.setAttribute('class', 'icons-folder')

                const span_title = document.createElement('span')
                span_title.innerText = "rocketseat-fundamentos"

            div_title_project.appendChild(span_icons_folder)
            div_title_project.appendChild(span_title)

        div_fragment.appendChild(div_title_project)
    
    div_project_cards.appendChild(div_fragment)

div_box_projects.appendChild(div_project_cards)
