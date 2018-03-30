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
const copyButton = document.querySelector('#button')
let red = 250
let green = 121
let blue = 90
let opacity = 1

const reportColors = function(){
  let rgb = `rgba(${red},${green},${blue},${opacity})`
  rgbOutput.setAttribute('value', rgb)
  rgbOutput.style.color = rgb
  mouseZone.style.backgroundColor = rgb
}

const assignColors = function(event){
  red = event.offsetX
  green = event.offsetY
  blue = Math.round( (event.offsetX / 5) + (event.offsetY / 3) )
  reportColors()
}

const copyToClipboard = function(event){
  rgbOutput.select();
  document.execCommand("Copy");
  // alert(rgbOutput.value + " is copied to your clipboard");
}

// Handle the mouse movement and click behaviors
reportColors()
mouseZone.addEventListener('mousemove', assignColors)
mouseZone.addEventListener('click', copyToClipboard)
copyButton.addEventListener('click', copyToClipboard)

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
