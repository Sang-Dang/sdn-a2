const categoryListPrev = document.querySelector('#category-list-prev')
const categoryListNext = document.querySelector('#category-list-next')
const page = Number(document.querySelector('#page').getAttribute('data-page'))
const maxPages = Number(document.querySelector('#totalPages').getAttribute('data-totalPages'))

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

const categoryDeleteBtns = document.querySelector('#category-delete')
categoryDeleteBtns &&
    categoryDeleteBtns.addEventListener('click', function () {
        const confirm = window.confirm('Are you sure you want to delete this category? NOTE: This will delete all products in this category as well.')

        if (confirm) {
            const id = categoryDeleteBtns.getAttribute('data-id')
            if (id) {
                fetch(`/api/v1/categories/${id}`, {
                    method: 'DELETE',
                }).then(res => {
                    if (res.ok) {
                        window.location.href = '/categories?page=0'
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
