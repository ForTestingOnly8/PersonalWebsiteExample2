class Game {
    constructor() {
        this.score = 0;
        this.timeLeft = 20;
        this.gameActive = true;
        this.targets = [];
        this.targetContainer = document.getElementById('targets');
        this.scoreElement = document.getElementById('score-value');
        this.timerElement = document.getElementById('timer-value');
        this.crosshair = document.getElementById('crosshair');
        this.intervals = [];
        
        // Initialize sound effects
        this.sounds = {
            pop: new Audio('sounds/pop.mp3'),
            bomb: new Audio('sounds/bomb.mp3'),
            gameOver: new Audio('sounds/gameover.mp3')
        };
        
        this.init();
    }

    init() {
        // Initialize click event
        document.addEventListener('click', (e) => this.handleShot(e));
        
        // Add mouse movement tracking
        document.addEventListener('mousemove', (e) => this.updateCrosshair(e));
        
        // Start spawning targets and bombs
        this.spawnTarget();
        this.intervals.push(setInterval(() => this.spawnTarget(), 500));
        this.intervals.push(setInterval(() => this.spawnBomb(), 1500));
        
        // Start timer
        this.intervals.push(setInterval(() => this.updateTimer(), 1000));
    }

    updateTimer() {
        this.timeLeft--;
        this.timerElement.textContent = this.timeLeft;
        
        if (this.timeLeft <= 0) {
            this.sounds.gameOver.play(); // Play game over sound when time's up
            this.endGame('timeout');
        }
    }

    endGame(reason = 'timeout') {
        this.gameActive = false;
        // Clear all intervals
        this.intervals.forEach(interval => clearInterval(interval));
        
        // Remove all targets and bombs
        while (this.targetContainer.firstChild) {
            this.targetContainer.removeChild(this.targetContainer.firstChild);
        }
        
        // Show game over screen
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over').style.display = 'flex';
        document.getElementById('game-container').style.display = 'none';
    }

    updateCrosshair(event) {
        this.crosshair.style.left = `${event.clientX}px`;
        this.crosshair.style.top = `${event.clientY}px`;
    }

    handleShot(event) {
        if (!this.gameActive) return;
        
        const target = event.target;
        if (target.classList.contains('target')) {
            this.score += 1;
            this.scoreElement.textContent = this.score;
            this.sounds.pop.play(); // Play pop sound when hitting a target
            target.remove();
        } else if (target.classList.contains('bomb')) {
            this.sounds.bomb.play(); // Play bomb sound when hitting a bomb
            this.endGame('bomb');
        }
    }

    spawnTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        
        // Random position
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        
        this.targetContainer.appendChild(target);
        
        // Remove target after 3 seconds if not shot
        setTimeout(() => {
            if (target.parentNode) {
                target.remove();
            }
        }, 3000);
    }

    spawnBomb() {
        const bomb = document.createElement('div');
        bomb.classList.add('bomb');
        
        // Random position
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        bomb.style.left = `${randomX}px`;
        bomb.style.top = `${randomY}px`;
        
        this.targetContainer.appendChild(bomb);
        
        // Remove bomb after 3 seconds if not shot
        setTimeout(() => {
            if (bomb.parentNode) {
                bomb.remove();
            }
        }, 3000);
    }
}

// Start the game when the play button is clicked
document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('game-over').style.display = 'none';
    new Game();
});

// Add replay button functionality
document.getElementById('replay-button').addEventListener('click', () => {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    new Game();
}); 