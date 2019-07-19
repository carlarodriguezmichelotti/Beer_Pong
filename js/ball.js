class Ball {
  constructor(ctx, w, h,canvas,aimer,table){
  //MIAS

   //Contexto y medidas
   this.h = h
   this.w = w
   this.ctx = ctx
   this.canvas = canvas
   this.width = 40
   this.height = 40

  //Creación de imagen 
  this.image = new Image()
  this.image.src = "images/ball.png"


  //EJEMPLO
  //Objeto aimer
  this.aimer = aimer
  this.table = table
  //Establecimiento posición inicial  
  this.posX = this.aimer.shootingCirc.x - this.width/2
  this.posY = this.aimer.shootingCirc.y - this.height/2

  //Velocidades
  this.velX = 0
  this.velY = 0
  this.speed = 0
  this.firing = false
  this.disparada = false
  this.speedMod = 4

  
    this.gravity = 0
    this.mousePos = undefined
    this.mouseDown = false
 
this.setListeners()
}


  draw() {
  
    
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  fireBall(){ 
    console.log('entro fireball')
    this.mousePos = this.canvas.getBoundingClientRect()
    if (this.mousePos && !this.firing){
      this.speed = Math.min(this.aimer.shootingCirc.r,this.aimer.calculateDistanceBetween(this.aimer.shootingCirc, this.mousePos)) / this.speedMod
      this.velX = Math.cos(this.aimer.calculateAngleBetween(this.mousePos,this.aimer.shootingCirc))*this.speed
      this.velY = Math.sin(this.aimer.calculateAngleBetween(this.mousePos, this.aimer.shootingCirc))*this.speed
      this.firing = true;
      this.calculateTrajectory()
   }
  }
  
  calculateTrajectory(){
       if (this.posY <= this.aimer.groundPoint && this.firing) {
        this.velY += this.aimer.gravity
        this.posX += this.velX
        this.posY += this.velY
        } else {
        this.velX = 0
        this.velY = 0
        this.firing = false
    }

  }

move(){
  this.gravity = 0
  this.posX += this.velX
  this.velY += this.gravity
  this.posY += this.velY

  if(this.posY >(this.h - this.height)){
    this.velY *= -1
    Game.rebotes+=20
  }

  if(this.posY < 0){
    this.velY *= -1
    Game.rebotes+=20
  }

  if(this.posX > this.w){
    this.velX *= -1
    Game.rebotes+=10
  }

  if(this.posX < 0){
    this.velX *= -1
    Game.rebotes+=10
  }

  if(this.posX >=0 && this.posY >= this.table.posY){
    this.velY *= -1
    Game.rebotes+=30
  }

  }




   //Funciones de listeners
  setListeners(){
    document.addEventListener('mousedown',e =>{

      if(this.disparada == false){
      this.gravity = .20
      this.velX = (this.posX - this.aimer.getMousePos(e).x)*0.5
     
      this.velY = (this.posY - this.aimer.getMousePos(e).y)*0.5
      this.mouseDown = true
      console.log(this.velX, this.velY)
     // this.move()
      //if(this.posX == this.mousePos.x && this.posY == this.mousePos.y){

      //}
      console.log('mousedown')}
    })

    document.addEventListener('mouseup',e=>{
      
      this.disparada = false
      
     
    })
  }

}



