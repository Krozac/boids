// src/Boid.ts
export class Boid {
    constructor(x, y) {
        this.position = { x, y };
        this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }; // Random initial velocity
        this.acceleration = { x: 0, y: 0 };
        this.turnfactor = 0.2;
        this.visualRange = 40;
        this.protectedRange = 8;
        this.centeringfactor = 0.0005;
        this.avoidfactor = 0.05;
        this.matchingfactor = 0.05;
        this.maxspeed = 6;
        this.minspeed = 3;
        this.maxbias = 0.01;
        this.bias_increment = 0.00004;
        this.biasval = 0.001;
    }
    // Update boid's position based on velocity and acceleration
    update(canvasWidth, canvasHeight) {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        // Limit the speed
        const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > this.maxspeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxspeed;
            this.velocity.y = (this.velocity.y / speed) * this.maxspeed;
        }
        if (speed < this.minspeed) {
            this.velocity.x = (this.velocity.x / speed) * this.minspeed;
            this.velocity.y = (this.velocity.y / speed) * this.minspeed;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // Check for borders
        if (this.position.x < 50) {
            this.velocity.x += this.turnfactor;
        }
        if (this.position.x > canvasWidth - 50) {
            this.velocity.x -= this.turnfactor;
        }
        if (this.position.y > canvasHeight - 50) {
            this.velocity.y -= this.turnfactor;
        }
        if (this.position.y < 50) {
            this.velocity.y += this.turnfactor;
        }
        // Reset acceleration
        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }
    // Apply a steering force to the boid
    applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }
    // Draw the boid (for visualization purposes)
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    // Add logic for the boid to interact with other boids (flocking behavior)
    flock(boids) {
        this.alignment(boids);
        this.cohesion(boids);
        this.separation(boids);
    }
    // Separation: steer to avoid crowding local flockmates
    separation(boids) {
        let close = { dx: 0, dy: 0 };
        for (const other of boids) {
            const distance = Math.sqrt(Math.pow((this.position.x - other.position.x), 2) + Math.pow((this.position.y - other.position.y), 2));
            if (distance < this.protectedRange && distance > 0) {
                close.dx += this.position.x - other.position.x;
                close.dy += this.position.y - other.position.y;
            }
        }
        this.velocity.x += close.dx * this.avoidfactor;
        this.velocity.y += close.dy * this.avoidfactor;
    }
    // Alignment: steer to match the average heading of local flockmates
    alignment(boids) {
        let xvel_avg = 0;
        let yvel_avg = 0;
        let neighboring_boids = 0;
        for (const other of boids) {
            const distance = Math.sqrt(Math.pow((this.position.x - other.position.x), 2) + Math.pow((this.position.y - other.position.y), 2));
            if (distance < this.visualRange && distance > 0) {
                xvel_avg += other.velocity.x;
                yvel_avg += other.velocity.y;
                neighboring_boids++;
            }
        }
        if (neighboring_boids > 0) {
            xvel_avg /= neighboring_boids;
            yvel_avg /= neighboring_boids;
        }
        this.velocity.x += (xvel_avg - this.velocity.x) * this.matchingfactor;
        this.velocity.y += (yvel_avg - this.velocity.y) * this.matchingfactor;
    }
    // Cohesion: steer towards the average position of local flockmates
    cohesion(boids) {
        let xpos_avg = 0;
        let ypos_avg = 0;
        let neighboring_boids = 0;
        for (const other of boids) {
            const distance = Math.sqrt(Math.pow((this.position.x - other.position.x), 2) + Math.pow((this.position.y - other.position.y), 2));
            if (distance < this.visualRange && distance > 0) {
                xpos_avg += other.position.x;
                ypos_avg += other.position.y;
                neighboring_boids++;
            }
        }
        if (neighboring_boids > 0) {
            xpos_avg /= neighboring_boids;
            ypos_avg /= neighboring_boids;
        }
        this.velocity.x += (xpos_avg - this.position.x) * this.centeringfactor;
        this.velocity.y += (ypos_avg - this.position.y) * this.centeringfactor;
    }
}
