/****************************************************************/
/*************************** Mediana ****************************/
/****************************************************************/
Tiempo de desarrollo: 50min 
Archivo: MedianEngine.js 
Librerias usadas: jquery 
Complejidad temporal: O(n) donde n es el número de operaciones a realizar. 

Explicación del codigo realizado:
Se ha construido una api en jquery (medianEngine) en la que se expone un metodo llamado "render", el cual recibe una matriz dada por las siguientes validaciones:
	-El array de valores no puede estar vacío.
	-El primer item de la matriz debe ser numérico.
	-Del segundo item en adelante debe tener una logitud igual o superior a 2
	-Del segundo item en adelante, el primer caracter es una letra que debe ser "a" para agregar un elemento al calculo de la mediana y "r" para eliminar un elemento de la mediana.
	-Del segundo item en adelante, del segundo caracter en adelante debe ser numerico y corresponde al valor que desea agregarse o eliminarse de la matriz
Estas validaciones se realizan dentro del metodo "render", las cuales garantizan la informacion entregada por quien utilice la api.
Nota: El no complir con las validaciones anteriores, el proceso de cálculo de la mediana no podrá llevarse a cabo. Será mostrado un error en la consola del navegador indicando el motivo del rechazo, precedida por la palabra "Exception"

Se recorre cada elemento de la matriz entregada, omitiendo el primer item (cantidad de cálculos a realizar)
Solo se cumputan la cantidad de operaciones entregadas en el primer elemento de la matriz -perfomance-

Extraídas la operación a realizar, y el valor a computar, se pasan a un método privado detro de la api "_perform" el cual actúa como una strategia para determinar el tipo de acción a tomar. (agregar o eliminar) y único método encargado de la impresión de valores (*)
Los métodos privados para agregar y eliminar ("_add" y "_rem" respectivamente) tienen sus propias validaciones de la acción que realizan, aislando su comportamiento (SOLID) del resto del proceso, asi como salida (solo retornan valores, nunca imprimen, esta responsabilidad es de quien los llama)
Estos dos metodos ("_add" y "_rem") comparten otro metodo privado "_compute" (los cuales deciden el momento y lugar de su llamada) método que es el único responsable del cálculo de la mediana.


En la parte inferior del archivo podrá encontrar algunos ejemplos de su uso.
* El resultado del cálculo realizado es entregado como log dentro de la consola del navegador

/****************************************************************/
/************************ Árbol sin raíz ************************/
/****************************************************************/
Entendimiento del problema: 20min
Diseño de la solucion: 3hrs
Tiempo de desarrollo: 10min
Total tiempo empleado: 3.5hrs
Archivo: TreeEngine.js
Librerias usadas: jquery
Complejidad temporal: O(n) donde n es el número de nodos del árbol.

Explicación del codigo realizado:
Se ha construido una api en jquery (treeEngine) en la que se expone los siguientes metodos (soporta : múltiples nodos padres)
	setDimension: Define los nodos del árbol a interpretar
		tipo: Entero
	setColors: Define los colores para cada nodo del árbol a interpretar	
		tipo: String delimitado por espacios
	addEdge: Permite agregar el map entre los nodos del árbol a interpretar
		tipo: String delimitado por espacios
		condiciones: el primer valor corresponde al nodo orígen, el segundo valor corresponde al nodo destino.
	render: realiza el calculo de colores diferentes en el arbol.
	
Árboles permitidos	              

             1
            / \  
           2   5
          / \ 
         3   4 
       
             1
            / \  
           2 - 3
          / \ / \
         4 - 5 - 6
        / \ / \ / \
       7 - 8 - 9 - 10

Condiciones:
	Para agregar un eje (addEdge) es necesario que se halla definido la dimensión del árbol (setDimension)
	Para obtener el resultado de la interpretación del árbol, es necesario indicar los ejes del árbol (addEdge) y haber indicado los colores de los nodos (setColors)

Metodos privados:
	_getTree: Método que permite obtener el path de navegación entre el nodo orígen y el nodo destino (llama a _getPath) "Actúa como factoría de variables"
	_getPath: Método que permite obtener el path de navegación entre el nodo orígen y el nodo destino (Recursividad) 
	_getColor: Método que permite obtener el color asociado a un nodo.
	_mapColor: Método que a partir de el path de navegación entre el nodo orígen y el nodo destino determinar el color del resultado (Llamando a _getColor)
	_print: Único que método que imprime el resultado, realiza la sumatoria de valores únicos en el path de navegación.	
	   
* El resultado del cálculo realizado es entregado como log dentro de la consola del navegador

/****************************************************************/
/******************** Preguntas adicionales *********************/
/****************************************************************/

Cuales serian las cualidades para un código limpio? 
	Aparte de las cualidades obvias como documentación (que sirva), fácil de leer, complejidad ciclomática baja, alta cohesión y bajo acomplamiento, considero que si al menos está deacuerdo a los principios SOLID me doy por bien servido.
Cuales serian los estándares según tú para un buen proyecto? 
	Lo resumo en dos "principios" primordiales:
		- Mínimamente aplicar principios SOLID (asi no se conozcan de patrones).
		- Definición de variables, metodos, clases etc... en un solo lenguaje (Español o Ingles) Preferiblemente inglés ya que es menos verboso.	
Qué patrones conoce? y utiliza? 
	Factory, Strategy, Adapter, UnitOfWork, Singleton, Decorator, Facade, Command, Observer (de los que me puedo acordar)
