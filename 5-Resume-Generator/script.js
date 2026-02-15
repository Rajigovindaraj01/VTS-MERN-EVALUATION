function readImage(input, callback) {
  if (input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(input.files[0]);
  }
}

function generateResume() {
  document.getElementById("formPage").classList.add("hidden");
  document.getElementById("resumePage").classList.remove("hidden");

  document.getElementById("rName").textContent =
    document.getElementById("name").value;

  document.getElementById("rProfession").textContent =
    document.getElementById("profession").value;

  document.getElementById("rObjective").textContent =
    document.getElementById("objective").value;

  document.getElementById("rEducation").textContent =
    document.getElementById("education").value;

  document.getElementById("rSkills").textContent =
    document.getElementById("skills").value;

  document.getElementById("rExperience").textContent =
    document.getElementById("experience").value;

  document.getElementById("rAchievements").textContent =
    document.getElementById("achievements").value;

  document.getElementById("rProjectDesc").textContent =
    document.getElementById("projectDesc").value;

  document.getElementById("rGithub").href =
    document.getElementById("github").value;

  document.getElementById("rPortfolio").href =
    document.getElementById("portfolio").value;

  document.getElementById("rLinkedin").href =
    document.getElementById("linkedin").value;

  readImage(
    document.getElementById("profileImg"),
    img => document.getElementById("rProfile").src = img
  );

  readImage(
    document.getElementById("projectImg"),
    img => document.getElementById("rProjectImg").src = img
  );
}

function printResume() {
  window.print();
}

function downloadPDF() {
  const resume = document.getElementById("resume");

  const options = {
    margin: 0.3,
    filename: 'My_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(resume).save();
}
