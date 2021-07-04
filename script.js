` use strict `

                    /**********************************************     Page d'accuille   ************************************************/
                            /*******************************************  lance le jeu *******************************************/

let play = function () { 
    //console.log('yup');
    document.getElementById('play').addEventListener('click',function () { 
        document.getElementById('board').style.display = 'block';
        alert("Deplacement : ⬅️➡️ --   Tir : SpaceBar");


                                     /**********************  usine a ovni qui se lance lors du click ***********************/
        var usineOvni = setInterval(() => {
                var ovni = document.createElement("div");
                ovni.classList.add("ovnis");
                ovni.style.left = Math.floor(Math.random() * 470) + "px"; 
                board.appendChild(ovni);
        }, 2000);

        
    
    });
     
};
play();
let board = document.getElementById('board');
let ovnis = document.getElementsByClassName("ovnis");
let score = document.getElementById("score") 

    /*********************************************************************************  game   *********************************************************************/ 

                      /*******************************************************    deplacement avion  ****************************************************/


                                                /********  Function qui permet de ciblé un elemnt et lui donne un style  **********/
function donneuse(cible,style) { 
    const element = document.querySelector(cible);
    if (element) {
        return window.getComputedStyle(element)[style];
    }
};
                                                    


                                                                /* Function deplacement pour le sprite */
window.addEventListener('keydown', (e) => {
    
    let leftVoile = parseInt(donneuse('.masque','left'));
    let leftBground = parseInt(donneuse('.sprite','left'));
    let left = parseInt(window.getComputedStyle(container2).getPropertyValue('left'));
    
    switch (e.key) 
       { 
           case "ArrowLeft": 
            if ( left >= 88 ) { 
                //console.log('gauche');
                document.querySelector('.masque','left').style.left = leftVoile - 64 + 'px';
                document.querySelector('.sprite','left').style.bottom = leftBground - 71 + "px";
            }
                              
        break;
    
        case " ":

            let laser = document.createElement('div'); // creer des nouvelles div 
            laser.classList.add('laser');// avec pour class laser1
            board.appendChild(laser);// creer dans le tableau


            let mouvLaser = setInterval(() => {
                
                for (let i = 0; i < ovnis.length; i++) {
                    let ovni = ovnis[i];
                    if (ovni != undefined) {
                        let contoureOvni = ovni.getBoundingClientRect()// information sur la postion et la taille des ovnis
                        let countoureLaser = laser.getBoundingClientRect()// information sur la postion et la taille du laser
                        if (
                            countoureLaser.left >= contoureOvni.left &&
                            countoureLaser.right <= contoureOvni.right &&
                            countoureLaser.top <= contoureOvni.top &&
                            countoureLaser.bottom <= contoureOvni.bottom
                        ) {
                            ovni.parentElement.removeChild(ovni);
                            
                            /*************************************** incrementation du score ******************************************/
                            
                            score.innerHTML = parseInt(document.getElementById("score").innerHTML) + 1;
                        };
                    };
                }



              var laserBottom = parseInt(
                  window.getComputedStyle(laser).getPropertyValue('bottom')
              );
              
              if (laserBottom >= 500) {
                clearInterval(mouvLaser);
                // console.log('disparu');
              }

              laser.style.left = left  + 5 + 'px';//position du tir lors du mouvement 
              laser.style.bottom = laserBottom + 3 + 'px'
            });
          
            //console.log('spaceBar')
        break;
        
        case "ArrowRight":
            if (left < 576) { 

                document.querySelector('.masque','left').style.left = leftVoile + 64 + 'px';
                document.querySelector('.sprite','left').style.bottom = leftBground - 35 + "px";
               // console.log('masque a droite');
            }
            
        break;
    };
});


                    /************************************************************          Ennemies      ************************************************************/

let usineOvni = setInterval(() => {
   
    if (ovnis != undefined) {
      for (let i = 0; i < ovnis.length; i++) {
        let ovni = ovnis[i]; 
        let ovniTop = parseInt( window.getComputedStyle(ovni).getPropertyValue('top'))
       
        let ovniLeft = parseInt( window.getComputedStyle(ovni).getPropertyValue('left'))
        

        if (ovniTop >= 470) {          
            alert("Game Over");
            window.location.reload();
        }// les ovnis ne depassent pas la limite du tableau sinon fin du jeu et arrete la production
        ovni.style.top = ovniTop +  15 + "px";
        ovni.style.left = ovniLeft + 3 + 'px';
        
      }
    }
  }, 300);

 
