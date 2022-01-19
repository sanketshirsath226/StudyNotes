const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container_new');
const container_sign_up = document.getElementById('container_new');
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
	container_sign_up.classList.add("new_sign_up");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
	container_sign_up.classList.remove("new_sign_up");
});