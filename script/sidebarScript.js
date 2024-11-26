document.addEventListener('DOMContentLoaded', function() {
    // 현재 URL 가져오기
    const currentPath = window.location.pathname;
    
    // 모든 메뉴 아이템의 강조 표시 제거
    function clearActiveStates() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // 현재 페이지에 해당하는 메뉴 항목 강조
    function highlightCurrentPage() {
        clearActiveStates();
        
        // URL에서 프로젝트 경로 추출
        if (currentPath.includes('CloudProject/')) {
            const projectNum = currentPath.match(/project(\d+)\.html/)[1];
            const menuItem = document.querySelector(`a[href*="CloudProject/project${projectNum}.html"]`);
            if (menuItem) {
                menuItem.classList.add('active');
            }
        } else if (currentPath.includes('WebProject/')) {
            const projectNum = currentPath.match(/project(\d+)\.html/)[1];
            const menuItem = document.querySelector(`a[href*="WebProject/project${projectNum}.html"]`);
            if (menuItem) {
                menuItem.classList.add('active');
            }
        }
    }
    
    highlightCurrentPage();
});