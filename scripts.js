const opacities = [
  {display: '100%', val: 1},
  {display: '90%', val: 0.9},
  {display: '80%', val: 0.8},
  {display: '70%', val: 0.7},
  {display: '60%', val: 0.6},
  {display: '50%', val: 0.5},
  {display: '40%', val: 0.4},
  {display: '30%', val: 0.3},
  {display: '20%', val: 0.2},
  {display: '10%', val: 0.1}
]

const optionsPicker = document.querySelector('#options-picker')
const mouseZone = document.querySelector('#mouse-zone')
const rgbOutput = document.querySelector('#rgb-output')
const hexOutput = document.querySelector('#hex-output')
const rgbButton = document.querySelector('#rgb-button')
const hexButton = document.querySelector('#hex-button')

let red = 250
let green = 121
let blue = 90
let opacity = 1
let rgb = `rgba(${red},${green},${blue},${opacity})`
let hex = rgbToHex(red, green, blue)

// Convert to hex
function componentToHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16)
  + "0123456789ABCDEF".charAt(n%16);
}

function rgbToHex(R,G,B) {
  return `#${componentToHex(R)}${componentToHex(G)}${componentToHex(B)}`
}

function assignColors(event){
  red = event.offsetX
  green = event.offsetY
  blue = Math.round( (event.offsetX / 5) + (event.offsetY / 3) )
  reportColors()
}

function reportColors(){
  rgb = `rgba(${red},${green},${blue},${opacity})`
  hex = rgbToHex(red, green, blue)
  rgbOutput.setAttribute('value', rgb)
  rgbOutput.style.color = rgb
  hexOutput.setAttribute('value', hex)
  hexOutput.style.color = hex
  console.log(hex);
  mouseZone.style.backgroundColor = rgb
}

function copyRgbToClipboard(event){
  rgbOutput.select();
  document.execCommand("Copy");
}

function copyHexToClipboard(event){
  hexOutput.select();
  document.execCommand("Copy");
}

// Handle the mouse movement and click behaviors
reportColors()
mouseZone.addEventListener('mousemove', assignColors)
mouseZone.addEventListener('click', copyRgbToClipboard)
rgbButton.addEventListener('click', copyRgbToClipboard)
hexButton.addEventListener('click', copyHexToClipboard)


// Handle the dropdown actions
let htmlOptions = opacities.map(opacity => `<option value="${opacity.display}">${opacity.display}</option>`).join('')
optionsPicker.insertAdjacentHTML('beforeend', htmlOptions)

// Update the opacity of the current color
optionsPicker.addEventListener('change', function(){
  let optText = this.options[this.selectedIndex].value
  let opacityObj = opacities.find(function(op){ return op.display === optText })
  opacity = opacityObj.val
  reportColors()
})

