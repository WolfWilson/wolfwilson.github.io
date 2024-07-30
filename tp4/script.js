document.getElementById('translate-button').addEventListener('click', () => {
    const translateButton = document.getElementById('translate-button');
    const lines = document.querySelectorAll('.line');
    const originalText = [
        "The wolves are at your door dressed like sheep",
        "Trying hard to hide the blood, to hide the blood from the crowd",
        "They are trying to sell slavery as a dream to chase",
        "Driven by fear consumer wars",
        "No way to see their hoax",
        "They are listening",
        "They are watching",
        "They wanna know what we do",
        "They are faking our freedom",
        "Hoping we believe it's true",
        "The world is full of snakes whispering in your ear",
        "A stream of seducing words from a cloven tongue",
        "They are trying to sell slavery as a dream to chase",
        "Driven by fear consumer wars",
        "No way to see their hoax",
        "Fences at the border dividing the world in two",
        "Have-nots feed the have-lots obeying the market rules",
        "The rats are spreading plague, no stopping the disease",
        "Their rotten dirty bite infecting the whole world",
        "They are trying to sell slavery as a dream to chase",
        "Driven by fear consumer wars",
        "No way to see their hoax"
    ];
    const translations = [
        "Los lobos están en tu puerta disfrazados de ovejas",
        "Esforzándose por ocultar la sangre, ocultar la sangre de la multitud",
        "Están tratando de vender la esclavitud como un sueño a perseguir",
        "Conducidos por miedo, consumidor de guerras",
        "No hay manera de ver su engaño",
        "Están escuchando",
        "Están mirando",
        "Quieren saber qué hacemos",
        "Están fingiendo nuestra libertad",
        "Esperando que creamos que es verdad",
        "El mundo está lleno de serpientes susurrando en tu oído",
        "Un flujo de palabras seductoras de una lengua hendida",
        "Están tratando de vender la esclavitud como un sueño a perseguir",
        "Conducidos por miedo, consumidor de guerras",
        "No hay manera de ver su engaño",
        "Vallas en la frontera dividiendo el mundo en dos",
        "Los que poco tienen alimentan a los que tienen mucho obedeciendo las reglas del mercado",
        "Las ratas están propagando la plaga, no deteniendo la enfermedad",
        "Su mordida podrida y sucia infectando el mundo entero",
        "Están tratando de vender la esclavitud como un sueño a perseguir",
        "Impulsados por guerras de consumidores de miedo",
        "No hay manera de ver su engaño"
    ];

    const isTranslation = translateButton.textContent === 'Traducir';

    const textToUse = isTranslation ? translations : originalText;
    const newButtonText = isTranslation ? 'Ver Original' : 'Traducir';

    const fadeAndChangeText = (index) => {
        if (index >= lines.length) {
            translateButton.textContent = newButtonText;
            return;
        }

        lines[index].style.opacity = 0;

        setTimeout(() => {
            lines[index].textContent = textToUse[index];
            lines[index].style.color = isTranslation ? 'white' : '#e0d77e'; // Esta línea
            lines[index].style.fontStyle = isTranslation ? 'normal' : 'normal';
            lines[index].style.fontWeight = 'bold';
            lines[index].style.opacity = 1;

            setTimeout(() => fadeAndChangeText(index + 1), 150);
        }, 150);
    };

    fadeAndChangeText(0);
});
