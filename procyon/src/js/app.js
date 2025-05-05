document.addEventListener('DOMContentLoaded', function() {
    const rectangles = document.querySelectorAll('.clickable-rectangle');

    rectangles.forEach(rectangle => {
        rectangle.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            window.location.href = targetPage;
        });
    });
});