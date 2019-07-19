class Background {
  constructor(ctx, w, h){
    this.ctx = ctx
    this.width = w
    this.height = h

    this.image = new Image()
    this.image.src = "images/opcion1.jpg"

    this.logo = new Image()
    this.logo.src = "images/logo_beer.png"

    this.scoreboard = new Image()
    this.scoreboard.src = "images/score.png"

    this.posX = 0
    this.posY = 0

  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    this.ctx.drawImage(this.logo, 10, 10, 350, 300)
    //this.ctx.drawImage(this.scoreboard,800,20,300,200)

    
  }

}