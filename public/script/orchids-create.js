const form = document.getElementById('orchid-create-form')
const input_name = form.querySelector('#name')
const input_price = form.querySelector('#price')
const input_image = form.querySelector('#image')
const input_color = form.querySelector('#color')
const input_origin = form.querySelector('#origin')
const input_category = form.querySelector('#category')
const input_isNatural = form.querySelector('#isNatural')

const currentAction = document.getElementById('current-action').getAttribute('data-current')
const orchidId = document.getElementById('orchid-id').getAttribute('data-id')

const submit = document.getElementById('submit')

submit.addEventListener('click', async event => {
    event.preventDefault()
    submit.setAttribute('disabled', 'disabled')
    submit.innerHTML = currentAction === 'create' ? 'Creating...' : 'Updating...'

    const data = {
        name: input_name.value,
        price: Number(input_price.value),
        image: input_image.value,
        color: input_color.value,
        origin: input_origin.value,
        categoryId: input_category.value,
        isNatural: input_isNatural.checked,
    }

    try {
        const response = await fetch(`/api/v1/orchids${currentAction === 'update' ? `/${orchidId}` : ''}`, {
            method: currentAction === 'create' ? 'POST' : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        console.log(result)
        alert(`Orchid ${currentAction === 'create' ? 'created' : 'updated'} successfully`)
        window.location.href = '/orchids'
    } catch (error) {
        console.error(error)
        alert(`Failed to ${currentAction === 'create' ? 'create' : 'update'} orchid`)
    } finally {
        submit.removeAttribute('disabled')
        submit.innerHTML = currentAction === 'create' ? 'Create' : 'Update'
    }
})
