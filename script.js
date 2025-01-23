const messages = {
    'message1': '¡Hola mi amor! 💖',
    'message2': 'ES TU PUMPE :D 🎉',
    'message3': 'Escribiendo mensaje...',
    'message4': 'Eso es lo que estaba por hacer pero tu mereces algo único y especial.\nPorque eres demasiado especial para mí preciosa.'
};

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💝'][Math.floor(Math.random() * 0)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    document.querySelector('.background-hearts').appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(confetti);
    
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
        createSparkle(e.pageX, e.pageY);
    }
});

async function typeWriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        element.classList.add('active');
        element.querySelector('.text').innerHTML = '';
        
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    element.querySelector('.text').innerHTML += '<br>';
                } else {
                    element.querySelector('.text').innerHTML += char;
                    if (Math.random() < 0.2) {
                        createSparkle(
                            element.offsetLeft + Math.random() * element.offsetWidth,
                            element.offsetTop + Math.random() * element.offsetHeight
                        );
                    }
                }
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.classList.remove('active');
                    resolve();
                }, 2000);
            }
        }
        
        type();
    });
}

async function startAnimation() {
    setInterval(createHeart, 150);
    setInterval(createConfetti, 200);

    const elements = ['message1', 'message2', 'message3', 'message4'];
    
    for (let id of elements) {
        const element = document.getElementById(id);
        await typeWriter(element, messages[id]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('finalMessage').classList.add('show');
}

window.onload = startAnimation;