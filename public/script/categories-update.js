const nameInput = document.getElementById('input_name')
const descriptionInput = document.getElementById('input_description')

const submitBtn = document.getElementById('category-update-submit')
const id = submitBtn.getAttribute('data-id')

submitBtn.addEventListener('click', async () => {
    const name = nameInput.value
    const description = descriptionInput.value

    if (
        !name ||
        name.length < 3 ||
        name.length > 255 ||
        !description ||
        description.length < 3 ||
        description.length > 255
    ) {
        alert('Invalid input')
        return
    }

    const data = {
        name,
        description,
    }

    await fetch(`/api/v1/categories/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    window.location.href = '/categories'
})
