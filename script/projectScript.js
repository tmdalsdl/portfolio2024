document.addEventListener('DOMContentLoaded', () => {
    // const sections = document.querySelectorAll('section');
    // const navLinks = document.querySelectorAll('nav ul li a');
    // let currentSection = 0;
    // let isScrolling = false;
    // const scrollDelay = 750;

    // // 스크롤 방지 함수
    // const preventDefault = (e) => {
    //     e.preventDefault();
    // };

    // // 터치 이벤트 방지
    // const preventTouchMove = (e) => {
    //     if (e.touches.length > 1) {
    //         e.preventDefault();
    //     }
    // };

    // // 스크롤 제어
    // const disableScroll = () => {
    //     document.addEventListener('wheel', preventDefault, { passive: false });
    //     document.addEventListener('touchmove', preventTouchMove, { passive: false });
    // };

    // const enableScroll = () => {
    //     document.removeEventListener('wheel', preventDefault);
    //     document.removeEventListener('touchmove', preventTouchMove);
    // };

    // // 네비게이션 업데이트
    // const updateNavigation = (sectionId) => {
    //     navLinks.forEach(link => {
    //         if (!link.getAttribute('href').includes('index.html')) {
    //             link.classList.remove('active');
    //             if (link.getAttribute('href').substring(1) === sectionId) {
    //                 link.classList.add('active');
    //             }
    //         }
    //     });
    // };

    // // 섹션으로 스크롤
    // const scrollToSection = (index) => {
    //     if (isScrolling) return;
    //     if (index >= 0 && index < sections.length) {
    //         isScrolling = true;
    //         currentSection = index;
    //         sections[currentSection].scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //         updateNavigation(sections[currentSection].id);
    //         setTimeout(() => {
    //             isScrolling = false;
    //         }, scrollDelay);
    //     }
    // };

    // // 휠 스크롤 이벤트
    // window.addEventListener('wheel', (e) => {
    //     e.preventDefault();
    //     if (!isScrolling) {
    //         const direction = e.deltaY > 0 ? 1 : -1;
    //         const nextSection = currentSection + direction;
    //         scrollToSection(nextSection);
    //     }
    // }, { passive: false });

    // // 네비게이션 링크 클릭 이벤트
    // navLinks.forEach((link) => {
    //     link.addEventListener('click', (e) => {
    //         if (link.getAttribute('href').includes('index.html')) {
    //             return;
    //         }
    //         e.preventDefault();
    //         const targetId = link.getAttribute('href').substring(1);
    //         const targetSection = document.getElementById(targetId);
    //         const sectionIndex = Array.from(sections).indexOf(targetSection);
    //         if (sectionIndex !== -1) {
    //             scrollToSection(sectionIndex);
    //         }
    //     });
    // });

    // // 키보드 이벤트
    // window.addEventListener('keydown', (e) => {
    //     if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    //         e.preventDefault();
    //     }
    // });

    // // 사이드바 로드
    // const loadSidebar = async () => {
    //     try {
    //         const response = await fetch('../partials/sidebar.html', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'text/html'
    //             }
    //         });
            
    //         if (!response.ok) throw new Error('Network response was not ok');
            
    //         const html = await response.text();
    //         document.getElementById('sidebar-container').innerHTML = html;
    //         highlightActiveLink();
    //         addHomeLinkEvent();
    //     } catch (error) {
    //         console.error('Error loading sidebar:', error);
    //     }
    // };

    // // 현재 페이지 링크 강조
    // const highlightActiveLink = () => {
    //     const links = document.querySelectorAll('.menu-link');
    //     links.forEach(link => {
    //         if (link.href === window.location.href) {
    //             link.classList.add('active');
    //         }
    //     });
    // };

    // 홈 링크 이벤트
    const addHomeLinkEvent = () => {
        const homeLink = document.querySelector('.home-link');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.remove('loaded');
                setTimeout(function() {
                    window.location.href = e.target.closest('a').href;
                }, 300);
            });
        }
    };

    
    // 초기화
    updateNavigation(sections[0].id);
    document.body.classList.add('loaded');
    loadSidebar();
});
