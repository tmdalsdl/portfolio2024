// homeScript.js
document.addEventListener('DOMContentLoaded', function() {
    let isButtonClicked = false;
    let lastClickTime = 0;
    const clickDelay = 0; // 좋아요 클릭에 딜레이 없음
    // CloudProject와 WebProject의 인덱스를 따로 관리
    let cloudIndex = 0;
    let webIndex = 0;
    

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 페이지 로드 시 모든 프로젝트의 좋아요 수 가져오기
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        const projectId = `likesProject${index + 1}`;
        getLikes(projectId, index);
    });

    // 좋아요 수 가져오기 함수
    async function getLikes(projectId, index) {
        try {
            const response = await fetch(`https://wihfjpwi54.execute-api.ap-northeast-2.amazonaws.com/portfolio2024/projects/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'omit'
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log('Likes fetched:', data);
            
            // POST 요청 후 즉시 좋아요 수 업데이트
            updateLikesDisplay(index, data.likes);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    }

    // 좋아요 수 표시 업데이트 함수
    function updateLikesDisplay(index, likes) {
        const likesContainer = document.querySelectorAll('.portfolio-item')[index];
        let likesCount = likesContainer.querySelector('.likes-count');
        
        if (!likesCount) {
            // likes-count 엘리먼트가 없으면 생성
            likesCount = document.createElement('span');
            likesCount.className = 'likes-count';
            likesContainer.querySelector('.addLikes').insertAdjacentElement('afterend', likesCount);
        }
        
        likesCount.textContent = likes || 0;
    }
    //addLikes emoji 클릭 발생 이벤트
    document.querySelectorAll('.addLikes').forEach((emojiSpan, index) => {
        emojiSpan.addEventListener('mousedown', function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.add('active');
        });
    
        emojiSpan.addEventListener('mouseup', function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.remove('active');

            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime < clickDelay) {
                return; // 딜레이 시간이 지나지 않았으면 함수 종료
            }
            lastClickTime = currentTime;

            const buttonId = `likesProject${index + 1}`;
            
            fetch(`https://wihfjpwi54.execute-api.ap-northeast-2.amazonaws.com/portfolio2024/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: buttonId })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getLikes(buttonId, index);
            })
            .catch(error => console.error('Error:', error));
        });
    
        emojiSpan.addEventListener('mouseleave', function(event) {
            this.classList.remove('active');
        });
    });
    
    document.querySelectorAll('.portfolio-content1, .portfolio-content2').forEach((item, index) => {
        item.addEventListener('click', function(event) {
            
            if (!event.target.closest('.likes-container')) {
                const projectType = this.classList.contains('portfolio-content1') ? 'CloudProject' : 'WebProject';
                let projectIndex;
                
                if (projectType === 'CloudProject') {
                    cloudIndex = index + 1; // CloudProject 인덱스 증가
                    projectIndex = cloudIndex;
                } else {
                    webIndex = index - 1; // WebProject 인덱스 증가
                    projectIndex = webIndex;
                }
                
                const projectUrl = `${projectType}/project${projectIndex}.html`;
                
                fetch(projectUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(content => {
                        // 기존 컨텐츠를 숨기고 새 컨텐츠 준비
                        const aboutContainer = document.querySelector('.about-container');
                        if (aboutContainer) {
                            aboutContainer.style.opacity = '0';
                            setTimeout(() => {
                                aboutContainer.style.display = 'none';
                            }, 300);
                        }
                        
                        // main-content에 새 컨텐츠 추가
                        const mainContent = document.querySelector('.main-content');
                        if (mainContent) {
                            mainContent.innerHTML = '';  // 기존 컨텐츠 제거
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = content;
                            
                            // CSS 파일 동적 로드
                            const styleLink = document.createElement('link');
                            styleLink.rel = 'stylesheet';
                            styleLink.type = 'text/css';
                            styleLink.href = 'css/projectStyle.css';
                            document.head.appendChild(styleLink);
                            
                            const aboutContainer = document.querySelector('.about-container');
                            if (aboutContainer) {
                                aboutContainer.style.display = 'none';
                            }
                            // 필요한 섹션만 추출
                            const sections = tempDiv.querySelectorAll('section');
                            sections.forEach(section => {
                                mainContent.appendChild(section.cloneNode(true));
                            });
                            
                            // 페이지 상단으로 스크롤
                            window.scrollTo(0, 0);
                        }
                    })
                    .catch(() => {
                        console.warn('프로젝트를 불러오는데 실패했습니다.');
                    });
            }
        });
    });
    // 브라우저 뒤로가기 처리
    window.addEventListener('popstate', () => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';
        
        const aboutContainer = document.querySelector('.about-container');
        aboutContainer.style.display = 'block';
    });
});