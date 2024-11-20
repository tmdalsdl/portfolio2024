document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = 0;
    let isScrolling = false;
    const scrollDelay = 750;

    // 스크롤 방지 함수
    const preventDefault = (e) => {
        e.preventDefault();
    };

    // 터치 이벤트 방지
    const preventTouchMove = (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    };

    // 스크롤 이벤트 비활성화
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    const updateNavigation = (sectionId) => {
        navLinks.forEach(link => {
            if (!link.getAttribute('href').includes('index.html')) {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === sectionId) {
                    link.classList.add('active');
                }
            }
        });
    };

    const scrollToSection = (index) => {
        if (isScrolling) return;
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            currentSection = index;
            
            sections[currentSection].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            updateNavigation(sections[currentSection].id);
            
            setTimeout(() => {
                isScrolling = false;
            }, scrollDelay);
        }
    };

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (!isScrolling) {
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextSection = currentSection + direction;
            scrollToSection(nextSection);
        }
    }, { passive: false });

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').includes('index.html')) {
                return; // Home 링크는 기본 동작 유지
            }
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const sectionIndex = Array.from(sections).indexOf(targetSection);
            
            if (sectionIndex !== -1) {
                scrollToSection(sectionIndex);
            }
        });
    });

    // 키보드 이벤트 처리
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    });

    updateNavigation(sections[0].id);
});