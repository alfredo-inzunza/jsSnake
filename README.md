# jsSnake
El juego clásico en Javascript.

Utilizando Canvas de HTML, se crea la función dibujar() y se ejecuta en intervalos constantes para el motor base del juego, dentro de ésta se tienen las siguientes funciones:

lienzoWidth(); //Se utiliza para aumentar el tamaño del lienzo según el tamaño de la serpiente.  

ctx.clearRect(0, 0, lienzo.width, lienzo.height); //Se utiliza para limpiar todo el canvas  

dibujarScore(); //Dibuja el score en la parte superior  

dibujarGameOver(); //Dibuja la animación de GameOver  

calcularMovimientos(); //Calcula el movimiento de la cabeza  

calcularMovimientosCuerpo(); // Calcula el movimiento del cuerpo  

dibujarCuerpo(); //Dibuja los elementos después del cálculo  

dibujarAlimento(); //Dibuja el alimento  

detectarColisiones(); //Detecta las colisiones de los elementos de la serpiente y las paredes  

detectarAlimento(); //Detecta las colisiones de la cabeza con los alimentos  

