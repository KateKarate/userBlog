const API_URL = 'https://gorest.co.in/public/v2/users';

const usersContainer = document.getElementById('users-container');

function createUser(user) {
    const userProfile = document.createElement('div');
    userProfile.classList.add('user-profile');

    // create user name
    const userName = document.createElement('a');
    userName.classList.add('user-name');
    userName.innerText = user.name;
    userName.href = `posts.html?id=${user.id}`;
    
    // create user status 
    const userStatus = document.createElement('p');
    userStatus.classList.add('user-status');
    userStatus.innerText = user.status;
    if (user.status === 'active') {
        userStatus.style.color = '#50C878';
      } else {
        userStatus.style.color = '#D10000';
      }

    userProfile.appendChild(userName);
    userProfile.appendChild(userStatus);

    return userProfile;
}

function showErrorMessage(message, type = 'not-found') {
    const cl = `alert=${type}`;
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('alert', 'cl');
    errorMessage.innerText = message;

    return errorMessage;
}

function getUsers() {
    return fetch(API_URL) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return response.json()
    })
    .then(data => {

        if (!data.length) {
            const errorMessage = showErrorMessage('Users were not found');
            usersContainer.appendChild(errorMessage, 'not-found');
        }

        data.forEach(user => {
            const userProfile = createUser(user);
            usersContainer.appendChild(userProfile);
        })
    })
    .catch(error => {
        const errorMessage = showErrorMessage(error.message);
        usersContainer.appendChild(errorMessage, 'error');
    })
}

getUsers();