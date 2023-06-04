import { Game } from './Game';
import './style.css';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 340;

new Game(context, canvas.width, canvas.height);
