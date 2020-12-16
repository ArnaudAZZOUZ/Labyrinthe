// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {

    const GrenobleLat = 45.166667;
    const GrenobleLong = 5.716667;

    const R = 6371; // metres
    const φ1 = GrenobleLat.toRadians(); // φ, λ in radians
    const φ2 = Number(city.latitude).toRadians();
    const Δφ = (Number(city.latitude) - GrenobleLat).toRadians();
    const Δλ = (Number(city.longitude) - GrenobleLong).toRadians();

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


    return (R * c).toFixed(0); // in metres

    ;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    let town = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = town;
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {

    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    return csvData[i].dist < csvData[j].dist;

}


function insertsort() {
    for (let i = 1; i < csvData.length; i++) {
        for (let j = i; j > 0 && isLess(j, j - 1); j--) {
            swap(j, j - 1);
        }
    }

    console.log("insertsort - done !");
}

function selectionsort() {
    let k = 0;

    for (let i = 0; i < csvData.length; i++) {
        k = i;
        for (let j = i; j < csvData.length; j++) {
            if (isLess(j, k)) {
                k = j;
            }
        }
        swap(i, k);
    }
    console.log("selectionsort - done!");
}


function bubblesort() {

    for (let i = 0; i <= csvData.length - 1; i++) {
        for (let j = 0; j <= (csvData.length - 2 - i); j++) {
            if (!isLess(j, j + 1)) {
                swap(j, j + 1);
            }
        }
    }
    console.log("bubblesort - implement me !");

}

//version pseudo code
// let passage = 0;
// let permut;
// do {
//     permut = false;
//     for (let i = 0; i <= csvData.length - 2 - passage; i++) {
//         if (!isLess(i, i + 1)) {
//             swap(i, i + 1);
//             permut = true;
//         }
//     }
//     passage++;
// } while (permut === true)
function insertsortshell(gap, d) {
    for (let i = gap + d; i < csvData.length; i += gap) {
        for (let j = i; j >= gap && isLess(j, j - gap); j -= gap) {
            swap(j, j - gap);
        }
    }
}

function shellsort() {
    let tableauGap = [701, 301, 132, 57, 23, 10, 4, 1]
    if (csvData.length > 1600) {
        tableauGap = creategap(csvData, tableauGap);
    }
    console.log(tableauGap);
    tableauGap.forEach(gap => {
        for (let d = 0; d < tableauGap.length; d++) {
            insertsortshell(gap, d)
        }
    })

}

function creategap(array, intervalle) {
    let gap = 701;
    do {
        gap = Math.round(gap * 2.3);
        intervalle.unshift(gap)

    } while (gap < array.length)
    return intervalle;
}


function mergesort() {
    console.log("mergesort - implement me !");
}

function heapsort() {
    console.log("heapsort - implement me !");
}


function quicksort() {
    let left = 0;
    let right = csvData.length - 1;

    sortmefast(left, right);

    function sortmefast(g, d) {


        let droit = d;
        let mur = g;
        let pivot = droit;
        for (let gauche = 0; gauche <= csvData.length - 1; gauche++) {
            if (isLess(gauche, pivot)) {
                swap(gauche, mur)
                mur++;
            }
        }
        swap(mur, pivot);
        if (isLess(mur , mur - 1)) {
            sortmefast(mur, mur - 1);
        }
        if (isLess(mur + 1 , )) {
            sortmefast(mur, droit);
        }
    }

}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
