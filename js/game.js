counter = 0;
roadposition = -25400;
player = document.getElementById('owncar');
player.style.left = 150 + "px";
playerpos = 1;
iscrashed = false;
score = 0;
roadspeed = 1;
startgamevar = false;
opponentlist = document.getElementsByClassName("opponent");
bulletlist = document.getElementsByClassName("bullet");
owncar = document.getElementById("owncar");
maincontainer = document.getElementById("maincontainer");
document.getElementById("maincontainer").style.display = "none";

startgame = function () {
    counter = 0;
    roadposition = -15400;
    player = document.getElementById('owncar');
    player.style.left = 150 + "px";
    playerpos = 1;
    iscrashed = false;
    score = 0;
    roadspeed = 1;
	opponentlist1 = document.getElementsByClassName("opponent");
	
    for (var k = 0; k < opponentlist1.length; k++)
	 {
        maincontainer.removeChild(opponentlist1[k]);
    }

    document.getElementById("menuscreen").style.display = "none";
    document.getElementById("maincontainer").style.display = "block";
    startgamevar = true;
	
    if (!iscrashed)
        e = setInterval(game, roadspeed);

    function game()
	 {
        score++;
        var scorevar = document.getElementById('score');
        scorevar.innerHTML = "Your Score: "+score;

        var g = new Gameloop();
        roadposition += 1;
        if (roadposition < 1 && iscrashed == false) {
            g.moveroad(roadposition);
            g.moveopponent();
            g.detectCollision();

            var b = new Bullet();
            b.firebullet();

            if (counter >= 100) {
                counter = 0;
                g.makeopponent();
            }
        } else {
		 location.reload();
            clearInterval(e);
        }
        counter++;
    }
};

document.onkeydown = function (e) {


    switch (e.keyCode) {
        case 37:
            {
                playerpos--;
                break;
            }

        case 39:
            {
                playerpos++;
                break;
            }
        case 38:
            {
                if (!iscrashed) {
                    var bullet = new Bullet();
                    bullet.createBullet();
                }
                break;
            }
    }


    if (playerpos <= 0) {
        playerpos = 0;
        player.style.left = 40 + "px";
    }
    else if (playerpos == 1) {

        player.style.left = 150 + "px";
    }
    else if (playerpos >= 2) {
        playerpos = 2;
        player.style.left = 245 + "px";
    }


};






function Gameloop() {
    this.x = 0;
    this.y = 0;

    var that = this; 

    this.moveroad = function (roadposition) {
        var mainroad = document.getElementById("mainroad");
        mainroad.style.top = roadposition + "px";
    };

    this.makeopponent = function () {

        that.element = document.createElement('div');
        that.element.className = 'opponent';
        document.getElementById('maincontainer').appendChild(that.element);

        that.x = getRandomArbitrary(0, 3);
        if (that.x < 1)
            that.x = 40;
        else if (that.x >= 1 && that.x < 2) {
            that.x = 150;
        } else if (that.x >= 2 && that.x < 3) {
            that.x = 245;
        }
        that.y = 0;


        that.element.style.top = that.y + "px";
        that.element.style.left = that.x + "px";

    };

    this.moveopponent = function () {


        var opponentlist = document.getElementsByClassName('opponent');

        for (var i = 0; i < opponentlist.length; i++) {
            if (parseInt(opponentlist[i].style.top) > 700 || iscrashed) {
                document.getElementById('maincontainer').removeChild(opponentlist[i]);
            } else {
                opponentlist[i].style.top = parseInt(opponentlist[i].style.top) + 1 + "px";
            }


        }
       
    };
    this.detectCollision = function () {
        var opponentlist = document.getElementsByClassName('opponent');
        var player = document.getElementsByClassName('owncar');
        for (var i = 0; i < opponentlist.length; i++) {
            if (opponentlist[i].style.top.replace('px', '') >= 544 && opponentlist[i].style.top.replace('px', '') <= 615 && opponentlist[i].style.left.replace('px', '') == player[0].style.left.replace('px', '')) {
                iscrashed = true;
                playAudio("sounds/explosion.ogg", 5);
                document.getElementById("menuscreen").style.display = "block";
                //alert("Crashed GAME OVER");
            }
        }


    };
    this.attack = function () {

    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;

    }

}

function Bullet() {
    this.x = 0;
    this.y = 0;
    this.interverId;
    this.element;
    var that = this; /////////bubbles bhanne function ma access garna ko laagi

    this.createBullet = function () {

        that.element = document.createElement('div');
        that.element.className = 'bullet';
        document.getElementById('maincontainer').appendChild(that.element);
        // console.log(getRandomArbitrary(1, 1000));


        if (playerpos == 0)
            that.x = 55;
        else if (playerpos == 1) {
            that.x = 165;
        } else if (playerpos == 2) {
            that.x = 260;
        }

        that.y = 475;
        that.element.style.top = that.y + "px";
        that.element.style.left = that.x + "px";

        that.intervalId = setInterval(that.pushUP, 1);
    }

    this.firebullet = function () {


        var bulletlist = document.getElementsByClassName('bullet');

        for (var i = 0; i < bulletlist.length; i++) {
            if (parseInt(bulletlist[i].style.top) < -10 || iscrashed) {
                document.getElementById('maincontainer').removeChild(bulletlist[i]);
            } else {
                bulletlist[i].style.top = parseInt(bulletlist[i].style.top) - 1 + "px";
            }
            getcollision();

        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;

    }


    function getcollision() {

        // alert('collision bhayo');
        var opponentlist = document.getElementsByClassName("opponent");
        var bullet = document.getElementsByClassName("bullet");
        for (var i = 0; i < opponentlist.length; i++) {
            for (var j = 0; j < bullet.length; j++) {
                console.log(i + " " + j);
                if (parseInt(opponentlist[i].style.top) + 54 == parseInt(bullet[j].style.top) && parseInt(opponentlist[i].style.left) + 15 == parseInt(bullet[j].style.left)) {
                    //  alert(i);
                    document.getElementById('maincontainer').removeChild(opponentlist[i]);
                    document.getElementById('maincontainer').removeChild(bullet[j]);
                    score += 100;
                    playAudio("sounds/explosion.ogg", 5);

                }
            }
        }

    }

}