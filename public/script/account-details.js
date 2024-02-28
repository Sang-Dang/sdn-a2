const editAccountForm = document.getElementById('edit-account-details')
const name = editAccountForm.querySelector('#name')
const username = editAccountForm.querySelector('#username')
const yob = editAccountForm.querySelector('#yob')

const SaveButton = document.getElementById('save-changes')

SaveButton.addEventListener('click', async e => {
    e.preventDefault()

    SaveButton.setAttribute('disabled', 'disabled')
    SaveButton.innerHTML = 'Saving...'

    const data = {
        name: name.value,
        username: username.value,
        yob: Number(yob.value),
    }

    try {
        await fetch('/api/v1/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        alert(`Account details updated successfully`)
        window.location.reload()
    } catch (error) {
        console.error(error)
        alert(`Failed to update user details`)
    } finally {
        SaveButton.removeAttribute('disabled')
        SaveButton.innerHTML = 'Save Changes'
    }
})

const changePasswordForm = document.getElementById('change-password-form')
const input_old_password = changePasswordForm.querySelector('#old-password')
const input_password = changePasswordForm.querySelector('#password')
const input_confirm_password = changePasswordForm.querySelector('#confirm-password')

const updatePasswordButton = document.getElementById('update-password')

updatePasswordButton.addEventListener('click', async e => {
    e.preventDefault()

    updatePasswordButton.setAttribute('disabled', 'disabled')
    updatePasswordButton.innerHTML = 'Updating...'

    const data = {
        newPassword: input_password.value,
        confirm_password: input_confirm_password.value,
        oldPassword: input_old_password.value,
    }

    console.log(data)

    if (data.newPassword !== data.confirm_password) {
        alert('Passwords do not match')
        return
    }

    try {
        await fetch('/api/v1/users/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        alert(`Password updated successfully`)
        window.location.reload()
    } catch (error) {
        console.error(error)
        alert(`Failed to update password`)
    } finally {
        updatePasswordButton.removeAttribute('disabled')
        updatePasswordButton.innerHTML = 'Change Password'
    }
})
