// const orchidsListPrev = document.querySelector('#orchids-list-prev')
// const orchidsListNext = document.querySelector('#orchids-list-next')
// const page = Number(document.querySelector('#page').getAttribute('data-page'))
// const maxPages = Number(document.querySelector('#totalPages').getAttribute('data-totalPages'))

// orchidsListNext.disabled = page === maxPages - 1
// orchidsListPrev.disabled = page === 0

// orchidsListPrev.addEventListener('click', function () {
//     if (page > 0) {
//         window.location.href = `${window.origin}/orchids?page=${page - 1}`
//     }
// })

// orchidsListNext.addEventListener('click', function () {
//     if (page < maxPages - 1) {
//         window.location.href = `${window.origin}/orchids?page=${page + 1}`
//     }
// })

const orchidDeleteBtns = document.querySelector('#orchid-delete')
orchidDeleteBtns &&
    orchidDeleteBtns.addEventListener('click', function () {
        const confirm = window.confirm('Are you sure you want to delete this orchid?')
        if (confirm) {
            const id = orchidDeleteBtns.getAttribute('data-id')
            if (id) {
                fetch(`${window.origin}/api/v1/orchids/${id}`, {
                    method: 'DELETE',
                }).then(res => {
                    if (res.ok) {
                        window.location.href = '/orchids?page=0'
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

const commentForm = document.getElementById('#comment-form')
const input_rating = document.querySelector('#rating')
const input_comment = document.querySelector('#comment')
const submitButton = document.querySelector('#comment-submit')
const orchidId = document.getElementById('orchid-id').getAttribute('data-id')

const hasCommented = document.getElementById('hasCommented').getAttribute('data-id') === 'true'
console.log(hasCommented, typeof hasCommented)
if (hasCommented) {
    input_rating.disabled = true
    input_comment.disabled = true
    submitButton.disabled = true
    submitButton.textContent = 'You have commented'
} else {
    input_rating.disabled = false
    input_comment.disabled = false
    submitButton.disabled = false
    submitButton.textContent = 'Submit'

    submitButton.addEventListener('click', function (e) {
        e.preventDefault()

        submitButton.disabled = true
        submitButton.textContent = 'Loading...'

        const data = {
            rating: input_rating.value,
            comment: input_comment.value,
        }

        console.log(data)

        try {
            fetch(`/api/v1/orchids/comments/${orchidId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => {
                alert('Success')
                window.location.reload()
            })
        } catch (e) {
            alert('Error')
            console.error(e)
        } finally {
            submitButton.disabled = false
            submitButton.textContent = 'Submit'
        }
    })
}
