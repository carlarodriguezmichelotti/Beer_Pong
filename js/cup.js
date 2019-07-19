class Cup {
  constructor(ctx, w, h){
    this.ctx = ctx
    this.width = 130
    this.height = 130

    this.image = new Image()
    this.image.src = "images/cupvector.png"

    this.posX = w/2 + this.width + 150
    this.posY = h/2 + 110

  }

  draw() {
   
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    
  }

}