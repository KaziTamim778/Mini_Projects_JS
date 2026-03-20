const name = document.getElementById('name');
const usernameLink = document.getElementById('username-link');
const bio = document.getElementById('bio');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repos = document.getElementById('repos');
const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('search-input');
const avatar = document.getElementById('avatar');
const profileCard = document.getElementById('profile-card');
const errorMessage = document.getElementById('error-msg');

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubUser(username);
    } else {
        displayError('Please enter a GitHub username.');
    }
});

usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

function fetchGitHubUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayGithubUser(data);
        })
        .catch(error => {
            console.error('Error fetching GitHub user:', error);
            displayError('User not found. Please try again.');
        });
}

function displayGithubUser(data) {
    errorMessage.classList.add('hidden');
    profileCard.classList.remove('hidden');
    avatar.src = data.avatar_url;
    name.textContent = data.name || data.login;
    usernameLink.textContent = `@${data.login}`;
    usernameLink.href = data.html_url;
    bio.textContent = data.bio || 'No bio available.';
    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.public_repos;
}

function displayError(message) {
    profileCard.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}