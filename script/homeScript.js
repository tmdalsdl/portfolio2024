// homeScript.js
document.addEventListener('DOMContentLoaded', function() {
    let isButtonClicked = false;

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.likes').forEach((img, index) => {
        img.addEventListener('mousedown', function(event) {
            event.stopPropagation();
            img.src = 'image/likes2.png';
            isButtonClicked = true;
        });

        img.addEventListener('mouseup', function(event) {
            event.stopPropagation();
            img.src = 'image/likes.png';
            if (isButtonClicked) {
                const buttonId = `likesProject${index + 1}`;
                
                // API 호출 예시
                fetch(`https://wihfjpwi54.execute-api.ap-northeast-2.amazonaws.com/portfolio2024/projects/${buttonId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ buttonId })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));

                isButtonClicked = false;
            }
        });
    });

    document.querySelectorAll('.portfolio-content1').forEach((item, index) => {
        item.addEventListener('click', function(event) {
            if (!isButtonClicked) {
                window.location.href = `CloudProject/project${index + 1}.html`;
            }
        });
    });

    document.querySelectorAll('.portfolio-content2').forEach((item, index) => {
        item.addEventListener('click', function(event) {
            if (!isButtonClicked) {
                window.location.href = `WebProject/project${index + 1}.html`;
            }
        });
    });
});