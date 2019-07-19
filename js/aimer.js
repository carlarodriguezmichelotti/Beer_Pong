class Aimer{
  constructor(ctx,w,h,canvas){
  //Contexto y medidas
  this.ctx=ctx
  this.h = h
  this.canvas = canvas
  this.gravity = 0.4

  //Groundpoint desde el que se hará el disparo
  this.groundPoint = this.h - 100

 //Booleanos para saber el estado de la bola
  this.drawnBack = false
  this.firedBall = false

//Variables listeners para la bola
  //this.mousePos = undefined
  this.mousePos = undefined
  
  this.mouseDown = false
  this.mouseUp = false

//TRAYECTORIA DE BOLA
  this.angle = 0
  this.distance = 0
  this.coordX = 0
  this.coordY = 0
  this.distanceFromCenter = 0
  this.aimerCoords = {
    x: 0,
    y: 0
  }

  //Circulos de disparo
  this.shootingCirc = {
    x: 100,
    y: this.groundPoint,
    r: 75
  }
  
  this.drawBackCirc = {
    x: this.shootingCirc.x,
    y: this.shootingCirc.y,
    r: 10
  }
  
  this.setListeners()
}

 //CALCULATE TRAJECTORY

  //Distancia entre 2 puntos
  calculateDistanceBetween(p1,p2){
    return Math.sqrt(Math.pow((p2.x - p1.x),2) + Math.pow((p2.y - p1.y),2))
  }

  //¿Está en el circulo?
  isInCircle(){
    this.distanceFromCenter = this.calculateDistanceBetween(this.drawBackCirc,this.mousePos)
    if (this.distanceFromCenter < this.drawBackCirc.r*2) {return true}
    else {return false}
  }

   //FUNCIONES NECESARIAS PARA LOS LISTENERS
  getMousePos(e){
  let rect = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top
    }
  }

   //EVENT LISTENERS

   setListeners(){
    document.addEventListener('mousemove',e =>{
      this.mousePos = this.getMousePos(e)
    },false)

    document.addEventListener('mousedown',e=>{
    this.mousePos = this.getMousePos(e)

    this.mouseDown = true
    this.mouseUp = false
    },false)

    document.addEventListener('mouseup',e=>{
      this.mousePos = this.getMousePos(e)
      this.mouseDown = false
      this.mouseUp = true
      
    },false)
  }


   //Ángulo entre 2 puntos
   calculateAngleBetween(p1,p2){
    return Math.atan2(p2.y-p1.y,p2.x-p1.x)
  }

   //Coordenadas del objetivo
  getAimCoords(){
    this.angle = Math.PI/2 - this.calculateAngleBetween(this.mousePos,this.shootingCirc)

    this.distance = Math.min(this.calculateDistanceBetween(this.shootingCirc,this.mousePos), this.shootingCirc.r)

    this.coordX = this.shootingCirc.x + this.distance * Math.sin(this.angle)
    this.coordY = this.shootingCirc.y + this.distance * Math.cos(this.angle)
    return {x: this.coordX, y: this.coordY}
}

draw(){
  this.drawAimer()
  this.drawCircles()
}

//AIMER
drawAimer(){
  if(!this.drawnBack){
  //  if(this.drawnBack){
    this.mousePos ? this.aimerCoords = this.getAimCoords(this.mousePos) : null
    this.aimerCoords = this.getAimCoords(this.mousePos)
    this.ctx.beginPath()
    this.ctx.moveTo(this.aimerCoords.x,this.aimerCoords.y)

    this.ctx.lineTo(this.shootingCirc.x, this.shootingCirc.y)
    this.ctx.strokeStyle = 'black'
    this.ctx.stroke()
    this.ctx.closePath()
  }
}

 //CIRCLES
  
 drawCircles(){
  this.ctx.beginPath(this.shootingCirc.x,this.shootingCirc.y,this.shootingCirc.r)
  this.ctx.arc(this.shootingCirc.x, this.shootingCirc.y, this.shootingCirc.r,0,2*Math.PI)
  this.ctx.strokeStyle = 'black'
  this.ctx.stroke()
  this.ctx.closePath()
  this.ctx.beginPath()
  this.ctx.arc(this.drawBackCirc.x,this.drawBackCirc.y,this.drawBackCirc.r,0,2*Math.PI)
  this.ctx.stroke()
  this.ctx.closePath()
  this.drawAimer()
}

  //¿Bola disparada?
isFiredBall(){
  if(this.mousePos && this.drawnBack && this.mouseUp){
    this.drawnBack = false
    this.firedBall = true
  }
}

// Está hacia atrás la bola
isDrawnBack(){
  if(this.mousePos && this.isInCircle()){
    if(this.mouseDown) this.drawnBack = true
    else if (this.mouseUp) this.drawnBack = false
  }
}
}