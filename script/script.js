// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = 0;
    let isScrolling = false;

    // 네비게이션 활성화 업데이트
    const updateNavigation = (sectionId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            }
        });
    };

    // 휠 이벤트 처리
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;

        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (e.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }

        const targetSection = sections[currentSection];
        targetSection.scrollIntoView({ behavior: 'smooth' });
        updateNavigation(targetSection.id);

        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }, { passive: false });

    // 네비게이션 클릭 이벤트
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentSection = index;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            updateNavigation(sections[currentSection].id);
        });
    });

    // 초기 활성화
    updateNavigation(sections[0].id);
});