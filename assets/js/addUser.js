document.addEventListener('DOMContentLoaded', () => {

    const formManager = document.getElementById('formManager');
    const userName = document.getElementById('name');
    const userAvatar = document.getElementById('avatar');
    const userUsername = document.getElementById('username');
    const userPassword = document.getElementById('password');

    const instantFeedback = document.getElementById('instantFeedback');
    instantFeedback.style.display = 'none';

    const userManager = new User();
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');

    formManager.addEventListener('submit', (event) => {

        event.preventDefault();

        const userData = {
            name: userName.value,
            avatar: userAvatar.value,
            username: userUsername.value,
            password: userPassword.value,
            createAt: `${year}-${month}-${date}`, // Date format: yyyy-mm-dd
        }

        const result = userManager.saveUsers(userData);
        if (result.success) {
            instantFeedback.style.display = 'none';
            return window.location.href = '../login.html'; // Redirect user to login page
        } else {
            instantFeedback.style.display = 'block';
            instantFeedback.textContent = result.error;
        }

    });
});