// src/simulation.ts
import { Boid } from './boid.js';
export function startSimulation(ctx) {
    const canvas = ctx.canvas;
    const boids = [];
    // Create initial boids
    for (let i = 0; i < 2000; i++) {
        boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
    }
    function drawBoid(boid) {
        const size = 10; // Size of the boid
        const angle = Math.atan2(boid.velocity.y, boid.velocity.x); // Angle of movement
        ctx.save(); // Save the current context state
        // Translate to the boid's position
        ctx.translate(boid.position.x, boid.position.y);
        // Rotate the context to the boid's movement direction
        ctx.rotate(angle);
        // Begin drawing the triangle
        ctx.beginPath();
        ctx.moveTo(0, -size / 2); // Point of the triangle
        ctx.lineTo(-size / 2, size / 2); // Bottom left
        ctx.lineTo(size, size / 2); // Bottom right
        ctx.closePath();
        // Fill the triangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
        ctx.fill();
        ctx.restore(); // Restore the context to its original state
    }
    function simulate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const boid of boids) {
            boid.flock(boids);
            boid.update(canvas.width, canvas.height);
            drawBoid(boid);
        }
        requestAnimationFrame(simulate);
    }
    // Add click event listener to the canvas
    canvas.addEventListener('click', (event) => {
        // Get the click position relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Create a new boid at the clicked position
        boids.push(new Boid(x, y));
    });
    simulate();
}
