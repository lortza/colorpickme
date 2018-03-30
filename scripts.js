class ColorPicker {
  constructor(){
    this.red = 230
    this.green = 44
    this.blue = 61
    this.opacity = 1
  }

  updateColors(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  updateOpacity(opacity) {
    this.opacity = opacity
  }

  rgb() {
    return `rgba(${this.red},${this.green},${this.blue},${this.opacity})`
  }

  hex() {
    return `#${this.componentToHex(this.red)}${this.componentToHex(this.green)}${this.componentToHex(this.blue)}`
  }

  componentToHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
    + "0123456789ABCDEF".charAt(n%16);
  }

}//end ColorPicker

let colorPicker = new ColorPicker()

const opacityDropdown = document.querySelector('#opacity-dropdown')
const mouseZone = document.querySelector('#mouse-zone')
const rgbOutput = document.querySelector('#rgb-output')
const hexOutput = document.querySelector('#hex-output')
const rgbButton = document.querySelector('#rgb-button')
const hexButton = document.querySelector('#hex-button')


function renderColorsToDom(){
  rgbOutput.setAttribute('value', colorPicker.rgb())
  rgbOutput.style.color = colorPicker.rgb()

  hexOutput.setAttribute('value', colorPicker.hex())
  hexOutput.style.color = colorPicker.hex()

  mouseZone.style.backgroundColor = colorPicker.rgb()
}

function assignColors(event){
  colorPicker.updateColors(event.offsetX, event.offsetY, Math.round( (event.offsetX / 5) + (event.offsetY / 3) ))
  renderColorsToDom()
}

function copyToClipboard(source) {
  // use anon function to access the callback's param
  return function() {
    source.select();
    document.execCommand("Copy");
  }
}


//-----------------------------------------

// Populate the dropdown items
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

let htmlOptions = opacities.map(opacity => `<option value="${opacity.display}">${opacity.display}</option>`).join('')
opacityDropdown.insertAdjacentHTML('beforeend', htmlOptions)


//-----------------------------------------


// Update the opacity of the current color
opacityDropdown.addEventListener('change', function(){
  let optText = this.options[this.selectedIndex].value
  let opacityObj = opacities.find(function(op){ return op.display === optText })
  colorPicker.updateOpacity(opacityObj.val)
  renderColorsToDom()
})

// Handle the mouse movement and click behaviors
renderColorsToDom()
mouseZone.addEventListener('mousemove', assignColors)
mouseZone.addEventListener('click', copyToClipboard(rgbOutput))
rgbButton.addEventListener('click', copyToClipboard(rgbOutput))
hexButton.addEventListener('click', copyToClipboard(hexOutput))
