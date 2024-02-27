const orchidsListPrev = document.querySelector('#orchids-list-prev')
const orchidsListNext = document.querySelector('#orchids-list-next')
const page = Number(orchidsListNext.getAttribute('data-page'))
const maxPages = Number(orchidsListNext.getAttribute('data-total'))

orchidsListNext.disabled = page === maxPages - 1
orchidsListPrev.disabled = page === 0

orchidsListPrev.addEventListener('click', function () {
    if (page > 0) {
        window.location.href = `${window.origin}/orchids?page=${page - 1}`
    }
})

orchidsListNext.addEventListener('click', function () {
    if (page < maxPages - 1) {
        window.location.href = `${window.origin}/orchids?page=${page + 1}`
    }
})

const orchidDeleteBtns = document.querySelectorAll('#orchid-delete')
orchidDeleteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const confirm = window.confirm(
            'Are you sure you want to delete this orchid?',
        )
        if (confirm) {
            const id = btn.getAttribute('data-id')
            if (id) {
                fetch(`${window.origin}/api/v1/orchids/${id}`, {
                    method: 'DELETE',
                }).then(res => {
                    if (res.ok) {
                        window.location.reload()
                        alert('Success')
                    } else {
                        alert('Error')
                    }
                })
            } else {
                alert('Error')
            }
        }
    })
})

const imageModal = document.querySelector('#image-modal')
const imageModalTag = imageModal.querySelector('#img')
const imageModalOpens = document.querySelectorAll('#image-modal-open')
const imageModalClose = document.querySelector('#image-modal-close')
const imageModalBackdrop = document.querySelector('#image-modal-backdrop')

imageModalOpens.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.getAttribute('data-image'))
        imageModalTag.src = btn.getAttribute('data-image')
        imageModal.showModal()
        console.log(imageModalTag)
    })
})

imageModalClose.addEventListener('click', () => {
    imageModal.close()
})

imageModalBackdrop.addEventListener('click', () => {
    imageModal.close()
})