// homescript.js
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Redirect to specific project page on portfolio item click
document.querySelectorAll('.portfolio-content1').forEach((item, index) => {
    item.addEventListener('click', function () {
        // Assuming your project pages follow a naming convention like project1.html, project2.html, etc.
        window.location.href = `CloudProject/project${index + 1}.html`;
    });
});
document.querySelectorAll('.portfolio-content2').forEach((item, index) => {
    item.addEventListener('click', function () {
        // Assuming your project pages follow a naming convention like project1.html, project2.html, etc.
        window.location.href = `WebProject/project${index + 1}.html`;
    });
});