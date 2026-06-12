// Função para fazer os olhos acompanharem o mouse
document.addEventListener('mousemove', (e) => {
    updateEyePosition(e.clientX, e.clientY);
});

// Função para fazer os olhos acompanharem o toque (para dispositivos móveis)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        updateEyePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
});

function updateEyePosition(mouseX, mouseY) {
    const eyes = document.querySelectorAll('.eye-group');
    
    eyes.forEach((eye) => {
        // Pegar a posição SVG do olho
        const eyeCircle = eye.querySelector('ellipse');
        const pupil = eye.querySelector('.pupil');
        const pupilShine = eye.querySelector('.pupil-shine');
        
        // Pegar as coordenadas do olho em relação ao SVG
        const svg = document.querySelector('.monalisa-svg');
        const svgRect = svg.getBoundingClientRect();
        
        // Converter coordenadas do viewport para coordenadas SVG
        const svgX = (mouseX - svgRect.left) / svgRect.width * 400;
        const svgY = (mouseY - svgRect.top) / svgRect.height * 500;
        
        // Pegar a posição do centro do olho
        const eyeCx = parseFloat(eyeCircle.getAttribute('cx'));
        const eyeCy = parseFloat(eyeCircle.getAttribute('cy'));
        
        // Calcular o ângulo entre o olho e o mouse
        const angleRadians = Math.atan2(svgY - eyeCy, svgX - eyeCx);
        
        // Raio máximo de movimento da pupila (em pixels SVG)
        const maxRadius = 6;
        
        // Calcular a nova posição da pupila
        const newPupilX = eyeCx + Math.cos(angleRadians) * maxRadius;
        const newPupilY = eyeCy + Math.sin(angleRadians) * maxRadius;
        
        // Atualizar posição da pupila com animação suave
        pupil.setAttribute('cx', newPupilX);
        pupil.setAttribute('cy', newPupilY);
        
        // Atualizar posição do brilho da pupila
        const shineOffsetX = Math.cos(angleRadians) * 2;
        const shineOffsetY = Math.sin(angleRadians) * 2;
        pupilShine.setAttribute('cx', newPupilX + shineOffsetX);
        pupilShine.setAttribute('cy', newPupilY + shineOffsetY);
    });
}

// Inicializar posição dos olhos quando a página carrega
window.addEventListener('load', () => {
    // Colocar os olhos na posição inicial (levemente para baixo)
    const eyes = document.querySelectorAll('.eye-group');
    eyes.forEach((eye) => {
        const eyeCircle = eye.querySelector('ellipse');
        const pupil = eye.querySelector('.pupil');
        const pupilShine = eye.querySelector('.pupil-shine');
        
        const eyeCx = parseFloat(eyeCircle.getAttribute('cx'));
        const eyeCy = parseFloat(eyeCircle.getAttribute('cy'));
        
        pupil.setAttribute('cx', eyeCx);
        pupil.setAttribute('cy', eyeCy + 5);
        
        pupilShine.setAttribute('cx', eyeCx + 2);
        pupilShine.setAttribute('cy', eyeCy + 2);
    });
    
    console.log('✨ Monalisa carregada! Mova o mouse para ver os olhos acompanharem.');
});

// Efeito adicional: adicionar classe quando o mouse está sobre o SVG
const svg = document.querySelector('.monalisa-svg');

svg.addEventListener('mouseenter', () => {
    svg.style.filter = 'drop-shadow(0 5px 20px rgba(0, 0, 0, 0.3))';
});

svg.addEventListener('mouseleave', () => {
    svg.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))';
});

// Função para resetar os olhos quando o mouse sai da página
document.addEventListener('mouseleave', () => {
    const eyes = document.querySelectorAll('.eye-group');
    eyes.forEach((eye) => {
        const eyeCircle = eye.querySelector('ellipse');
        const pupil = eye.querySelector('.pupil');
        const pupilShine = eye.querySelector('.pupil-shine');
        
        const eyeCx = parseFloat(eyeCircle.getAttribute('cx'));
        const eyeCy = parseFloat(eyeCircle.getAttribute('cy'));
        
        // Animar de volta para a posição inicial
        pupil.setAttribute('cx', eyeCx);
        pupil.setAttribute('cy', eyeCy + 5);
        
        pupilShine.setAttribute('cx', eyeCx + 2);
        pupilShine.setAttribute('cy', eyeCy + 2);
    });
});

// Adicionar suporte a teclado para acessibilidade
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Resetar os olhos com ESC
        updateEyePosition(window.innerWidth / 2, window.innerHeight / 2);
    }
});
