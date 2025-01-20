// src/index.ts

import { startSimulation } from './simulation.js';

const canvas = document.createElement('canvas');
canvas.id = 'flockCanvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

if (ctx) {
    startSimulation(ctx);
} else {
    console.error('Failed to get canvas context.');
}
