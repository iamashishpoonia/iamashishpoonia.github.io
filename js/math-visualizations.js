/**
 * Mathematics Visualizations
 * This file contains code for mathematical visualizations and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if visualization container exists
    const visContainer = document.getElementById('math-visualization');
    if (!visContainer) return;
    
    // Simple animated fractal pattern for homepage
    function drawFractal() {
        const canvas = document.createElement('canvas');
        canvas.width = visContainer.offsetWidth;
        canvas.height = 300;
        visContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Animation properties
        let time = 0;
        const colors = [
            '#3498db', '#2980b9', '#1abc9c', '#16a085', '#9b59b6'
        ];
        
        function animate() {
            time += 0.01;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw fractal
            drawSierpinskiTriangle(centerX, 50, 280, 6 + 2 * Math.sin(time/2), time);
            
            requestAnimationFrame(animate);
        }
        
        function drawSierpinskiTriangle(x, y, size, depth, time) {
            if (depth <= 0) return;
            
            // Calculate vertices of triangle
            const h = size * Math.sqrt(3) / 2;
            const x1 = x;
            const y1 = y;
            const x2 = x - size / 2;
            const y2 = y + h;
            const x3 = x + size / 2;
            const y3 = y + h;
            
            // Draw triangle
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            
            // Apply breathing effect with slight color variation
            const breathEffect = 0.5 + 0.5 * Math.sin(time + depth);
            const colorIndex = Math.floor(depth % colors.length);
            
            ctx.fillStyle = colors[colorIndex] + Math.floor(breathEffect * 99).toString(16).padStart(2, '0');
            ctx.fill();
            
            // Recursively draw smaller triangles
            const newSize = size / 2;
            drawSierpinskiTriangle(x, y, newSize, depth - 1, time);
            drawSierpinskiTriangle((x + x2) / 2, (y + y2) / 2, newSize, depth - 1, time);
            drawSierpinskiTriangle((x + x3) / 2, (y + y3) / 2, newSize, depth - 1, time);
        }
        
        // Start animation
        animate();
    }
    
    // Function to render TeX/LaTeX equations using MathJax
    function renderMathEquations() {
        if (window.MathJax) {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        }
    }
    
    // Initialize visualizations based on page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === '' || currentPage === 'index.html') {
        // Home page
        drawFractal();
    } else if (currentPage === 'research.html') {
        // Research page
        renderMathEquations();
    }
});
