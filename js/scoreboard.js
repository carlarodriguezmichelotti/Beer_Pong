const ScoreBoard = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px sans-serif"
  },
  
  update: function (score) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 100px Graduate"
    this.ctx.fillText(Game.rebotes, 880, 100);
  }
};