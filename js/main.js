const renderer = document.getElementById("renderer");
const gl = renderer.getContext("webgl");
const sliderX = document.getElementById("var-x");
const sliderY = document.getElementById("var-y");
const sliderZ = document.getElementById("var-z");
const sliderXRotation = document.getElementById("var-x-rotation");
const sliderYRotation = document.getElementById("var-y-rotation");
const sliderThreshold = document.getElementById("var-threshold");
const sliderScale = document.getElementById("var-scale");
const sliderSkew = document.getElementById("var-skew");
const fieldX = document.getElementById("field-x");
const fieldY = document.getElementById("field-y");
const fieldZ = document.getElementById("field-z");
const fieldXRotation = document.getElementById("field-x-rotation");
const fieldYRotation = document.getElementById("field-y-rotation");
const fieldThreshold = document.getElementById("field-threshold");
const fieldScale = document.getElementById("field-scale");
const fieldSkew = document.getElementById("field-skew");
let varX = Number.parseFloat(fieldX.value);
let varY = Number.parseFloat(fieldY.value);
let varZ = Number.parseFloat(fieldZ.value);
let varXRotation = Number.parseFloat(fieldXRotation.value);
let varYRotation = Number.parseFloat(fieldYRotation.value);
let varThreshold = Number.parseFloat(fieldThreshold.value);
let varScale = Number.parseFloat(fieldScale.value);
let varSkew = Number.parseFloat(fieldSkew.value);

const render = () => {

};

sliderX.addEventListener("input", () => {
    varX = Number.parseFloat(sliderX.value);
    fieldX.value = varX.toString();

    render();
});

sliderY.addEventListener("input", () => {
    varY = Number.parseFloat(sliderY.value);
    fieldY.value = varY.toString();

    render();
});

sliderZ.addEventListener("input", () => {
    varZ = Number.parseFloat(sliderZ.value);
    fieldZ.value = varZ.toString();

    render();
});

sliderXRotation.addEventListener("input", () => {
    varXRotation = Number.parseFloat(sliderXRotation.value);
    fieldXRotation.value = varXRotation.toString();

    render();
});

sliderYRotation.addEventListener("input", () => {
    varYRotation = Number.parseFloat(sliderYRotation.value);
    fieldYRotation.value = varYRotation.toString();

    render();
});

sliderThreshold.addEventListener("input", () => {
    varThreshold = Number.parseFloat(sliderThreshold.value);
    fieldThreshold.value = varThreshold.toString();

    render();
});

sliderScale.addEventListener("input", () => {
    varScale = Number.parseFloat(sliderScale.value);
    fieldScale.value = varScale.toString();

    render();
});

sliderSkew.addEventListener("input", () => {
    varSkew = Number.parseFloat(sliderSkew.value);
    fieldSkew.value = varSkew.toString();

    render();
});

render();