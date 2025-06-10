document.addEventListener("DOMContentLoaded", () => {
  const formManager = document.getElementById("form-manager");
  const userUsername = document.getElementById("username");
  const userPassword = document.getElementById("password");

  const instantFeedback = document.getElementById("instant-feedback");

  instantFeedback.style.display = "none";

  const userManager = new User();
  formManager.addEventListener("submit", (e) => {
    e.preventDefault();

    const userData = {
      username: userUsername.value,
      password: userPassword.value,
    };

    const result = userManager.userSignIn(userData);

    if (result.success) {
      instantFeedback.style.display = "none";
      localStorage.setItem("usernameLoggedIn", userUsername.value);

      return (window.location.href = "../index.html");
    } else {
      instantFeedback.style.display = "flex";
      instantFeedback.textContent = result.error;
    }
  });
});
