const categoryListPrev = document.querySelector('#category-list-prev')
const categoryListNext = document.querySelector('#category-list-next')
const page = Number(categoryListNext.getAttribute('data-page'))
const maxPages = Number(categoryListNext.getAttribute('data-total'))

categoryListNext.disabled = page === maxPages - 1
categoryListPrev.disabled = page === 0

categoryListPrev.addEventListener('click', function () {
    if (page > 0) {
        window.location.href = `${window.origin}/categories?page=${page - 1}`
    }
})

categoryListNext.addEventListener('click', function () {
    if (page < maxPages - 1) {
        window.location.href = `${window.origin}/categories?page=${page + 1}`
    }
})

const categoryDeleteBtns = document.querySelectorAll('#category-delete')
categoryDeleteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id')
        if (id) {
            fetch(`${window.origin}/api/v1/categories/${id}`, {
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
    })
})
