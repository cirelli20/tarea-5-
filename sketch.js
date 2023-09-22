let hexagons = []; // Array para almacenar los hexágonos
let drawingEnabled = true; // Indicador para habilitar o deshabilitar el dibujo

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  // Solo dibuja si drawingEnabled es verdadero
  if (drawingEnabled) {
    // Mostrar y mover cada hexágono
    for (let i = 0; i < hexagons.length; i++) {
      let hexagon = hexagons[i];

      // Dibuja el rastro del hexágono
      hexagon.displayTrail();

      // Mueve el hexágono
      hexagon.move();
    }
  }
}

function mousePressed() {
  // Solo crea nuevos hexágonos si drawingEnabled es verdadero
  if (drawingEnabled) {
    // Crear un nuevo hexágono con un color aleatorio y translúcido
    let hexagon = new Hexagon(mouseX, mouseY);
    hexagons.push(hexagon);
  }
}

function keyPressed() {
  // Cambia el estado de drawingEnabled al presionar la barra espaciadora
  if (key === ' ') {
    drawingEnabled = !drawingEnabled;
  }
}

class Hexagon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = -1; // Tamaño del hexágono
    this.speedX = random(1, 3); // Reducimos la velocidad en X
    this.speedY = random(1, 3); // Reducimos la velocidad en Y
    this.history = []; // Historial de posiciones para el rastro
    this.trailColor = color(random(255), random(255), random(255), 18); // Color aleatorio y translúcido
    this.lineWidth = 20;
  }

  displayTrail() {
    strokeWeight(this.lineWidth);
    // Dibuja el rastro del hexágono
    for (let i = 0; i < this.history.length - 1; i++) {
      let currentPos = this.history[i];
      let nextPos = this.history[i + 1];
      stroke(this.trailColor);
      line(currentPos.x, currentPos.y, nextPos.x, nextPos.y);
    }
  }

  move() {
    // Mueve el hexágono en una dirección aleatoria
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebota en los bordes del lienzo de manera más controlada
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }

    // Guarda la posición actual en el historial
    this.history.push(createVector(this.x, this.y));

    // Limita el historial a un número máximo de puntos
    if (this.history.length > 100) {
      this.history.splice(1);
    }
  }
}
