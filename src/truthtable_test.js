

const script = require("./script")

// Se crea una prop de negacion, se evalua y se crea su tabla de verdad
vars_negation = ["q"]
prop_negation = new script.Negation(new script.VarProp('q'))
let value_negation = {
    q: false
}
let tt_negation = script.truthTable(prop_negation, vars_negation)

console.log("Tabla de verdad de la negacion")
console.log(script.evalProp(prop_negation, value_negation))
console.log(script.truthTable(prop_negation, vars_negation))

// Se crea una prop de conjuncion, se evalua y se crea su tabla de verdad
vars_conjuction = ["q", "p"]
prop_conjuction = new script.Conjuction(new script.VarProp('p'), new script.VarProp('q'))
let value_conjuction = {
    p: false,
    q: true
}
let tt_conjuction = script.truthTable(prop_conjuction, vars_conjuction)

console.log("Tabla de verdad de la conjuncion")
console.log(script.evalProp(prop_conjuction, value_conjuction))
console.log(script.truthTable(prop_conjuction, vars_conjuction))


// Se crea una prop de disjuncion, se evalua y se crea su tabla de verdad
vars_disjuction = ["q", "p"]
prop_disjuction = new script.Disjuction(new script.VarProp('p'), new script.VarProp('q'))
let value_disjuction = {
    p: false,
    q: true
}
let tt_disjuction = script.truthTable(prop_disjuction, vars_disjuction)

console.log("Tabla de verdad de la disjuncion")
console.log(script.evalProp(prop_disjuction, value_disjuction))
console.log(script.truthTable(prop_disjuction, vars_disjuction))

// Se crea una prop de condicional, se evalua y se crea su tabla de verdad
vars_conditional = ["q", "p"]
prop_conditional = new script.Conditional(new script.VarProp('p'), new script.VarProp('q'))
let value_conditional = {
    p: false,
    q: true
}
let tt_conditional = script.truthTable(prop_conditional, vars_conditional)

console.log("Tabla de verdad de la condicional")
console.log(script.evalProp(prop_conditional, value_conditional))
console.log(script.truthTable(prop_conditional, vars_conditional))

// Se crea una prop de bicondicional, se evalua y se crea su tabla de verdad
vars_biconditional = ["q", "p"]
prop_biconditional = new script.Biconditional(new script.VarProp('p'), new script.VarProp('q'))
let value_biconditional = {
    p: false,
    q: true
}
let tt_biconditional = script.truthTable(prop_biconditional, vars_biconditional)

console.log("Tabla de verdad de la bicondicional")
console.log(script.evalProp(prop_biconditional, value_biconditional))
console.log(script.truthTable(prop_biconditional, vars_biconditional))





