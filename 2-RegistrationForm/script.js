const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  let isValid = true;

  // clear previous errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // Name validation
  if (name.value.trim() === "") {
    showError(name, "Name is required");
    isValid = false;
  }

  // Email validation
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, "Invalid email format");
    isValid = false;
  }

  // Password validation
  if (password.value.trim() === "") {
    showError(password, "Password is required");
    isValid = false;
  }

  // Confirm password validation
  if (confirmPassword.value.trim() === "") {
    showError(confirmPassword, "Confirm password is required");
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    isValid = false;
  }

  // ✅ If all validations pass
  if (isValid) {

    // Create user object
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value
    };

    // Save to localStorage
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    alert("Registration Successful! Data saved in localStorage");

    form.reset();
  }
});

function showError(input, message) {
  input.nextElementSibling.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
