class Table {
  constructor(ctx, w, h){
    this.ctx = ctx
    this.width = w
    this.height = 100

    this.image = new Image()
    this.image.src = "images/mesa.png"

    this.posX = 0
    this.posY = h - this.height

  }

  draw() {
   
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    
  }

}