import { EntityManager } from "../entities/entityManager.js";
import { PositionComponent } from "../components/cmp_position.js";
import { DrawComponent } from "../components/cmp_draw.js";

export class DrawSystem {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    update(entityManager: EntityManager) {
        const entities = entityManager.getEntities();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        entities.forEach((components, entityId) => {
            const position = components.get('Position') as ReturnType<typeof PositionComponent>;
            const draw = components.get('Draw') as ReturnType<typeof DrawComponent>;
            const velocity = components.get('Velocity') as ReturnType<typeof PositionComponent>;

            if (position && draw && velocity) {
                this.context.fillStyle = draw.color;
                this.context.beginPath();
                if (draw.shape === 'circle') {
                    this.context.arc(position.x, position.y, draw.size, 0, Math.PI * 2);
                } else if (draw.shape === 'square') {
                    this.context.rect(position.x - draw.size / 2, position.y - draw.size / 2, draw.size, draw.size);
                } else if (draw.shape === 'triangle') {
                    const angle = Math.atan2(velocity.y, velocity.x);

                    this.context.save();
                    this.context.translate(position.x, position.y);
                    this.context.rotate(angle);
                    this.context.beginPath();
                    this.context.moveTo(0, -draw.size );
                    this.context.lineTo(-draw.size , draw.size );
                    this.context.lineTo(draw.size*2, draw.size );
                    this.context.closePath();
                    this.context.restore();
                }
                this.context.fill();
            }
        });
    }
}