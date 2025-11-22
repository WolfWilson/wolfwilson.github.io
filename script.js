const config = {
    selectors: {
        xPos: 'xPos',
        yPos: 'yPos',
        random1: 'random1',
        random2: 'random2',
        random3: 'random3',
    },
    data: {
        starsCount: 80
    }
};

const log = {
    init() {
        this.xPos = document.getElementById(config.selectors.xPos);
        this.yPos = document.getElementById(config.selectors.yPos);
        this.random1 = document.getElementById(config.selectors.random1);
        this.random2 = document.getElementById(config.selectors.random2);
        this.random3 = document.getElementById(config.selectors.random3);
    },
    update(element, data) {
        if (element) element.innerText = data;
    },
};

const setRandom = {
    setRandomNumber1(interval) {
        setInterval(() => {
            let number = Math.random().toFixed(3);
            document.body.style.setProperty("--random1", number);
            log.update(log.random1, number);
        }, interval);
    },

    setRandomNumber2(interval) {
        setInterval(() => {
            let number = Math.random().toFixed(3);
            document.body.style.setProperty("--random2", number);
            log.update(log.random2, number);
        }, interval);
    },

    setRandomNumber3(interval) {
        setInterval(() => {
            let number = Math.random().toFixed(3);
            document.body.style.setProperty("--random3", number);
            log.update(log.random3, number);
        }, interval);
    },

    init() {
        this.setRandomNumber1(200);
        this.setRandomNumber2(1000);
        this.setRandomNumber3(10000);
    },
};

const mouseMove = {
    state: {
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0
    },
    config: {
        lerpFactor: 0.1
    },

    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    update() {
        // Interpolate current values towards target values
        this.state.currentX = this.lerp(this.state.currentX, this.state.targetX, this.config.lerpFactor);
        this.state.currentY = this.lerp(this.state.currentY, this.state.targetY, this.config.lerpFactor);

        // Apply to CSS variables
        document.body.style.setProperty("--mouseX", this.state.currentX.toFixed(4));
        document.body.style.setProperty("--mouseY", this.state.currentY.toFixed(4));

        // Update debug log
        log.update(log.xPos, this.state.currentX.toFixed(2));
        log.update(log.yPos, this.state.currentY.toFixed(2));

        requestAnimationFrame(this.update.bind(this));
    },

    init() {
        // Mouse move handler
        document.addEventListener("mousemove", (e) => {
            let wh = window.innerHeight / 2,
                ww = window.innerWidth / 2;

            this.state.targetX = (e.clientX - ww) / 100;
            this.state.targetY = -((e.clientY - wh) / 100);
        });

        // Mouse leave handler - return to center
        document.addEventListener("mouseleave", () => {
            this.state.targetX = 0;
            this.state.targetY = 0;
        });

        // Start the animation loop
        this.update();
    }
};

const starsGenerator = {
    generateBoxShadow(number) {
        let value = '';
        for (let i = 0; i < number; i++) {
            // Random position between -50vw/vh and 50vw/vh to center it
            const x = Math.floor(Math.random() * 100) - 50;
            const y = Math.floor(Math.random() * 100) - 50;
            value += `${x}vw ${y}vh white`;
            if (i < number - 1) value += ', ';
        }
        return value;
    },

    init() {
        const shadow = this.generateBoxShadow(config.data.starsCount);

        // Inject style rule for stars
        const style = document.createElement('style');
        style.innerHTML = `
            .stars::before, .stars::after {
                box-shadow: ${shadow};
            }
        `;
        document.head.appendChild(style);
    }
};

const noiseGenerator = {
    generateNoiseColors() {
        // Generate a string like: transparent, #fff, transparent, transparent, #fff
        let colors = [];
        for (let i = 0; i < 5; i++) {
            colors.push(Math.random() > 0.5 ? '#fff' : 'transparent');
        }
        return colors.join(', ');
    },

    generateNoiseBackground(number) {
        let value = '';
        for (let i = 0; i < number; i++) {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            const colors = this.generateNoiseColors();
            value += `linear-gradient(90deg, transparent, ${colors}, transparent) ${x}% ${y}% / ${Math.random() * 50}% 1px no-repeat`;
            if (i < number - 1) value += ', ';
        }
        return value;
    },

    init() {
        const noiseBg = this.generateNoiseBackground(6);
        const style = document.createElement('style');
        style.innerHTML = `
            .noise-white {
                background: ${noiseBg};
            }
        `;
        document.head.appendChild(style);
    }
};

const loginHandler = {
    init() {
        const form = document.getElementById('loginForm');
        const status = document.querySelector('.status-line');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            status.innerText = "AUTHENTICATING...";
            status.style.color = "var(--pink)";
            status.style.textShadow = "0 0 5px var(--pink)";

            const btn = form.querySelector('button');
            btn.innerHTML = "<span>ACCESS GRANTED</span>";
            btn.style.background = "var(--pink)";
            btn.style.borderColor = "var(--pink)";

            setTimeout(() => {
                // Simulate redirect or success
                status.innerText = "WELCOME TO THE DIMENSION";
                document.body.style.animation = "saturate 0.5s linear infinite";
            }, 1500);
        });
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    log.init();
    setRandom.init();
    mouseMove.init();
    starsGenerator.init();
    noiseGenerator.init();
    loginHandler.init();
});
