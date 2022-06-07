import {gl} from "./gl.js";
import {ShaderSpots} from "./shaderSpots.js";
import {Color} from "./color.js";

const colorA = Color.fromHex(getComputedStyle(document.body).getPropertyValue("--color-a").trim());
const colorB = Color.fromHex(getComputedStyle(document.body).getPropertyValue("--color-b").trim());
const renderer = document.getElementById("renderer");
const shaderSpots = new ShaderSpots();
const sliderX = document.getElementById("var-x");
const sliderY = document.getElementById("var-y");
const sliderZ = document.getElementById("var-z");
const sliderXRotation = document.getElementById("var-x-rotation");
const sliderYRotation = document.getElementById("var-y-rotation");
const sliderThreshold = document.getElementById("var-threshold");
const sliderScale = document.getElementById("var-scale");
const fieldX = document.getElementById("field-x");
const fieldY = document.getElementById("field-y");
const fieldZ = document.getElementById("field-z");
const fieldXRotation = document.getElementById("field-x-rotation");
const fieldYRotation = document.getElementById("field-y-rotation");
const fieldThreshold = document.getElementById("field-threshold");
const fieldScale = document.getElementById("field-scale");
const buttonRandomize = document.getElementById("button-randomize");
const buttonMutate = document.getElementById("button-mutate");
let varX = Number.parseFloat(fieldX.value);
let varY = Number.parseFloat(fieldY.value);
let varZ = Number.parseFloat(fieldZ.value);
let varXRotation = Number.parseFloat(fieldXRotation.value);
let varYRotation = Number.parseFloat(fieldYRotation.value);
let varThreshold = Number.parseFloat(fieldThreshold.value);
let varScale = Number.parseFloat(fieldScale.value);

const render = () => {
    shaderSpots.use();
    shaderSpots.setColors(colorA, colorB);
    shaderSpots.setScale(varScale * .004);
    shaderSpots.setSize(renderer.clientWidth, renderer.clientHeight);
    shaderSpots.setThreshold(varThreshold);
    shaderSpots.setPosition(varX, varY, varZ);
    shaderSpots.setRotation(Math.PI * varXRotation / 180, Math.PI * varYRotation / 180);

    gl.viewport(0, 0, renderer.clientWidth, renderer.clientHeight);
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const formatFieldNumber = number => {
    return Number.parseFloat(number.toFixed(4));
};

const randomizeSlider = slider => {
    const low = Number.parseFloat(slider.min);
    const high = Number.parseFloat(slider.max);
    const step = Number.parseFloat(slider.step);
    const value = low + step * Math.round(Math.random() * (high - low) / step);

    slider.value = value;

    return value;
};

const mutateSlider = (slider, radius = 6) => {
    const low = Number.parseFloat(slider.min);
    const high = Number.parseFloat(slider.max);
    const step = Number.parseFloat(slider.step);
    const current = Number.parseFloat(slider.value);
    const value = Math.max(low, Math.min(high, current + Math.round((Math.random() * 2 - 1) * radius) * step));

    slider.value = value;

    return value;
};

buttonRandomize.addEventListener("click", () => {
    fieldX.value = formatFieldNumber(varX = randomizeSlider(sliderX));
    fieldY.value = formatFieldNumber(varY = randomizeSlider(sliderY));
    fieldZ.value = formatFieldNumber(varZ = randomizeSlider(sliderZ));
    fieldXRotation.value = formatFieldNumber(varXRotation = randomizeSlider(sliderXRotation));
    fieldYRotation.value = formatFieldNumber(varYRotation = randomizeSlider(sliderYRotation));
    fieldThreshold.value = formatFieldNumber(varThreshold = randomizeSlider(sliderThreshold));
    fieldScale.value = formatFieldNumber(varScale = randomizeSlider(sliderScale));

    render();
});

buttonMutate.addEventListener("click", () => {
    fieldX.value = formatFieldNumber(varX = mutateSlider(sliderX));
    fieldY.value = formatFieldNumber(varY = mutateSlider(sliderY));
    fieldZ.value = formatFieldNumber(varZ = mutateSlider(sliderZ));
    fieldXRotation.value = formatFieldNumber(varXRotation = mutateSlider(sliderXRotation));
    fieldYRotation.value = formatFieldNumber(varYRotation = mutateSlider(sliderYRotation));
    fieldThreshold.value = formatFieldNumber(varThreshold = mutateSlider(sliderThreshold));
    fieldScale.value = formatFieldNumber(varScale = mutateSlider(sliderScale));

    render();
});

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

render();