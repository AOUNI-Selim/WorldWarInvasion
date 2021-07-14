` use strict `

                    /**********************************************     Page d'accuille   ************************************************/


window.onload = function () { 
    var saisie = null;
    if (saisie == null || saisie == ' ') {    
        saisie = Number(prompt('Bienvenu dans mon CV Game, je vous propose de découvrir deux jeux :\n 1- Une mise en bouche enigmatique pour découvrir 3 parties de mon  CV. \n 2- Un plat de resistance : jeu de tir du style Space Invaders.\n \t\t\t\t  👽Ammusez-vous Bien👽\n Veuillez faire un choix entre 1 et 2 :'));
     }if (saisie == 1) {
        alert('Vous venez de faire le bon choix. Alors commençons l\'enigme !!\n\nIndice 1 : Je suis dans une fenêtre au Sud-Ouest. \n\nIndice 2 : Je regarde l\'invasion depuis le dome à l\'Est.\n\nIndice 3 : Je suis tout la Haut, je traverse la ville depuis mon UFO.');

     } else if (saisie == 2) {
        alert('C\'est dommage pour le 1er defit. Appuyez sur Play pour commencer le jeux.');
    }           
};




                    
                            /*******************************************  lance le jeu *******************************************/

let play = function () { 
    //console.log('yup');
    document.getElementById('play').addEventListener('click',function () { 
        document.getElementById('board').style.display = 'block';
        alert("Bienvenue en 2050, aprés une guerre mondiale suite un choc climatique sans précédant. Un nouveau ennemie a fait son apparition. Tous les avions sont réquisitionné pour une bataille extraordinaire.\n\n Deplacement : ⬅️➡️ --   Tir : SpaceBar");


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


    /******************************************************************************  game   *********************************************************************/ 

                    /*******************************************************    deplacement avion  ****************************************************/

                                                          /********  Function deplacement des images du sprite    **********/
function donneuse(cible,style) { 
    const element = document.querySelector(cible);
    if (element) {
        return window.getComputedStyle(element)[style];
    }
};
                                             
                                                                /************ Deplacement du sprite ***********/

                                                               
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
                   };

        break;
    
        case " ":
                    /*************************************************   Creation des lasers   **************************************************/
                         
            let laser = document.createElement('div'); // creer des nouvelles div 
            laser.classList.add('laser');// prend les valeurs class laser
            board.appendChild(laser);// prend la nouvelle postion dans le board avec les valeurs de la class
            
                   /**************************************************  Gestion des collisions *****************************************/
            
            let mouvLaser = setInterval(() => {
                   
                for (let i = 0; i < ovnis.length; i++) {
                    let ovni = ovnis[i];
                    if (ovni != undefined) {
                        let contoureOvni = ovni.getBoundingClientRect()// renvoie les informations sur la postion et la taille des ovnis
                        let countoureLaser = laser.getBoundingClientRect()//renvoie les informations sur la postion et la taille du laser
                        if (
                            countoureLaser.left >= contoureOvni.left &&
                            countoureLaser.right <= contoureOvni.right &&
                            countoureLaser.top <= contoureOvni.top &&
                            countoureLaser.bottom <= contoureOvni.bottom
                        ) {
                            ovni.parentElement.removeChild(ovni);
                            laser.parentElement.removeChild(laser);                   
                            score.innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
                        };
                    };
                }
                const laserBottom = parseInt( window.getComputedStyle(laser).getPropertyValue('bottom') );
                    if (laserBottom >= 500) {
                        clearInterval(mouvLaser);
                        // console.log('disparu');
                    }
                laser.style.left = left + 17 + 'px';//position du tir lors du quand on click sur la space bar 
                laser.style.bottom = laserBottom + 3 + 'px'// position du tir par rapport au sprite
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



        /************************************************************     Deplacement Ennemies     *************************************************************/

usineOvni = setInterval(() => {
   
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
  }, 700);
