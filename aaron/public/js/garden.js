const canvas = document.getElementById("garden")

const options = {
  view: canvas,
  backgroundAlpha: 0,
  width: window.width,
  height: window.height,
}

const app = new PIXI.Application(options)


app.ticker.add(() => {
  // 
})

// choose random starting points
// assign a number 
