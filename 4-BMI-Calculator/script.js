let bmiChart;

function calculateBMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const result = document.getElementById("result");

  if (!height || !weight) {
    result.style.display = "block";
    result.style.background = "#ff6b6b";
    result.textContent = "Please fill all fields";
    return;
  }

  const h = height / 100;
  const bmi = (weight / (h * h)).toFixed(2);

  let index, text, color;

  if (bmi < 18.5) {
    index = 0;
    text = "Underweight";
    color = "#ffd166";
  } else if (bmi < 25) {
    index = 1;
    text = "Normal";
    color = "#06d6a0";
  } else {
    index = 2;
    text = "Overweight";
    color = "#ef476f";
  }

  result.style.display = "block";
  result.style.background = color;
  result.textContent = `BMI: ${bmi} (${text})`;

  drawChart(index);
}

function drawChart(activeIndex) {
  const data = [0, 0, 0];
  data[activeIndex] = 1;

  if (bmiChart) bmiChart.destroy();

  const ctx = document.getElementById("bmiChart");

  bmiChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Underweight", "Normal", "Overweight"],
      datasets: [{
        data,
        backgroundColor: ["#ffd166", "#06d6a0", "#ef476f"]
      }]
    },
    options: {
      animation: {
        animateScale: true
      },
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      }
    }
  });
}

function resetBMI() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").style.display = "none";
  if (bmiChart) bmiChart.destroy();
}
