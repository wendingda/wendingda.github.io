let isMobileScrollEnabled = false;

// Функция для включения прокрутки
function enableMobileScroll() {
    if (window.innerWidth > 640) return;
    isMobileScrollEnabled = true;
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    document.body.style.position = 'relative';
    document.body.style['-webkit-overflow-scrolling'] = 'touch';
}

// Debounce для ограничения частоты вызовов
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Обновление контента
function updateContent() {
    const dynamicContent = document.getElementById('dynamic-content');
    if (!dynamicContent) return;

    const isDesktop = window.innerWidth > 640;
    const isAlreadyDesktop = document.body.classList.contains('desktop-mode');

    // Пропускаем, если режим не изменился
    if (isDesktop && isAlreadyDesktop) return;
    if (!isDesktop && !isAlreadyDesktop) return;

    if (isDesktop) {
        dynamicContent.innerHTML = `
            <div class="desktop-stub">
                <img src="/img/Фон.jpg" alt="QR Code" class="desktop-stub__image">
                <p class="desktop-stub__text">Пожалуйста, откройте сайт на мобильном устройстве</p>
                <div class="desktop-stub__qr">
                    <img src="/img/qr-code.png" alt="QR-код для мобильной версии">
                </div>
            </div>
        `;
        dynamicContent.classList.add('visible');
        document.body.classList.add('desktop-mode');
    } else {
        dynamicContent.innerHTML = '';
        dynamicContent.classList.remove('visible');
        document.body.classList.remove('desktop-mode');
    }
}

// Обновление элементов
function initializeElements() {
    const famImage = document.querySelector('.fam');
    const mainImage = document.querySelector('.main');
    const zapImage = document.querySelector('.zap');
    const textInvite = document.querySelector('.textInvite');
    const names = document.querySelector('.names');
    const date = document.querySelector('.date');
    const scrollText = document.querySelector('.scroll-text');
    const viewportContainer = document.querySelector('.viewport-container');
    const calendarContainer = document.querySelector('.calendar-container');
    const heart = document.querySelector('.heart');
    const programContainer = document.querySelector('.program-container');
    const programItems = document.querySelectorAll('.program-item');
    const paintingItems = document.querySelectorAll('.painting');
    const restarauntPhoto = document.querySelectorAll('.restaraunt-photo');
    const photoText = document.querySelector('.photo-text');
    const countdown = document.querySelector('.countdown');
    const backgroundMusic = document.getElementById('background-music');
    const scrollDownBtn = document.querySelector('.scroll-down-btn');

    function scrollDown() {
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }

    if (famImage) {
        famImage.addEventListener(
            'click',
            () => {
                enableMobileScroll();
                famImage.classList.add('fullscreen');

                if (mainImage) mainImage.style.opacity = '0';
                if (zapImage) zapImage.style.opacity = '0';
                if (textInvite) textInvite.style.opacity = '0';

                setTimeout(() => {
                    if (mainImage) mainImage.style.display = 'none';
                    if (zapImage) zapImage.style.display = 'none';
                    if (textInvite) textInvite.style.display = 'none';

                    document.body.style.overflow = 'auto';
                    if (viewportContainer) {
                        viewportContainer.style.position = 'relative';
                        viewportContainer.style.height = '100vh';
                    }

                    if (backgroundMusic) {
                        backgroundMusic.play().catch((err) => console.error('Ошибка воспроизведения аудио:', err));
                    }

                    if (calendarContainer) calendarContainer.style.display = 'block';
                    paintingItems.forEach((item) => {
                        item.style.display = 'block';
                    });
                    restarauntPhoto.forEach((item) => {
                        item.style.display = 'block';
                    });
                    if (photoText) photoText.style.display = 'block';

                    // Автоматическая прокрутка вниз
                    setTimeout(() => {
                        scrollDown();
                    }, 1000);

                    setTimeout(() => {
                        if (countdown) {
                            countdown.classList.remove('countdown-hidden');
                            countdown.classList.add('countdown-visible');
                        }
                    }, 2500);

                    setTimeout(() => {
                        if (heart) heart.classList.add('animate');
                    }, 2500);

                    setTimeout(() => {
                        if (programContainer) programContainer.classList.add('visible');
                        programItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 300);
                        });
                    }, 2500);

                    // Показываем кнопку прокрутки через 5 секунд
                    setTimeout(() => {
                        if (scrollDownBtn) scrollDownBtn.classList.add('visible');
                    }, 5000);
                }, 500);

                setTimeout(() => {
                    if (names) names.classList.add('show');
                }, 2500);

                setTimeout(() => {
                    if (date) date.classList.add('show');
                }, 2700);

                setTimeout(() => {
                    if (scrollText) scrollText.classList.add('show');
                }, 3000);
            },
            { once: true }
        );
    }

    // Скрываем кнопку при прокрутке
    window.addEventListener('scroll', () => {
        if (scrollDownBtn && window.scrollY > 100) {
            scrollDownBtn.classList.remove('visible');
        }
    });
}

// Инициализация после загрузки страницы
window.addEventListener('load', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const musicToggle = document.querySelector('.music-toggle');
    const backgroundMusic = document.getElementById('background-music');

    // Скрываем прелоадер
    if (loaderWrapper) {
        setTimeout(() => {
            loaderWrapper.classList.add('hidden');
        }, 500);
    }

    // Инициализируем переключатель звука
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch((err) => console.error('Ошибка воспроизведения аудио:', err));
                musicToggle.src = '/img/Вкл звук.png';
            } else {
                backgroundMusic.pause();
                musicToggle.src = '/img/Выкл звук.png';
            }
        });
    }

    updateContent();
    initializeElements();
});

document.addEventListener('DOMContentLoaded', function initializeContent() {
    const dynamicContent = document.getElementById('dynamic-content');
    if (!dynamicContent) {
        console.error('dynamicContent not found');
        return;
    }

    const isDesktop = window.innerWidth > 640;

    if (isDesktop) {
        dynamicContent.innerHTML = `
            <div class="desktop-stub">
                <img src="/img/Фон.jpg" alt="QR Code" class="desktop-stub__image">
                <p class="desktop-stub__text">Пожалуйста, откройте сайт на мобильном устройстве</p>
                <div class="desktop-stub__qr">
                    <img src="/img/qr-code.png" alt="QR-код для мобильной версии">
                </div>
            </div>
        `;
        dynamicContent.classList.add('visible');
        document.body.classList.add('desktop-mode');
    } else {
        dynamicContent.innerHTML = '';
        document.body.classList.remove('desktop-mode');
    }
});

// Логика обратного отсчёта
document.addEventListener('DOMContentLoaded', function () {
    const weddingDate = new Date('2025-07-26T00:00:00');
    const daysToAdd = 0;
    const hoursToAdd = 0;
    const minutesToAdd = 0;
    const secondsToAdd = 0;

    weddingDate.setDate(weddingDate.getDate() + daysToAdd);
    weddingDate.setHours(weddingDate.getHours() + hoursToAdd);
    weddingDate.setMinutes(weddingDate.getMinutes() + minutesToAdd);
    weddingDate.setSeconds(weddingDate.getSeconds() + secondsToAdd);

    function updateCountdown() {
        const now = new Date();
        const timeDifference = weddingDate - now;

        if (timeDifference <= 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    const circles = document.querySelectorAll('.color-circle');
    circles.forEach(circle => {
        circle.classList.add('visible');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('guestForm');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbwCbxLbHJxBOKVahSN5zbXUmJxQfu3oOWaR0BaqZsYpHZBD1198BDHBLnXRtRoG79NC/exec';
        
        try {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            await fetch(scriptUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            alert('Спасибо за ваш ответ!');
            form.reset();
            
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert('Ваш ответ принят! Спасибо!');
        } finally {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
});

// Добавляем слушатели событий
window.addEventListener('load', () => {
    updateContent();
    initializeElements();
});
window.addEventListener('resize', updateContent);