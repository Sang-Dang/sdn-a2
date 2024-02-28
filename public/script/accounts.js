const accountListPrev = document.querySelector('#account-list-prev')
const accountListNext = document.querySelector('#account-list-next')
const page = Number(document.querySelector('#page').getAttribute('data-page'))
const maxPages = Number(document.querySelector('#totalPages').getAttribute('data-totalPages'))

accountListPrev.disabled = page === maxPages - 1
accountListNext.disabled = page === 0

accountListNext.addEventListener('click', function () {
    if (page > 0) {
        window.location.href = `/accounts?page=${page - 1}`
    }
})

accountListPrev.addEventListener('click', function () {
    if (page < maxPages - 1) {
        window.location.href = `/accounts?page=${page + 1}`
    }
})
