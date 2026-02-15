const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

const dayIcon =
  "https://cdn-icons-png.flaticon.com/512/869/869869.png";

const nightIcon =
  "https://cdn-icons-png.flaticon.com/512/581/581601.png";

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "night") {
  document.body.classList.add("night");
  icon.src = nightIcon;
} else {
  icon.src = dayIcon;
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");

  if (document.body.classList.contains("night")) {
    localStorage.setItem("theme", "night");
    icon.src = nightIcon;
  } else {
    localStorage.setItem("theme", "day");
    icon.src = dayIcon;
  }
});
