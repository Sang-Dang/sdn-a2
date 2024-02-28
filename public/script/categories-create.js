const form = document.getElementById('categories-create-form')
const input_id = document.getElementById('category-id').getAttribute('data-id')
const input_name = form.querySelector('#name')
const input_description = form.querySelector('#description')
const currentAction = document.getElementById('current-action').getAttribute('data-current')
const submit = document.getElementById('submit')
submit.addEventListener('click', async event => {
    event.preventDefault()

    submit.setAttribute('disabled', 'disabled')
    submit.innerHTML = currentAction === 'create' ? 'Creating...' : 'Updating...'

    const data = {
        name: input_name.value,
        description: input_description.value,
    }

    try {
        const response = await fetch(`/api/v1/categories${currentAction === 'update' ? `/${input_id}` : ''}`, {
            method: currentAction === 'create' ? 'POST' : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        alert(`Category ${currentAction === 'create' ? 'created' : 'updated'} successfully`)
        window.location.href = '/categories'
    } catch (error) {
        console.error(error)
        alert(`Failed to ${currentAction === 'create' ? 'create' : 'update'} category`)
    } finally {
        submit.removeAttribute('disabled')
        submit.innerHTML = currentAction === 'create' ? 'Create' : 'Update'
    }
})
