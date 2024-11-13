const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 100 // Interaction radius
};
// Update mouse position
window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});
// Particle Object
class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        // Calculate the distance between particle and mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        // Interaction with the cursor (gentle repulsion effect)
        if (distance < mouse.radius + this.size) {
            // Calculate angle and direction of repulsion
            let angle = Math.atan2(dy, dx);
            let forceDirectionX = Math.cos(angle);
            let forceDirectionY = Math.sin(angle);
            // Gradual, gentle repulsion effect
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance; // Normalized value between 0 and 1
            let repulsionStrength = force * 0.2; // Lower strength for subtle effect
            // Apply directional change without increasing speed
            this.directionX -= forceDirectionX * repulsionStrength;
            this.directionY -= forceDirectionY * repulsionStrength;
        }
        // Ensure particles keep a relatively constant base speed
        const baseSpeed = 0.5; // Set a desired constant speed
        let currentSpeed = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
        // Normalize speed to baseSpeed to prevent speeding up or slowing down too much
        this.directionX = this.directionX / currentSpeed * baseSpeed;
        this.directionY = this.directionY / currentSpeed * baseSpeed;
        // Update position with adjusted directions
        this.x += this.directionX;
        this.y += this.directionY;
        // Bounce off edges with a small random factor
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.directionX = -this.directionX + (Math.random() - 0.5) * 0.1;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.directionY = -this.directionY + (Math.random() - 0.5) * 0.1;
        this.draw();
    }
}
// Initialize particle array
function init() {
    particlesArray = [];
    const numberOfParticles = 300;
    for(let i = 0; i < numberOfParticles; i++){
        let size = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2) + size * 2;
        let directionX = Math.random() * 0.5 - 0.25;
        let directionY = Math.random() * 0.5 - 0.25;
        let color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 255, 0.8)`;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach((particle)=>{
        particle.update();
    });
}
// Adjust canvas size on window resize
window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
// Initialize particles and start animation
init();
animate();

//# sourceMappingURL=index.00a0aac0.js.map
