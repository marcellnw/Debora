// Efek Bintang Jatuh (Meteor) pakai Canvas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Buat class untuk partikel
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = 0; // bintang muncul dari atas
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

// Buat banyak bintang
let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push(new Star());
}

// Tambahin meteor (lebih cepat)
class Meteor {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 6 + 4;
    this.angle = Math.PI / 4; // arah diagonal
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.y > canvas.height || this.x > canvas.width) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length * Math.cos(this.angle),
               this.y - this.length * Math.sin(this.angle));
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

let meteors = [];
for (let i = 0; i < 5; i++) {
  meteors.push(new Meteor());
}

// Loop animasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  meteors.forEach(meteor => {
    meteor.update();
    meteor.draw();
  });

  requestAnimationFrame(animate);
}

animate();
