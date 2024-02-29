const categoryListPrev = document.querySelector('#category-list-prev')
const categoryListNext = document.querySelector('#category-list-next')
const page = Number(document.querySelector('#page').getAttribute('data-page'))
const maxPages = Number(document.querySelector('#totalPages').getAttribute('data-totalPages'))
const isSearching = document.querySelector('is-searching').getAttribute('data-id') === 'true'

categoryListNext.disabled = page === maxPages - 1
categoryListPrev.disabled = page === 0

categoryListPrev.addEventListener('click', function () {
    if (page > 0) {
        if (isSearching) {
            window.location.href = `${window.origin}/categories?page=${page - 1}`
        } else {
            window.location.href = `${window.origin}/categories/search?page=${page - 1}`
        }
    }
})

categoryListNext.addEventListener('click', function () {
    if (page < maxPages - 1) {
        if (isSearching) {
            window.location.href = `${window.origin}/categories?page=${page + 1}`
        } else {
            window.location.href = `${window.origin}/categories/search?page=${page + 1}`
        }
    }
})

const categoryDeleteBtns = document.querySelectorAll('#category-delete')
categoryDeleteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const confirm = window.confirm('Are you sure you want to delete this category? NOTE: This will delete all products in this category as well.')

        if (confirm) {
            const id = btn.getAttribute('data-id')
            if (id) {
                fetch(`/api/v1/categories/${id}`, {
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
