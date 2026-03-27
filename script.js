// Navegação entre categorias
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Remove active de todos os botões
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adiciona active ao botão clicado
        this.classList.add('active');
        
        // Remove active de todas as seções
        document.querySelectorAll('.category-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Adiciona active à seção correspondente
        document.getElementById(category).classList.add('active');
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Funcionalidade de busca
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function() {
    const searchValue = searchInput.value.toLowerCase();
    
    if (searchValue.trim() === '') {
        alert('Digite algo para buscar!');
        return;
    }
    
    // Busca em nomes de restaurantes
    let found = false;
    document.querySelectorAll('.product-card h3').forEach(title => {
        if (title.textContent.toLowerCase().includes(searchValue)) {
            found = true;
            title.parentElement.parentElement.style.opacity = '1';
            title.parentElement.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                title.parentElement.parentElement.style.opacity = '1';
                title.parentElement.parentElement.style.transform = 'scale(1)';
            }, 600);
        }
    });
    
    if (!found) {
        alert('Nenhum restaurante encontrado com esse nome! 😢');
    }
});

// Busca também com Enter
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Botões de pedido
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cardTitle = this.closest('.product-card') || this.closest('.docinho-card');
        const restaurantName = cardTitle.querySelector('h3').textContent;
        
        // Animação de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Mensagem dinâmica
        if (restaurantName.includes('Docinho') || restaurantName.includes('Seu')) {
            showNotification(`Chamando seu docinho... 😘 Ele vai amar!`, 'heart');
            // Easter egg para seu docinho
            createHearts();
        } else {
            showNotification(`Pedido adicionado! Aproveite seu prato de ${restaurantName} 🤤`, 'food');
        }
    });
});

// Notificações personalizadas
function showNotification(message, type = 'food') {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove após 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Estilos para notificações
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        font-weight: 700;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px) translateX(30px);
        transition: all 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0) translateX(0);
    }
    
    .notification-food {
        border-left: 4px solid #ea1b1b;
        color: #ea1b1b;
    }
    
    .notification-heart {
        border-left: 4px solid #ff1493;
        color: #ff1493;
        background: linear-gradient(135deg, #fff0f5, #ffe0ec);
    }
    
    @media (max-width: 480px) {
        .notification {
            bottom: 20px;
            right: 20px;
            left: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// Easter egg - corações animados para "seu docinho"
function createHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = -30 + 'px';
            document.body.appendChild(heart);
            
            // Animação
            const duration = 3000;
            const startTime = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    heart.style.top = (-30 + window.innerHeight * progress) + 'px';
                    heart.style.opacity = 1 - progress;
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }, i * 100);
    }
}

// Estilos para corações flutuantes
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    .floating-heart {
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 999;
        user-select: none;
    }
`;
document.head.appendChild(heartStyle);

// Suporte a cliques nos cards (efeito visual)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.overflow = 'hidden';
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Inicializar - mostrar primeira categoria
document.addEventListener('DOMContentLoaded', function() {
    // Já vem com Sushi ativo por padrão
    
    // Adiciona algumas animações extras
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.05) + 's';
    });
});

// Função para animar números (se houver contadores)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Hover effects para mobile
if (window.innerWidth < 768) {
    document.querySelectorAll('.btn-order').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.background = 'linear-gradient(135deg, #ff5555, #ea1b1b)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.background = '';
        });
    });
}

// Detectar orientação
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 300);
});

// Log de inicialização
console.log('🍽️ FoodHub carregado com sucesso!');
console.log('💡 Dica: Clique em "seu docinho" para a surpresa 😘');
