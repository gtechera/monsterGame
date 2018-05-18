new Vue({
  el: "#app",
  data: {
    yourPoints: 100,
    monsterPoints: 100,
    gameStarted: false,
    yourAttackPoints: 0,
    monsterAttackPoints: 0,
    juego: false,
    historial: []
  },
  methods: {
    estadoInicial: function() {
      this.yourPoints = 100;
      this.monsterPoints = 100;
      this.gameStarted = false;
      this.yourAttackPoints = 0;
      this.monsterAttackPoints = 0;
      this.juego = false;
      this.historial = [];
    },
    calculodanio: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    quienGana: function() {
      if (this.yourPoints <= 0 || this.monsterPoints <= 0) {
        if (this.yourPoints > this.monsterPoints) {
          if (confirm("You WIN!! Congratulations. Play again?")) {
            this.estadoInicial();
          } else {
            this.juego = false;
          }
          return;
        } else {
          if (confirm("Monster WINS !! Sorry for your loss. Play again?")) {
            this.estadoInicial();
          } else {
            this.juego = false;
          }
        }
      }
    },
    attack: function() {
      this.yourAttackPoints = this.calculodanio(1, 10);
      this.monsterAttackPoints = this.calculodanio(1, 10);
      this.yourPoints -= this.monsterAttackPoints;
      this.monsterPoints -= this.yourAttackPoints;
      this.historial.unshift({
        yourMsg: "Player hits monster with " + this.yourAttackPoints,
        monsterMsg: "Monster hits player with " + this.monsterAttackPoints
      });
      this.juego = true;
      this.quienGana();
    },
    specialAttack: function() {
      this.yourAttackPoints = this.calculodanio(10, 20);
      this.monsterAttackPoints = this.calculodanio(1, 10);
      this.yourPoints -= this.monsterAttackPoints;
      this.monsterPoints -= this.yourAttackPoints;
      this.historial.unshift({
        yourMsg: "Player hits monster hard with " + this.yourAttackPoints,
        monsterMsg: "Monster hits player with " + this.monsterAttackPoints
      });
      this.juego = true;
      this.quienGana();
    },
    heal: function() {
      this.yourAttackPoints = this.calculodanio(1, 10);
      this.monsterAttackPoints = this.calculodanio(1, 10);
      if (this.yourPoints + this.yourAttackPoints > 100) {
        this.yourPoints = 100;
      } else {
        this.yourPoints += this.yourAttackPoints;
      }
      this.yourPoints -= this.monsterAttackPoints;
      this.historial.unshift({
        yourMsg: "Player heals himself with " + this.yourAttackPoints,
        monsterMsg: "Monster hits player with " + this.monsterAttackPoints
      });
      this.juego = true;
    },
    giveUp: function() {
      this.estadoInicial();
    }
  }
});
