const script = require("./script")
const seedrandom = require('seedrandom');
const generator = seedrandom('A');

// Análisis del número de iteraciones promedio con el cual se llega a la proposición óptima para 1 y 2 variables con búsqueda aleatoria
/*
Este análisis depende del valor que le demos a la condición de corte. Con una condición de corte mayor, se verá un matchPercentage mayor. 
Esto quiere decir qeu se podrá encontrar una teraciones que hace el proposición que matchee perfectamente con la tabla una mayor cantidad de veces. Igualemnte,
al hacer esto, sube la cantidad promedio de ialgoritmo RandomSearch para intentar encontrar una proposición con un fit
de 1.
A continuación, se muestran algunos resultados para diferentes valores de condición de corte (número máximo de iteraciones 
de RandomSearch -> le llamaremos magic number).
Las pruebas fueron realizadas con 10000 casos cada una apra que los resultados sean representativos.
1 variable
MagicNumber = 5 -> avgIters: 3.078, matchPercentage: 74.8
MagicNumber = 10 -> avgIters: 3.8699, matchPercentage: 93.07
MagicNumber = 25 -> avgIters: 4.24, matchPercentage: 99.7
MagicNumber = 50 -> avgIters: 4.2423, matchPercentage: 99.99
MagicNumber = 100 -> avgIters: 4.2423, matchPercentage: 100 -> El máximo es 55 iters
2 Variables
MagicNumber = 10 -> avgIters: 7.777, matchPercentage: 42.089999999999996
MagicNumber = 25 -> avgIters: 14.3533, matchPercentage: 69.67999999999999
MagicNumber = 50 -> avgIters: 18.944, matchPercentage: 89.24
MagicNumber = 75 -> avgIters: 20.797, matchPercentage: 96.08
MagicNumber = 100 -> avgIters: 21.3799, matchPercentage: 98.63
MagicNumber = 1000 -> avgIters: 21.8624, matchPercentage: 100 -> El máximo es 327 iters
Observamos que para nuestra seed definida, el número promedio de iteraciones converge en 21.8624
*/
let epochs = 10000
const vars = ["q", "p"]
let args = {
    vars: ["q", "p"],
    maxHeight: 5,
    minHeight: 1
}

// const vars = ["q"]
// let args = {
//     vars: ["q"],
//     maxHeight: 5,
//     minHeight: 1
// }

let magicNumer = 100

function* rng(range) {
    let randomValue = generator()
    let randomInt = Math.round((randomValue * (range) - 0.5) == (range - 0.5) ? range - 1 : (randomValue * (range) - 0.5))
    yield randomInt;
}

function optNumIterRandomSearch(vars, magicNumer, epochs, args, rng) {
    let numIterArr = [];
    let matchesArr = [];
    for (let i = 0; i < epochs; i++) {
        let randTable = script.randomTruthTable(rng,vars)
        if (i % 100 == 0) { console.log("iteracion " + i) }
        let result = script.randomSearch(rng, randTable, magicNumer, args)
        numIterArr.push(result.nIter)
        matchesArr.push(result.match)
    }
    let average = (numIterArr.reduce((previous, current) => previous + current, 0)) / numIterArr.length
    let percentage = (matchesArr.reduce((previous, current) => current === true ? previous + 1 : previous, 0) / matchesArr.length) * 100
    let max = (numIterArr.reduce((previous, current) => Math.max(previous, current), 0))
    return { numIters: numIterArr, avgIters: average, matches: matchesArr, matchPercentage: percentage, maxIters: max }
}

console.log(optNumIterRandomSearch(vars, magicNumer, epochs, args, rng))



/*
Estrategia evolutiva
Supongo cuenta (cardinalidad de la población) de 10 -> se puede tunear tambén 
(No se considera como iteración la primera genración de población, pues se hace fuera del bucle, pero para comparar con la estrategia random
    debería sumar 1 a las avgIters de la estrategia evolutiva).
1 variable
MagicNumber = 5 -> avgIters: 0.1617, matchPercentage: 99.16
MagicNumber = 10 -> avgIters: 0.1808 , matchPercentage: 99.77
MagicNumber = 25 -> avgIters: 0.1946 , matchPercentage: 99.98
MagicNumber = 50 -> avgIters: 0.2012 , matchPercentage: 100 -> El maximo es 30 iters
2 variables 
MagicNumber = 10 -> avgIters: 3.2398, matchPercentage: 82.39
MagicNumber = 25 -> avgIters: 4.99, matchPercentage: 93.06
MagicNumber = 50 -> avgIters: 5.87, matchPercentage: 98.2
MagicNumber = 75 -> avgIters: 6.33, matchPercentage: 99.46
MagicNumber = 100 -> avgIters: 6.40, matchPercentage: 99.7
MagicNumber = 1000 -> avgIters: 6.52, matchPercentage: 100 -> El máximo es 220 iters
Observamos que para nuestra seed definida, el número promedio de iteraciones converge en 6.52
*/

const cuenta = 10

function optNumIterEvolutionarySearch(vars, steps, epochs, count, args, rng) {
    console.log("Arranco Evolutivo ------------------------------")
    let numIterArr = [];
    let matchesArr = [];
    for (let i = 0; i < epochs; i++) {
        let randTable = script.randomTruthTable(rng,vars)
        if (i % 100 == 0) { console.log("iteracion " + i) }
        let result = script.evolutionStrategy(rng, randTable, steps, count, args)
        numIterArr.push(result.nIter)
        matchesArr.push(result.match)
    }
    let average = (numIterArr.reduce((previous, current) => previous + current, 0)) / numIterArr.length
    let percentage = (matchesArr.reduce((previous, current) => current === true ? previous + 1 : previous, 0) / matchesArr.length) * 100
    let max = (numIterArr.reduce((previous, current) => Math.max(previous, current), 0))
    return { numIters: numIterArr, avgIters: average, matches: matchesArr, matchPercentage: percentage, maxIters: max }
}


console.log(optNumIterEvolutionarySearch(vars, magicNumer, epochs, cuenta, args, rng))