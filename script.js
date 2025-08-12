const categoryBtns = document.querySelectorAll('.category-btn[data-category]');
const categoryContents = document.querySelectorAll('.category-content');

function switchCategory(targetCategory) {
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    categoryContents.forEach(content => content.classList.remove('active'));

    const targetBtn = document.querySelector(`[data-category="${targetCategory}"]`);
    const targetContent = document.getElementById(targetCategory);

    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');

    const cards = targetContent.querySelectorAll('.game-card, .social-btn');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `slideUp 0.6s ease forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        }, 10);
    });
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        switchCategory(category);
    });
});

document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCategory = item.dataset.target;
        if (targetCategory) {
            switchCategory(targetCategory);
        }
    });

    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

function checkImageLoad(imgElement) {
    const img = new Image();
    img.onload = function() {
        imgElement.classList.add('has-image');
    };
    img.onerror = function() {
        imgElement.classList.remove('has-image');
    };
    
    const style = getComputedStyle(imgElement).backgroundImage;
    if (style && style.includes('url(')) {
        img.src = style.slice(5, -2).replace(/"/g, '');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutAvatar = document.querySelector('.about-avatar');
    
    if (aboutAvatar) {
        checkImageLoad(aboutAvatar);
    }

    // Language logic
    const langToggleBtn = document.querySelector('.language-toggle-btn');
    const langDropdownContainer = document.querySelector('.language-dropdown-container');
    const langOptions = document.querySelectorAll('.language-dropdown-content a');

    const translations = {
        'ru': {
            'langButton': '🗨️Язык',
            'aboutStudioTitle': '📋 О СТУДИИ:',
            'aboutStudioText': 'Мы - NDKLab, команда увлеченных разработчиков, создающая новые миры и незабываемые игровые впечатления.',
            'gamesCategory': '🎮 Наши Игры',
            'socialCategory': '👥 Социальные сети',
            'game1Title': 'Игра: Utopia',
            'game1Description': 'Utopia — это кооперативная хоррор-игра, где вы и ваши друзья попадаете в опасный мир, полный загадок, ловушек и существ, скрывающихся в тени. Карты и события меняются каждую игру, делая каждый матч уникальным. Взаимодействуйте, спасайте друг друга и принимайте быстрые решения, чтобы остаться в живых.',
            'game2Title': 'Забытое Царство',
            'game2Description': 'Исследуйте огромный фэнтезийный мир, полный мифических существ и древних тайн. RPG-опыт, не похожий ни на что другое!',
            'steamButton': 'В Steam',
        },
       
        'en': {
            'langButton': '🗨️Language',
            'aboutStudioTitle': '📋 ABOUT THE STUDIO:',
            'aboutStudioText': 'We are NDKLab, a passionate team of developers dedicated to creating new worlds and unforgettable gaming experiences.',
            'gamesCategory': '🎮 Наши Игры',
            'socialCategory': '👥 Социальные сети',
            'game1Title': 'Game: Utopia',
            'game1Description': 'Utopia is a co-op horror game where you and your friends are trapped in a dangerous world filled with mysteries, traps, and lurking creatures. Maps and events change every match, making each run unique. Work together, save each other, and make quick decisions to survive.',
            'game2Title': 'Forgotten Realm',
            'game2Description': 'Explore a vast fantasy world, filled with mythical creatures and ancient secrets. An RPG experience like no other!',
            'steamButton': 'View on Steam',
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        if (langToggleBtn && translations[lang] && translations[lang]['langButton']) {
            langToggleBtn.textContent = translations[lang]['langButton'];
        }
        localStorage.setItem('lang', lang);
    }

    const storedLang = localStorage.getItem('lang') || 'en';
    setLanguage(storedLang);

    langToggleBtn.addEventListener('click', (event) => {
        langDropdownContainer.classList.toggle('active');
        event.stopPropagation();
    });

    langOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = option.dataset.lang;
            setLanguage(selectedLang);
            langDropdownContainer.classList.remove('active');
        });
    });

    window.addEventListener('click', (event) => {
        if (!langDropdownContainer.contains(event.target)) {
            langDropdownContainer.classList.remove('active');
        }
    });

    switchCategory('games');

});
