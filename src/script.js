//Seeds Randómicas

const seedrandom = require('seedrandom');
const generator = seedrandom('A');

//Fase 0
class Prop {
    evalProp(value) {}

    static randomProp(rng, vars, maxHeight, minHeight) {
        if (maxHeight <= 0) {
            return VarProp.randomProp(rng, vars, maxHeight, minHeight)
        } else {
            let props = [Negation, Conjuction, Disjuction, Conditional, Biconditional]
            if (minHeight <= 0) {
                props.push(VarProp)
                let randPropIndex = rng(props.length).next().value
                let randProp = props[randPropIndex]
                return randProp.randomProp(rng, vars, maxHeight, minHeight)
            } else {
                let randPropIndex = rng(props.length).next().value
                let randProp = props[randPropIndex]
                return randProp.randomProp(rng, vars, maxHeight, minHeight)
            }
        }
    }
}

class VarProp extends Prop {
    constructor(identifier) {
        super();
        this.identifier = identifier
    }
    evalProp(value) {
        return value[this.identifier];
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        let randomVar = rng(vars.length).next()
        return new VarProp(vars[randomVar.value])
    }
}

class Negation extends Prop {
    constructor(right) {
        super();
        this.right = right
    }
    evalProp(value) {
        return !this.right.evalProp(value)
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Negation(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1))
    }
}

class Conjuction extends Prop {
    constructor(left, right) {
        super();
        this.left = left
        this.right = right
    }
    evalProp(value) {
        return this.left.evalProp(value) && this.right.evalProp(value)
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Conjuction(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1), Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1))
    }
}

class Disjuction extends Prop {
    constructor(left, right) {
        super();
        this.left = left
        this.right = right
    }
    evalProp(value) {
        return this.left.evalProp(value) || this.right.evalProp(value)
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Disjuction(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1), Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1))
    }
}

class Conditional extends Prop {
    constructor(left, right) {
        super();
        this.left = left
        this.right = right
    }
    evalProp(value) {
        return new Disjuction(new Negation(this.left), this.right).evalProp(value)
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Conditional(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1), Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1))
    }
}

class Biconditional extends Prop {
    constructor(left, right) {
        super();
        this.left = left
        this.right = right
    }
    evalProp(value) {
        return new Conjuction(new Conditional(this.left, this.right), new Conditional(this.right, this.left)).evalProp(value)
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Biconditional(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1), Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1))
    }
}

function randomProp(rng, vars, maxHeight, minHeight) {
    Prop.randomProp(rng, vars, maxHeight, minHeight)
}

function evalProp(prop, value) {
    return prop.evalProp(value)
}

function truthTable(prop, vars) {
    let res = []
    let combinations = generateTruthCombinations(vars)
    for (let i = 0; i < combinations.length; i++) {
        let eval = evalProp(prop, combinations[i])
        res.push([combinations[i], eval])
    }
    return res
}

/*
  Genera todas las combinaciones de valores de verdad 
  que se pueden formar con las variables de entrada
*/
function generateTruthCombinations(vars) {
    let arr = [];
    for (let i = 0; i < Math.pow(2, vars.length); i++) {
        let row = (i >>> 0).toString(2)
        row = fillWithZeros(row, vars.length)
        row = row.split("").map((letter) => {
            return letter === "1" ? true : false
        })
        let entries = vars.map(function(variable, i) {
            return [variable, row[i]];
        });
        arr.push(Object.fromEntries(entries))
    }
    return arr;
}

function fillWithZeros(str, len) {
    while (str.length < len) {
        str = "0" + str;
    }
    return str
}

/*
  Generador de números aleatorios con seed
*/
function* rng(range) {
    let randomValue = generator()
    let randomInt = Math.round(randomValue * (range - 1))
    yield randomInt;
}

//Fase 1

function randomTruthTable(rng,vars) {
    let res = []
    let combinations = generateTruthCombinations(vars)
    for (let i = 0; i < combinations.length; i++) {
        let randomVal = [true, false][rng(2).next().value]
        res.push([combinations[i], randomVal])
    }
    return res
}

function fitness(prop, tTable) {
    let variables = getVarsTruthTable(tTable)
    let compTruthTable = truthTable(prop, variables)
    return compareTruthTables(tTable, compTruthTable) / Math.pow(2, variables.length)
}

/*
  Obtiene las variables que se utilizan en una tabla de verdad
*/
function getVarsTruthTable(truthTable) {
    return (Object.entries(truthTable[0][0]).map(function(x) {
        return x[0]
    }))
}

/* 
  Consigue los valores de verdad resultados de una tabla de verdad 
  ordenados según las combinaciones de las entradas
*/
function getOrdVals(truthTable) {
    return truthTable.map(function(list) {
        return list[1]
    })
}

/*
  Devuelve la cantidad de resultados compartidos correspondientemente
  entre dos tablas de verdad
*/
function compareTruthTables(tt1, tt2) {
    let vals1 = getOrdVals(tt1)
    let vals2 = getOrdVals(tt2)
    return vals1.map(function(vals1, i) {
        return vals1 == vals2[i]
    }).reduce((a, b) => a + b, 0)
}

function randomSearch(rng, truthTable, count, propArgs) {
    let step = 0
    let bestProp
    let bestFitness = Number.NEGATIVE_INFINITY
    while (bestFitness < 1 && step < count) {
        step++
        let pArgs = Object.entries(propArgs)
        let randProp = Prop.randomProp(rng, pArgs[0][1], pArgs[1][1], pArgs[2][1])
        let fit = fitness(randProp, truthTable)
        if (fit > bestFitness) {
            bestFitness = fit
            bestProp = randProp
        }
        if (fit == 1) {
            return { prop: randProp, nIter: step, match: true }
        }
    }
    return { prop: bestProp, nIter: count, match: false }
}

//Fase 2

function initialPopulation(rng, vars, count, minHeight, maxHeight) {
    let iniPopulation = []
    for (let i = 0; i < count; i++) {
        let randProp = Prop.randomProp(rng, vars, maxHeight, minHeight)
        iniPopulation.push([randProp, 0])
    }
    return iniPopulation
}

function assessPopulation(population, truthTable) {
    population.forEach(function(individual) {
        individual[1] = fitness(individual[0], truthTable)
    });
}

/* 
  Para sobrerepresentar a las props con buen fitness, se crea una nueva lista y se 
  agregan dichas proposiciones nToAdd veces. nToAdd se calcula como el fitness de 
  dicha prop + 0,25 (corrección para el caso en el que todas las props tengan fitness 0) 
  multiplicado por 4. Una prop con fitness 0 aparecerá 1 vez en la nueva lista y una prop 
  con fitness 0,75 aparecerá 4 veces. 
  Por último, se retorna array de largo count que contiene elementos de la nueva lista
  elegidos al azar.
*/
function selection(rng, population, count) {
    let n = 4
    let probArray = []
    population.map(function(individual, i) {
        let prob = individual[1]
        let nToAdd = (prob + 0.25) * n 
        for (let j = 0; j < nToAdd; j++) {
            probArray.push(i)
        }
    })
    let selectionArray = []
    for (let h = 0; h < count; h++) {
        let index = rng(probArray.length - 1).next().value
        let indexInPop = probArray[index]
        let value = population[indexInPop]
        selectionArray.push(value)
    }
    return selectionArray
}

function mutation(rng, prop, propArgs) {
    let pArgs = Object.entries(propArgs)
    let quanNodes = countNodes(prop)
    let randPropIndex = rng(quanNodes - 1).next().value
    if (randPropIndex == 0) {
        return Prop.randomProp(rng, pArgs[0][1], pArgs[1][1], pArgs[2][1])
    }
    mutate(prop, 0, randPropIndex, 1, pArgs)
    return prop
}

/*
  maxheight y minHeight del nodo a cambiar son maxHeight y minHeight 
  del árbol que está en pArgs menos la profunidad del nodo a cambiar.
*/
function mutate(prop, index, n, depth, pArgs) {
    if (!(prop.left == null)) {
        if ((index + 1) == n) {
            prop.left = Prop.randomProp(rng, pArgs[0][1], pArgs[1][1] - depth, pArgs[2][1] - depth)
            return index + 1
        } else {
            index = mutate(prop.left, index + 1, n, depth + 1, pArgs)
        }
    }
    if (!(prop.right == null)) {
        if ((index + 1) == n) {
            prop.right = Prop.randomProp(rng, pArgs[0][1], pArgs[1][1] - depth, pArgs[2][1] - depth)
            return index + 1
        } else {
            index = mutate(prop.right, index + 1, n, depth + 1, pArgs)
        }
    }
    return index
}

/*
  Aplica la mutación para cada una de las props
*/
function multipleMutation(rng, props, propArgs) {
    return props.map(function(prop) {
        return [mutation(rng, prop[0], propArgs), prop[1]]
    });
}

/*
  Devuelve la cantidad de nodos que hay en un árbol de props
*/
function countNodes(prop) {
    if (prop == null)
        return 0
    return countNodes(prop.left) + countNodes(prop.right) + 1
}

function evolutionStrategy(rng, truthTable, steps, count, propArgs) {
    let step = 0
    let pArgs = Object.entries(propArgs)
    let vars = pArgs[0][1]
    let maxHeight = pArgs[1][1]
    let minHeight = pArgs[2][1]
    let population = initialPopulation(rng, vars, count, minHeight, maxHeight)
    assessPopulation(population, truthTable)
    best = getBestIndividual(population)
    let bestFitness = best[1]
    while ((bestFitness < 1) && step < steps) {
        step += 1
        let selIndividuals = selection(rng, population, count)
        let mutatatedSelIndividuals = multipleMutation(rng, selIndividuals, propArgs)
        assessPopulation(mutatatedSelIndividuals, truthTable)
        population = mutatatedSelIndividuals;
        best = getBestIndividual(population)
        bestFitness = best[1]
    }
    return { prop: best, nIter: step, match: bestFitness == 1 }
}

/*
  Retorna el mejor individuo de una población según la función fitness
*/
function getBestIndividual(population) {
    let bestIndividual
    let bestFitness = Number.NEGATIVE_INFINITY
    population.map((individual) => {
        if (individual[1] > bestFitness) {
            bestIndividual = individual
            bestFitness = individual[1]
        }
    })
    return bestIndividual
}

module.exports = {
    randomTruthTable,
    randomSearch,
    evolutionStrategy,
    evalProp, 
    truthTable, 
    VarProp : VarProp,
    Negation :  Negation, 
    Conjuction : Conjuction, 
    Disjuction : Disjuction, 
    Conditional : Conditional,
    Biconditional : Biconditional
}