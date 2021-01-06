const currentPage = window.location.pathname

const menuItems = document.querySelectorAll('header#main .menu ul a')
if (menuItems) menuItems.forEach(page => {
    if (currentPage.includes(page.getAttribute('href'))) page.classList.add('active')
})

const deleteForms = document.querySelectorAll('form.delete')
if (deleteForms) deleteForms.forEach(form => {
    const button = form.children[0]
    button.addEventListener('click', (event) => {
        const confirmation = confirm('Tem certeza que deseja apagar? Essa ação é irreversível.')
        if(!confirmation) event.preventDefault()
    })
})