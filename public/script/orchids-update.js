const nameInput = document.getElementById('input_name')
const imageInput = document.getElementById('input_image')
const priceInput = document.getElementById('input_price')
const originInput = document.getElementById('input_origin')
const colorInput = document.getElementById('input_color')
const isNaturalInput = document.getElementById('input_isNatural')
const submitBtn = document.getElementById('orchid-update-submit')

const id = submitBtn.getAttribute('data-id')

submitBtn.addEventListener('click', async () => {
    const name = nameInput.value
    const image = imageInput.value
    const price = Number(priceInput.value)
    const origin = originInput.value
    const color = colorInput.value
    const isNatural = Boolean(isNaturalInput.checked)

    if (
        !name ||
        name.length < 3 ||
        name.length > 255 ||
        !image ||
        image.length < 3 ||
        image.length > 255 ||
        !price ||
        price < 0 ||
        !origin ||
        origin.length < 3 ||
        origin.length > 255 ||
        !color ||
        color.length < 3 ||
        color.length > 255
    ) {
        alert('Inputs cannot be empty')
        return
    }

    const data = {
        name,
        image,
        price,
        origin,
        color,
        isNatural,
    }

    try {
        await fetch(`/api/v1/orchids/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (err) {
        console.error(err)
        alert('Error')
        return
    }

    window.location.href = '/orchids'
})
