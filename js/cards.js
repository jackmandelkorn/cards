var smartopponent = 0;
var play = 0;
var pscore = 0;
var oscore = 0;

var cdeck = [2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15];
var playerdeck = [];
var oppdeck = [];
  var delt = 0;

function shuffle(deck) {
  var length = deck.length;
  var temp = [];
  for (i = 0; i < length; i++) {
    var num = parseInt(Math.random() * deck.length);
    temp[temp.length] = deck[num];
    deck.splice(num, 1);
  }
  cdeck = temp;
    //Restart
    if (delt === 1) {
      if (play === 0) {
        playerdeck = [];
        oppdeck = [];
        document.getElementsByClassName("card").remove();
        document.getElementById("o-card").innerHTML = "N/A";
        delt = 0;
        pscore = 0;
        oscore = 0;
        play = 0;
        scoreup();
        deal(cdeck);
      }
    }
}

function restart() {
  cdeck = [2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15];
  playerdeck = [];
  oppdeck = [];
  document.getElementsByClassName("card").remove();
  document.getElementById("o-card").innerHTML = "N/A";
  delt = 0;
  pscore = 0;
  oscore = 0;
  play = 0;
  scoreup();
}

function deal(deck) {
  if (delt === 0) {
    var counter = 0;
    for (i = 0; i < cdeck.length; i++) {
      if (counter === 0) {
        playerdeck[playerdeck.length] = cdeck[i];
        counter = 1;
      }
      else {
        oppdeck[oppdeck.length] = cdeck[i];
        counter = 0;
      }
    }
    delt = 1;
    createcards(playerdeck);
  }
}

function createcards(deck) {
  for (i = (deck.length - 1); i > -1; i--) {
    var element = document.createElement("BUTTON");
    element.className = "card";
    element.onclick = function() { cardclick(this); };
    element.innerHTML = deck[i];
    document.body.appendChild(element);
  }
}

function cardclick(element) {
  play = 1;
  document.getElementsByClassName("last").remove();
  element.onclick = "";
  element.className = "card last";
  var playerscore = element.innerHTML;
  element.style.position = "absolute";
  element.style.bottom = "1.4vh";
  element.style.right = "12.8vh";
      playerdeck.splice(playerdeck.indexOf(playerscore), 1);
    oppdecide(playerscore);
}

function showopp() {
  for (i = (oppdeck.length - 1); i > -1; i--) {
    var element = document.createElement("BUTTON");
    element.className = "card-temp";
    element.onclick = function() { cardclick(this); };
    element.innerHTML = oppdeck[i];
    document.body.appendChild(element);
  }
  $(".card-temp").fadeOut(0);
  $(".card-temp").fadeIn(500);
}

function hideopp() {
  $(".card-temp").fadeIn(0);
  $(".card-temp").fadeOut(500);
  document.getElementsByClassName("card-temp").remove();
}

function sortcards() {
  if (play === 0) {
    oppdeck.sort(function(a, b){return a-b});
    playerdeck.sort(function(a, b){return a-b});
    document.getElementsByClassName("card").remove();
    createcards(playerdeck);
  }
}

function oppdecide(playerscore) {
  if (smartopponent === 1) {
    oppdeck.sort(function(a, b){return a-b});
    var temp = 0;
    for (i = (+playerscore + 1); i < 16; i++) {
      if(oppdeck.indexOf(i) !== -1) {
        if (temp === 0) {
          temp = 1;
          var myscore = oppdeck[oppdeck.indexOf(i)];
          oppdeck.splice(oppdeck.indexOf(i), 1);
            var element = document.getElementById("o-card");
            element.innerHTML = myscore;
          score(playerscore, myscore);
        }
      }
    }
    if (temp === 0) {
      var myscore = oppdeck[0];
      oppdeck.splice(0, 1);
        var element = document.getElementById("o-card");
        element.innerHTML = myscore;
      score(playerscore, myscore);
    }
  }

  else {
    var temp = (parseInt(Math.random() * oppdeck.length));
      var myscore = oppdeck[temp];
      oppdeck.splice(temp, 1);
        var element = document.getElementById("o-card");
        element.innerHTML = myscore;
      score(playerscore, myscore);
  }
}

function score(player,opponent) {
  if (player < opponent) {
    oscore = (+oscore + 1);
  }
  else {
    pscore = (+pscore + 1);
  }
  scoreup();
}

function scoreup() {
  var element = document.getElementById("scoreboard");
  element.innerHTML = ("YOU: " + pscore + "  CPU: " + oscore);
}

function togglesmart() {
  if (smartopponent === 0) {
    var element = document.getElementById("b-smart");
    element.className = "button-on";
    element.innerHTML = "SMART-CPU: ON";
    smartopponent = 1;
  }
  else {
    var element = document.getElementById("b-smart");
    element.className = "button-off";
    element.innerHTML = "SMART-CPU: OFF";
    smartopponent = 0;
  }
}

//Remove Elements
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
