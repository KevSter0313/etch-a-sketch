// Menu
const svgs = document.querySelectorAll("svg");
svgs.forEach((svg) => svg.addEventListener("click", (e) => toggleMenu(e)));
function toggleMenu({ target }) {
  const menu = document.getElementById("menu");
  if (target.id == "open-menu") {
    menu.classList.toggle("active");
  } else {
    menu.classList.toggle("active");
  }
}

// Slider and Canvas
const slider = document.querySelector("#size-slider");
const canvas = document.querySelector("#canvas");
const canvasRows = document.querySelector("#canvas-rows");
const canvasColumns = document.querySelector("#canvas-columns");
const inputColor = document.querySelector("#canvas-color");
let canvasColor = document.querySelector("#canvas-color").value;
let isRainbowModeActive = false;

canvasRows.innerHTML = slider.value;
canvasColumns.innerHTML = slider.value;
canvas.style = `--rows:${slider.value}; --columns:${slider.value}`;
appendSquaresToCanvas();

slider.addEventListener("mousemove", (e) => changeTextRowsColumns(e));
slider.addEventListener("mouseup", (e) => changeCanvasSize(e));
inputColor.addEventListener("change", (e) => {
  changeCanvasColor(e);
});
inputColor.addEventListener("click", () => (isRainbowModeActive = false));

function changeTextRowsColumns({ target }) {
  canvasRows.innerHTML = target.value;
  canvasColumns.innerHTML = target.value;
}

function changeCanvasSize({ target }) {
  removeAllChildren(canvas);
  canvas.style = `--rows:${target.value}; --columns:${target.value}`;
  appendSquaresToCanvas();
}

function removeAllChildren(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}

function appendSquaresToCanvas() {
  for (let i = 0; i < Math.pow(slider.value, 2); i++) {
    let div = document.createElement("div");
    div.addEventListener("mouseover", (e) => paintDiv(e));
    canvas.appendChild(div);
  }
}

function changeCanvasColor({ target }) {
  canvasColor = target.value;
}

function paintDiv({ target }) {
  if (!isRainbowModeActive) {
    target.style.backgroundColor = canvasColor;
  } else {
    let r = Math.floor(Math.random() * (255 + 0) + 0);
    let g = Math.floor(Math.random() * (255 + 0) + 0);
    let b = Math.floor(Math.random() * (255 + 0) + 0);
    target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

// Settings
document
  .querySelectorAll(".btn-opt")
  .forEach((btn) => btn.addEventListener("click", (e) => applySetting(e)));
function applySetting({ target }) {
  switch (target.id) {
    case "btn-rainbow":
      isRainbowModeActive = true;
      break;
    case "btn-eraser":
      canvasColor = "white";
      break;

    case "btn-clear": {
      Array.from(canvas.children).forEach(
        (c) => (c.style.backgroundColor = "white")
      );
      break;
    }
  }
}
