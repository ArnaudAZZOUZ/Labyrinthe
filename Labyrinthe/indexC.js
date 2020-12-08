$( document ).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    $.getJSON("labyrinthes.json", function(result){
       let lab1 =result[25]['ex-0'];
        // ctx.strokeStyle = "green";
        // ctx.strokeRect(10, 10, 0, 100);
        // ctx.strokeRect(110, 10, 0, 100);
        // ctx.strokeRect(10, 10, 100, 0);
        // ctx.strokeRect(10, 110, 100, 0);
        // ctx.strokeRect(10, 10, 0, 100); //gauche
// ctx.strokeRect(110, 10, 0, 100); //droite
// ctx.strokeRect(10, 10, 100, 0); //haut
// ctx.strokeRect(10, 110, 100, 0); //bas
       lab1.forEach(element=>{
           ctx.strokeStyle = "green";
           if (element['walls'][0]) { //haut
               ctx.strokeRect(10+(element["posY"]*20), 10+(element["posX"]*20), 20, 0);
           }
           if (element['walls'][1]) { //droite
               ctx.strokeRect(30+(element["posY"]*20), 10+(element["posX"]*20), 0, 20);
           }
           if (element['walls'][2]) { //bas

               ctx.strokeRect(10+(element["posY"]*20), 30+(element["posX"]*20), 20, 0);
           }
           if (element['walls'][3]) { //gauche

               ctx.strokeRect(10+(element["posY"]*20), 10+(element["posX"]*20), 0, 20);
           }

       })

    });
    console.log( "ready!" );
});