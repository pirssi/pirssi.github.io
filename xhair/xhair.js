let style = 4;
let size = 0;
let gap = 0;
let thickness = 0;
let color = 0;
let outline = 0;
let outlinethickness = 0;
let dot = 0;
let sizeMin = 0;
let sizeMax = 0;
let gapMin = 0;
let gapMax = 0;
let thicknessMin = 0;
let thicknessMax = 0;

function generate() {
  document.getElementById("cmdBox").style.visibility = "hidden";
  if (validateForm()) {
    readInputFormAndGenerate();
    document.getElementById("cmd").value =
      "cl_crosshairstyle " +
      style +
      "; cl_crosshairsize " +
      size +
      "; cl_crosshairgap " +
      gap +
      "; cl_crosshairthickness " +
      thickness +
      "; cl_crosshaircolor " +
      color +
      "; cl_crosshair_drawoutline " +
      outline +
      "; cl_crosshair_outlinethickness " +
      outlinethickness +
      "; cl_crosshairdot " +
      dot +
      ";";
    document.getElementById("cmdBox").style.visibility = "visible";
    document.getElementById("cmd").select();
  }
}
function validateForm() {
  let pass = true;
  if (!document.getElementById("sizeMin").value || !document.getElementById("sizeMax").value) {
    document.getElementById("labelSize").style.color = "red";
    document.getElementById("labelSize").innerText = "size!";
    pass = false;
  } else {
    document.getElementById("labelSize").style.color = "var(--color-text)";
    document.getElementById("labelSize").innerText = "size:";
  }
  if (!document.getElementById("gapMin").value || !document.getElementById("gapMax").value) {
    document.getElementById("labelGap").style.color = "red";
    document.getElementById("labelGap").innerText = "gap!";
    pass = false;
  } else {
    document.getElementById("labelGap").style.color = "var(--color-text)";
    document.getElementById("labelGap").innerText = "gap:";
  }
  if (
    !document.getElementById("thicknessMin").value ||
    !document.getElementById("thicknessMax").value
  ) {
    document.getElementById("labelThickness").style.color = "red";
    document.getElementById("labelThickness").innerText = "thickness!";
    pass = false;
  } else {
    document.getElementById("labelThickness").style.color = "var(--color-text)";
    document.getElementById("labelThickness").innerText = "thickness:";
  }
  if (document.querySelectorAll("input[name=color]:checked").length == 0) {
    document.getElementById("labelColor").style.color = "red";
    document.getElementById("labelColor").innerText = "color!";
    pass = false;
  } else {
    document.getElementById("labelColor").style.color = "var(--color-text)";
    document.getElementById("labelColor").innerText = "color:";
  }
  return pass;
}
function readInputFormAndGenerate() {
  //get the input values
  sizeMin = document.getElementById("sizeMin").value;
  sizeMax = document.getElementById("sizeMax").value;
  gapMin = document.getElementById("gapMin").value;
  gapMax = document.getElementById("gapMax").value;
  thicknessMin = document.getElementById("thicknessMin").value;
  thicknessMax = document.getElementById("thicknessMax").value;
  //randomize numeric values (size, gap, thickness)
  size = randomize(parseFloat(sizeMin), parseFloat(sizeMax), 1);
  gap = randomize(parseFloat(gapMin), parseFloat(gapMax), 1);
  thickness = randomize(parseFloat(thicknessMin), parseFloat(thicknessMax), 0.5);
  // color
  let colorsChecked = document.querySelectorAll("input[name=color]:checked");
  let colors = [];
  for (const c of colorsChecked) {
    colors.push(c.value);
  }
  if (colors.length >= 1) {
    color = colors[randomize(0, colors.length - 1, 1)];
  }
  // outline
  let outlinesChecked = document.querySelectorAll("input[name=outline]:checked");
  if (outlinesChecked.length > 0) {
    //if outline(s) selected
    outline = randomize(0, 1, 1); //randomize whether its on
    if (outline == 1) {
      // and only then randomize the outline thickness
      let outlines = [];
      for (const o of outlinesChecked) {
        outlines.push(o.value);
      }
      outlinethickness = outlines[randomize(0, outlines.length - 1, 1)];
    }
  } else outline = 0;
  //randomize "optional" options
  if (document.getElementById("style").checked) {
    style = randomize(4, 5, 1);
  }
  if (document.getElementById("dot").checked) {
    dot = randomize(0, 1, 1);
  }
}
function randomize(min, max, step) {
  return Math.floor((Math.random() * (max - min + step)) / step) * step + min;
}
function copyToClipboard() {
  let cmd = document.getElementById("cmd");
  cmd.select();
  cmd.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(cmd.value);
}
