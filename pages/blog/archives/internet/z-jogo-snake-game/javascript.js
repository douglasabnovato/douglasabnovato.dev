//menu
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
//FIM - menu


//janela do tabuleiro do jogo
window.onload = function(){

    var stage = document.getElementById('stage');//tabuleiro 400x400 pixel(px)
    var ctx = stage.getContext("2d"); //context

    document.addEventListener("keydown", keyPush);//toda vez que pressionar tecla, keypush é executada
    //VELOCIDADE DA COBRINHA
    setInterval(game, 80);//atualização do game/frame 

    const vel = 1;//velocidade da cobra: quantas casas vai andar

    var vx = vy = 0;//velocidades de início
    var px = 10;//ponto x de início: cabeça da cobrinha
    var py = 15;//ponto y de início: cabeça da cobrinha
    var tp = 30;//tamanho da peça
    var qp = 20;//quantidade de peças 20 do tabuleiro
    var ax = ay = 15;//posição inicial da maçã

    var trail = [];//rastro da cobra
    tail = 3;//tamanho do rastro da cobrinha

    //manter os pixels pintados
    function game(){
        px += vx;
        py += vy;
        //final da borda, aparece no lado oposto
        if (px <0) {
            px = qp-1;
        }
        if (px > qp-1) {
            px = 0;
        }
        if (py < 0) {
            py = qp-1;
        }
        if (py > qp-1) {
            py = 0;
        }
        
        //pintar o tabuleiro
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, stage.width, stage.height);
        
        //pintar a maçã
        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);//posições que desejo pintar

        //pintar a cobrinha
        ctx.fillStyle = "white";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[i].x == px && trail[i].y == py)
            {
                vx = vy=0;
                tail = 3;
            }
        }

        trail.push({x:px,y:py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax==px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }

    }

    //movimentos das setas
    function keyPush(event){

        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;         
            default:
               
                break;
        }
    }
}
//FIM - janela do tabuleiro do jogo