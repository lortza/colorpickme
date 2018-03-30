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



class UI {
  constructor(colorPicker){
    this.opacityDropdown = document.querySelector('#opacity-dropdown')
    this.colorBox = document.querySelector('#color-box')
    this.rgbText = document.querySelector('#rgb-text')
    this.hexText = document.querySelector('#hex-text')
    this.rgbButton = document.querySelector('#rgb-button')
    this.hexButton = document.querySelector('#hex-button')
  }

  render(){
    this.rgbText.setAttribute('value', colorPicker.rgb())
    this.rgbText.style.color = colorPicker.rgb()

    this.hexText.setAttribute('value', colorPicker.hex())
    this.hexText.style.color = colorPicker.hex()

    this.colorBox.style.backgroundColor = colorPicker.rgb()
  }

  copyToClipboard(source) {
    // use anon function to access the callback's param
    return function() {
      source.select();
      document.execCommand("Copy");
    }
  }
}//end UI

let colorPicker = new ColorPicker()
let ui = new UI

function assignColors(event){
  let r = event.offsetX
  let g = event.offsetY
  let b = Math.round( (event.offsetX / 5) + (event.offsetY / 3) )
  colorPicker.updateColors(r, g, b)
  ui.render()
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
ui.opacityDropdown.insertAdjacentHTML('beforeend', htmlOptions)


//-----------------------------------------


// Update the opacity of the current color
ui.opacityDropdown.addEventListener('change', function(){
  let optText = this.options[this.selectedIndex].value
  let opacityObj = opacities.find(function(op){ return op.display === optText })
  colorPicker.updateOpacity(opacityObj.val)
  ui.render()
})

// Handle the mouse movement and click behaviors
ui.render()
ui.colorBox.addEventListener('mousemove', assignColors)
ui.colorBox.addEventListener('click', ui.copyToClipboard(ui.rgbText))
ui.rgbButton.addEventListener('click', ui.copyToClipboard(ui.rgbText))
ui.hexButton.addEventListener('click', ui.copyToClipboard(ui.hexText))
