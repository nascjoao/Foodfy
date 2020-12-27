const sections = document.querySelectorAll('#recipe-show > section')
if (sections) {
    sections.forEach(section => {
        // TOGGLE BUTTON
        const toggle = document.createElement('button')
        toggle.append('esconder')
        toggle.classList.add('toggle')

        // SECTION
        const sectionContent = section.children[1]
        const sectionTitle = section.children[0]
        sectionTitle.appendChild(toggle)
        const sectionToggle = sectionTitle.children[1]

        sectionToggle.addEventListener('click', () => {
            if (sectionToggle.innerHTML == 'esconder') {
                sectionToggle.innerHTML = 'mostrar'
                sectionContent.classList.add('hidden')
            } else {
                sectionToggle.innerHTML = 'esconder'
                sectionContent.classList.remove('hidden')
            }
        })
    })
}