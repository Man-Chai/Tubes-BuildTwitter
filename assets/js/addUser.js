document.addEventListener('DOMContentLoaded', () =>  {
    
    const formManager = document.getElementById('form-manager');
    const userName = document.getElementById('name');
    const userAvatar = document.getElementById('avatar');
    const userUsername = document.getElementById('username');
    const userPassword = document.getElementById('password');

    const instantFeedback = document.getElementById('instant-feedback');


    const userManager = new User();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    formManager.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            name: userName.value,
            avatar: userAvatar.value,
            username: userUsername.value,
            password: userPassword.value,
            createdAt: `${year}-${month}-${day}`
        };
       
        const result = userManager.saveUser(userData);
        
        if (result.success){
            instantFeedback.style.display = 'none';

            return window.location.href = '../login.html';
        }
        else {
            instantFeedback.style.display = 'flex';
            instantFeedback.textContent = result.error     
         }
    });
});