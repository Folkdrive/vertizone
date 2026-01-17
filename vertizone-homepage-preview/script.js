// Main JavaScript for Three Designs
document.addEventListener('DOMContentLoaded', function() {
    // Design Toggle
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const body = document.body;
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const design = this.getAttribute('data-design');
            
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update body class
            body.className = '';
            body.classList.add(`design-${design}`);
            
            // Update CSS variables
            updateDesignVariables(design);
            
            // Initialize design-specific animations
            initDesignAnimations(design);
        });
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Initialize first design
    updateDesignVariables('1');
    initDesignAnimations('1');
    
    // Initialize 3D visualization for cyber design
    if (body.classList.contains('design-3')) {
        initCyberVisualization();
    }
    
    // Animate stats
    animateStats();
    
    // Parallax effects
    initParallax();
});

function updateDesignVariables(design) {
    const root = document.documentElement;
    const schemes = {
        '1': {
            'primary': '#1b5e20',
            'secondary': '#0d47a1',
            'accent': '#ff6f00'
        },
        '2': {
            'primary': '#047857',
            'secondary': '#7c3aed',
            'accent': '#d97706'
        },
        '3': {
            'primary': '#00ffff',
            'secondary': '#ff00ff',
            'accent': '#ffff00'
        }
    };
    
    const scheme = schemes[design];
    if (scheme) {
        Object.entries(scheme).forEach(([key, value]) => {
            root.style.setProperty(`--design-${design}-${key}`, value);
        });
    }
}

function initDesignAnimations(design) {
    // Stop all previous animations
    cancelAnimationFrame(window.animationId);
    
    // Design-specific initializations
    switch(design) {
        case '1':
            initGridAnimations();
            break;
        case '2':
            initDashboardAnimations();
            break;
        case '3':
            initCyberAnimations();
            initCyberVisualization();
            break;
    }
    
    // Common animations
    animateServiceCards();
    animateTechItems();
}

// Design 1: Grid Animations
function initGridAnimations() {
    const nodes = document.querySelectorAll('.grid-node');
    const streams = document.querySelectorAll('.data-stream');
    
    nodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.3}s`;
        node.classList.add('animate-in');
    });
    
    streams.forEach((stream, index) => {
        stream.style.animationDelay = `${index * 0.5}s`;
        stream.classList.add('animate-in');
    });
}

// Design 2: Dashboard Animations
function initDashboardAnimations() {
    const bars = document.querySelectorAll('.chart-bar');
    const metrics = document.querySelectorAll('.metric');
    
    bars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.2}s`;
        bar.classList.add('animate-in');
    });
    
    metrics.forEach((metric, index) => {
        metric.style.animationDelay = `${index * 0.3}s`;
        metric.classList.add('animate-in');
    });
}

// Design 3: Cyber Animations
function initCyberAnimations() {
    // Create particle system
    createParticles();
    
    // Animate neural network
    const neurons = document.querySelectorAll('.neuron');
    const synapses = document.querySelectorAll('.synapse');
    
    neurons.forEach((neuron, index) => {
        neuron.style.setProperty('--i', index);
        neuron.classList.add('animate-in');
    });
    
    synapses.forEach((synapse, index) => {
        synapse.style.animationDelay = `${index * 0.5}s`;
        synapse.classList.add('animate-in');
    });
}

// 3D Cyber Visualization
function initCyberVisualization() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas || !THREE) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff00ff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create data nodes
    const nodes = [];
    const nodeCount = 8;
    
    for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshPhongMaterial({ 
            color: i % 2 === 0 ? 0x00ffff : 0xff00ff,
            emissive: i % 2 === 0 ? 0x00ffff : 0xff00ff,
            emissiveIntensity: 0.2,
            shininess: 100
        });
        
        const node = new THREE.Mesh(geometry, material);
        
        // Position in a sphere
        const radius = 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        node.position.x = radius * Math.sin(phi) * Math.cos(theta);
        node.position.y = radius * Math.sin(phi) * Math.sin(theta);
        node.position.z = radius * Math.cos(phi);
        
        scene.add(node);
        nodes.push(node);
    }
    
    // Create connections
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.6) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[i].position,
                    nodes[j].position
                ]);
                
                const material = new THREE.LineBasicMaterial({ 
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.3
                });
                
                const connection = new THREE.Line(geometry, material);
                scene.add(connection);
                connections.push({
                    line: connection,
                    start: nodes[i],
                    end: nodes[j]
                });
            }
        }
    }
    
    camera.position.z = 5;
    
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Animation
    function animate() {
        window.animationId = requestAnimationFrame(animate);
        
        // Rotate nodes
        nodes.forEach((node, i) => {
            node.rotation.x += 0.01;
            node.rotation.y += 0.01;
            
            // Gentle floating motion
            node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
        
        // Update connections
        connections.forEach(conn => {
            const positions = conn.line.geometry.attributes.position.array;
            positions[0] = conn.start.position.x;
            positions[1] = conn.start.position.y;
            positions[2] = conn.start.position.z;
            positions[3] = conn.end.position.x;
            positions[4] = conn.end.position.y;
            positions[5] = conn.end.position.z;
            conn.line.geometry.attributes.position.needsUpdate = true;
        });
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Start animation
    animate();
}

// Particle System
function createParticles() {
    const particleLayer = document.querySelector('.particle-system');
    if (!particleLayer) return;
    
    // Clear existing particles
    particleLayer.innerHTML = '';
    
    const layers = ['layer-1', 'layer-2', 'layer-3'];
    
    layers.forEach((layerClass, layerIndex) => {
        const layer = document.createElement('div');
        layer.className = `particle-layer ${layerClass}`;
        
        const particleCount = 20 + layerIndex * 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cyber-particle';
            
            const size = 1 + Math.random() * 3;
            const duration = 5 + Math.random() * 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${layerIndex === 0 ? '#00ffff' : layerIndex === 1 ? '#ff00ff' : '#ffff00'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${0.2 + Math.random() * 0.3};
                animation: floatParticle ${duration}s linear ${delay}s infinite;
                filter: blur(${size / 2}px);
            `;
            
            layer.appendChild(particle);
        }
        
        particleLayer.appendChild(layer);
    });
    
    // Add CSS for particle animation
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.5;
                }
                90% {
                    opacity: 0.5;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, -100vh) scale(0);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
                opacity: 0;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate Statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseFloat(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.round(current) + (stat.textContent.includes('%') ? '%' : '');
                }, 30);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Animate Service Cards
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card, .elegant-service, .cyber-service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Animate Tech Items
function animateTechItems() {
    const items = document.querySelectorAll('.tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.grid-visualization, .elegant-background, .particle-system');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('grid-visualization') ? 0.5 :
                         element.classList.contains('elegant-background') ? 0.3 : 0.7;
            
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Initialize on load
window.addEventListener('load', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-initial').forEach(el => {
            el.classList.add('animate-in');
        });
    }, 500);
});