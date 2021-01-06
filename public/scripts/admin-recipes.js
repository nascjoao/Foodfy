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

function addInput(containerName) {
    const container = document.querySelector(`#${containerName}`)
    const fieldContainer = container.children
    const newField = fieldContainer[fieldContainer.length - 2].cloneNode(true)

    if (newField.children[0].value == '') return false

    const remove = document.createElement('i')
    remove.append('remove_circle_outline')
    remove.classList.add('remove-input', 'material-icons')
    

    newField.children[0].value = ''
    if (newField.children[1]) newField.children[1].remove()
    newField.appendChild(remove)
    fieldContainer[fieldContainer.length - 2].insertAdjacentElement('afterend', newField)
}

const addInputs = document.querySelectorAll('.add-input')
if (addInputs) addInputs.forEach(input => {
    const containerName = input.parentNode.id

    input.addEventListener('click', () => {
        addInput(containerName)

        const item = input.parentNode.children[input.parentNode.children.length - 2]
        const remove = item.children[1]
        item.style.height = '61px'

        remove.addEventListener('click', () => {
            item.style.opacity = 0
            item.style.height = 0
            setTimeout(() => {
                item.remove()
            }, 400)
        })

    })

    if (currentPage.includes('editar')) {
        const containerItems = input.parentNode.querySelectorAll('.item')
        containerItems.forEach(item => {
            const remove = document.createElement('i')
            remove.append('remove_circle_outline')
            remove.classList.add('remove-input', 'material-icons')
            item.appendChild(remove)

            item.style.height = '61px'

            remove.addEventListener('click', () => {
                item.style.opacity = 0
                item.style.height = 0
                setTimeout(() => {
                    item.remove()
                }, 400)
            })
        })

        const firstItem = containerItems.item(0)
        const fistItemRemoveBtn = firstItem.lastElementChild
        fistItemRemoveBtn.remove()
    }
})
