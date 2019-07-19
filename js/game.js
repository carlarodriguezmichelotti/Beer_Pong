const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  score: undefined,
  rebotes: 0,
  balls: [],
  
  init: function() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.width = window.innerWidth * .98
    this.height = window.innerHeight * 0.98
    this.canvas.width = this.width 
    this.canvas.height = this.height 
    this.numtiros = 3
    this.scoreboard = ScoreBoard
    this.scoreboard.init(this.ctx)
    this.startsound = document.getElementById("gamesong")
    this.startsound.volume = 0.5
    this.start()
    this.ballsound = document.getElementById("ballsound")
    this.success = document.getElementById("success")
    this.success.volume = 5
  },

  start: function() {
   
    // Reiniciamos configuración del juego                 
    this.reset()    
          

   this.interval = setInterval(()=>{     //Intervalo de juego.             
          this.drawAll()
          !this.ball.disparada ? this.ball.move() : null
          this.isCollision()
    }, 1000/this.fps)
  },
  

  drawAll: function(){

    this.background.draw()
    this.cup.draw()
    this.table.draw()
    if(this.balls.length != 0){
      this.ball.draw()
    }
    this.aimer.draw()  
    this.drawScore()
  },

  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  isCollision: function() {          
    this.soundFlag = true
     if(this.ball.posX + this.ball.width > this.cup.posX
      &&this.ball.posX <= this.cup.posX + this.cup.width
      &&this.ball.posY + this.ball.height > this.cup.posY
      &&this.ball.posY < this.cup.posY + this.cup.height
      &&this.ball.velY > 0)
    {     
          this.ball.disparada=false
          this.clearBall()
          this.drawAll()
          if(this.soundFlag){
            this.ballsound.pause()
            this.ballsound.currentTime=0
            this.ballsound.play()
          }
          if(this.numtiros == 0){
          this.setTimeOut(this.gameOver(),20000)
          }
          else{
            this.numtiros--
            this.reset()
          }
      }

    },
    drawScore: function() {             
      this.scoreboard.update(this.score)
    },

    clearBall: function(){
      this.balls.forEach( (obs, idx) => {
        this.balls.splice(0,1)    
    })
    
  },

  gameOver: function() {   
   
    this.soundFlag1 = true
    this.startsound.pause()
    this.startsound.currentTime = 0
    this.numtiros = 3
    clearInterval(this.interval)
    if(this.soundFlag1){
      this.success.pause()
      this.success.currentTime=0
      this.success.play()
    }

    document.getElementById("canvas").style.display = "none"
    document.getElementById("game-restart").style.display ="block"
    document.getElementById("congrats").style.display="none"
    this.score()
    this.rebotes =0

  },

  score: function(){
    this.higherscore = Math.floor(Math.random() * 1000) + 800
    if(this.higherscore < this.rebotes){
      this.higherscore = this.rebotes
      document.getElementById("highest").innerHTML = this.higherscore
      document.getElementById("congrats").style.display = "block"
    }
    document.getElementById("highest").innerHTML = this.higherscore 
    document.getElementById("yours").innerHTML = this.rebotes
  },


  reset: function() {         

    this.background = new Background(this.ctx, this.width, this.height)
    this.cup = new Cup(this.ctx,this.width,this.height)
    this.table = new Table(this.ctx,this.width,this.height)
    this.aimer = new Aimer(this.ctx, this.width,this.height,this.canvas)
    this.balls =[]
    this.ball = new Ball(this.ctx,this.width,this.height,this.canvas,this.aimer,this.table)
    this.balls.push(this.ball)
    this.startsound.play()
   
  }
}


  




