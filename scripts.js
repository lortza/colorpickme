
const mouseCoords = document.querySelector('#mouse-coords')
const rgbOutput = document.querySelector('#rgb-output')
const mouseZone = document.querySelector('article')
const rgbField = document.querySelector('#rgb-field')

const reportColors = function(event){
  let rgb = `rgb(${event.offsetX}, ${event.offsetY}, ${Math.round( (event.offsetX / 2) + (event.offsetY /2) ) })`
  mouseCoords.textContent = `MouseX: ${event.offsetX} MouseY: ${event.offsetY}`
  rgbOutput.textContent = rgb
  rgbField.setAttribute('value', rgb)
  document.body.style.backgroundColor = rgb
}

const setToDefault = function(){
  mouseCoords.textContent = "Mouse Coords:"
  rgbOutput.textContent = "RGB Output:"
}

const copyToClipboard = function(event){
  rgbField.select();
  document.execCommand("Copy");
  alert(rgbField.value + " is copied to your clipboard");
}

mouseZone.addEventListener('mousemove', reportColors)
mouseZone.addEventListener('mouseleave', setToDefault)
mouseZone.addEventListener('click', copyToClipboard)
