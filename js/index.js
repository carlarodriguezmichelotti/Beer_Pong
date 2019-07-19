window.onload = () => {
  
  document.getElementById("start-button").onclick = function(){
    document.getElementById("game-intro").style.display ="none"
    document.getElementById("canvas").style.display = "block"
    Game.init();
  }

  document.getElementById("restart-button").onclick = function(){
    document.getElementById("game-restart").style.display ="none"
    document.getElementById("canvas").style.display = "block"
    Game.init();
  }

  //Game.init()
}