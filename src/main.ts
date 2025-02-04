import { EntityManager } from './entities/entityManager.js';
import { BoidEntity } from './entities/ent_boid.js';
import { BoidSystem } from './systems/sys_boid.js';
import { MovementSystem } from './systems/sys_movement.js';
import { DrawSystem } from './systems/sys_draw.js';

let entityManager : EntityManager;
let boidSystem : BoidSystem;
let movementSystem : MovementSystem;
let drawSystem : DrawSystem;

let canvaswidth : number;
let canvasheight : number;

function init(context : CanvasRenderingContext2D,num : number) {
    entityManager = new EntityManager();
    boidSystem = new BoidSystem(entityManager);
    movementSystem = new MovementSystem();
    drawSystem = new DrawSystem(context);

    canvaswidth = context.canvas.width;
    canvasheight = context.canvas.height;

    for (let i = 0; i < num; i++) {
        const boidEntity = new BoidEntity(entityManager, Math.random() * canvaswidth, Math.random() * canvasheight);
    }
}

function gameLoop() {
    boidSystem.update();
    movementSystem.update(entityManager, canvaswidth, canvasheight);
    drawSystem.update(entityManager);
    requestAnimationFrame(gameLoop);
}

export { init, gameLoop };