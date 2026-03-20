function generateColor() {
    const hexChars = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexChars.length);
        color += hexChars[randomIndex];
    }
    return color;
}


function updateColors() {
    const colors = document.querySelectorAll('.color');
    colors.forEach((color) => {
        const newColor = generateColor();
        color.style.backgroundColor = `${newColor}`;
    });
}
document.getElementById('generateColors').addEventListener('click', updateColors);  
