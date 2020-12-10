$( document ).ready(function() {

    $.getJSON("labyrinthes.json", function(result) {
        let size=8;
        let lab1 = result[size]['ex-0'];
    labyrinth = buildlab(lab1,size);
    solveLabDFS(labyrinth, labyrinth[0],size);
    // solveLabDFSrecursifi(labyrinth, labyrinth[0],size);
    });

    let buildlab = (lab1,size)=>{

        let caseNumber = 0;
        lab1.forEach(element => {
            let div = document.createElement("div");
            element.case=caseNumber;
            div.setAttribute("id", `case-${caseNumber++}`)
            element.visited=false;

            div.classList.add("square");
            if (element['walls'][0]) { //haut
                div.classList.add("wall-top");
            }
            if (element['walls'][1]) { //droite
                div.classList.add("wall-right");
            }
            if (element['walls'][2]) { //bas
                div.classList.add("wall-bottom");
            }
            if (element['walls'][3]) { //gauche
                div.classList.add("wall-left");
            }
            $(".labyrinthe").append(div);
        })
        document.getElementsByClassName("labyrinthe")[0].style.gridTemplateColumns= `repeat(${size}, 50px)`;
    return lab1;
    }
    let getNeighborsNotVisited = (currentcase, lab1, size) => {
        let neighborsNotVisited = [];
        let wallFormula = [(currentcase.case - size), (currentcase.case + 1), (currentcase.case + size), (currentcase.case - 1)];
        let i = 0;
        for (const wall of currentcase['walls']) {
            if (!wall) {
                neighborsNotVisited.push(lab1[wallFormula[i]]);
            }
            i++;
        }
        return neighborsNotVisited;
    }
    let solveLabDFS=(lab1,currentcase,size)=> {
        let goal = (size*size)-1;
        let stack = [];
        stack.push(currentcase);

        /*
        version parcourir toutes les cases
         */
    //     while (stack.length > 0) {
    //        currentcase = stack.pop();
    //         if (currentcase.visited === false) {
    //
    //             currentcase.visited = true
    //             getNeighborsNotVisited(currentcase,lab1,size).forEach(neighbor =>{
    //                 stack.push(neighbor);
    //             });
    //             document.getElementById(`case-${currentcase.case}`).classList.add("visitedcolor");
    //
    //         }
    //
    //             }
    // }
        /*
        version atteindre l'arrivée
         */
    while (stack.length > 0) {
        currentcase = stack.pop();
        if (currentcase.visited === false) {
            currentcase.visited = true
            if(currentcase.case===goal){

                console.log("vous avez trouvez la sortie!")
                document.getElementById(`case-${currentcase.case}`).classList.add("winnercolor");
                return currentcase.case;
            }


            getNeighborsNotVisited(currentcase,lab1,size).forEach(neighbor =>{
                stack.push(neighbor);
            });
            document.getElementById(`case-${currentcase.case}`).classList.add("visitedcolor");

        }

    }
}

    let solveLabDFSrecursifi=(lab1,currentcase)=>{
        // let graph =[];
        // graph.push(lab1[0].visited(true));






        console.log(currentcase)
    }
});

