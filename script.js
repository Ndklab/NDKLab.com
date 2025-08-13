document.addEventListener('DOMContentLoaded', function() {
    // Category switching
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    function switchCategory(category) {
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        categoryContents.forEach(content => content.classList.remove('active'));

        document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
        document.getElementById(category).classList.add('active');
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchCategory(category);
        });
    });

    // Video functionality with immediate playback on hover
    const mediaContainers = document.querySelectorAll('.game-media-container');
    
    mediaContainers.forEach(container => {
        const video = container.querySelector('.game-video');
        const playButton = container.querySelector('.play-button');
        
        if (video) {
            video.load();
            video.muted = false; // Sound enabled by default
            video.preload = "auto"; // Предзагрузка видео
        }

        // Immediate playback on hover
        container.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0; // Перематываем в начало
                video.play().catch(e => console.log("Video play error:", e));
                playButton.style.opacity = '1'; // Показываем кнопку сразу
            }
        });

        container.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
                playButton.style.opacity = '0'; // Скрываем кнопку
            }
        });

        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video) {
                    video.play().catch(e => console.log("Video play error:", e));
                    video.controls = true;
                }
            });
        }
    });

    // Остальной код (переводы и т.д.) остается без изменений
    // Language switching
    const translations = {
        'ru': {
            'langButton': 'RU',
            'aboutTitle': 'О СТУДИИ:',
            'aboutText': 'Мы - NDKLab, команда увлеченных разработчиков, создающая новые миры и незабываемые игровые впечатления.',
            'gamesBtn': 'Наши игры',
            'socialBtn': 'Социальные сети',
            'gameTitle': 'Utopia',
            'gameDesc': 'Кооперативная хоррор-игра, где вы и ваши друзья попадаете в опасный мир, полный загадок и ловушек.',
            'steamBtn': 'Steam',
            'discord': 'Дискорд',
            'telegram': 'Телеграм',
            'youtube': 'Ютуб',
            'instagram': 'Инстаграм',
            'subtitle': 'Сайт студии NDKLab'
        },
        'en': {
            'langButton': 'EN',
            'aboutTitle': 'ABOUT US:',
            'aboutText': 'We are NDKLab, a passionate team of developers creating new worlds and unforgettable gaming experiences.',
            'gamesBtn': 'Our Games',
            'socialBtn': 'Social Networks',
            'gameTitle': 'Utopia',
            'gameDesc': 'A co-op horror game where you and your friends must survive in a dangerous world full of mysteries and traps.',
            'steamBtn': 'Steam',
            'discord': 'Discord',
            'telegram': 'Telegram',
            'youtube': 'YouTube',
            'instagram': 'Instagram',
            'subtitle': 'NDKLab studio website'
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        const subtitle = document.querySelector('.subtitle');
        if (subtitle && translations[lang] && translations[lang]['subtitle']) {
            subtitle.textContent = translations[lang]['subtitle'];
        }
        localStorage.setItem('lang', lang);
    }

    const langToggleBtn = document.querySelector('.language-toggle-btn');
    const langDropdownContainer = document.querySelector('.language-dropdown-container');
    const langOptions = document.querySelectorAll('.language-dropdown-content a');

    const savedLang = localStorage.getItem('lang') || 'ru';
    setLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdownContainer.classList.toggle('active');
        });
    }

    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            setLanguage(lang);
            langDropdownContainer.classList.remove('active');
        });
    });

    document.addEventListener('click', function() {
        langDropdownContainer.classList.remove('active');
    });

    langDropdownContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
