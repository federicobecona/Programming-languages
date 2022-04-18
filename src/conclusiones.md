
# **Conclusiones Proyecto Lenguajes de Programación**

### Análisis del número de iteraciones promedio con el cual se llega a una proposición óptima para 1 y 2 variables con los algoritmos: búsqueda aleatoria y estrategia evolutiva.

Este analisis depende del valor que le demos a la condición de corte. Con una condición de corte mayor, se verá un matchPercentage mayor. 
 Esto quiere decir que se podrá encontrar una proposición que matchee perfectamente con la tabla una mayor cantidad de veces. Igualmente, al hacer esto, sube la cantidad promedio de iteraciones que hace el algoritmo para intentar encontrar una proposición con un fit de 1.

 A continuación, se muestran algunos resultados para diferentes valores de condición de corte (número máximo de iteraciones del algoritmo en cuestión -> le llamaremos magic number).

#### Las pruebas fueron realizadas con 10000 casos cada una para que los resultados sean representativos.

## **Búsqueda Aleatoria**

## **1 variable**
        - MagicNumber = 5 -> avgIters: 3.078, matchPercentage: 74.8
        - MagicNumber = 10 -> avgIters: 3.8699, matchPercentage: 93.07
        - MagicNumber = 25 -> avgIters: 4.24, matchPercentage: 99.7
        - MagicNumber = 50 -> avgIters: 4.2423, matchPercentage: 99.99
        - MagicNumber = 100 -> avgIters: 4.2423, matchPercentage: 100 -> El máximo número de iteraciones es 55

## **2 Variables**
         - MagicNumber = 10 -> avgIters: 7.777, matchPercentage: 42.089999999999996
         - MagicNumber = 25 -> avgIters: 14.3533, matchPercentage: 69.67999999999999
         - MagicNumber = 50 -> avgIters: 18.944, matchPercentage: 89.24
         - MagicNumber = 75 -> avgIters: 20.797, matchPercentage: 96.08
         - MagicNumber = 100 -> avgIters: 21.3799, matchPercentage: 98.63
         - MagicNumber = 1000 -> avgIters: 21.8624, matchPercentage: 100 -> El máximo número de iteraciones es 327

#### Se observa que para nuestra seed definida, el número promedio de iteraciones converge en 21.8624


## **Estrategia Evolutiva**
#### Suponemos cuenta (cardinalidad de la población) de 10 -> se puede tunear tambén
#### Nota: No se considera como iteración la primera generación de población, pues se hace fuera del bucle, pero para comparar con la estrategia de búsqueda aleatoria, se debería sumar 1 a las avgIters de la estrategia evolutiva.

## **1 variable**
        - MagicNumber = 5 -> avgIters: 0.1617, matchPercentage: 99.16
        - MagicNumber = 10 -> avgIters: 0.1808 , matchPercentage: 99.77
        - MagicNumber = 25 -> avgIters: 0.1946 , matchPercentage: 99.98
        - MagicNumber = 50 -> avgIters: 0.2012 , matchPercentage: 100 -> El máximo número de iteraciones es 30 

## **2 variables**
        - MagicNumber = 10 -> avgIters: 3.2398, matchPercentage: 82.39
        - MagicNumber = 25 -> avgIters: 4.99, matchPercentage: 93.06
        - MagicNumber = 50 -> avgIters: 5.87, matchPercentage: 98.2
        - MagicNumber = 75 -> avgIters: 6.33, matchPercentage: 99.46
        - MagicNumber = 100 -> avgIters: 6.40, matchPercentage: 99.7
        - MagicNumber = 1000 -> avgIters: 6.52, matchPercentage: 100 -> El máximo número de iteraciones es 220 

#### Se observa que para nuestra seed definida, el número promedio de iteraciones converge en 6.52


## Conclusiones
Se puede observar que al utilizar la estrategia evolutiva, se llega a una proposición óptima (posee un fitness de 1) en un número promedio de veces significativamente menor que utilizando el algoritmo de búsqueda aleatoria. Esto ocurre tanto para tablas de verdad de una variable como para tablas de 2 variables. También, la máxima cantidad de iteraciones que utiliza el algoritmo evolutivo para encontrar una proposición óptima es menor que la máxima cantidad de iteraciones utilizada por el algoritmo de búsqueda aleatoria.
Por lo tanto, concluimos que la estrategia evolutiva es la mejor de las 2 estrategias.
