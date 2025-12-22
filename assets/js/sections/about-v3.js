// About V3 - Card with navigation bar
export function initAboutV3() {
    const aboutSection = document.querySelector('.about-v3');
    if (!aboutSection)
        return;
    const barItems = aboutSection.querySelectorAll('.about-v3__bar-item');
    const cardContents = aboutSection.querySelectorAll('.about-v3__card-content');
    if (barItems.length === 0 || cardContents.length === 0)
        return;
    let currentIndex = 0;
    // Update content based on selected bar item
    function updateContent(index) {
        if (index < 0 || index >= barItems.length)
            return;
        currentIndex = index;
        // Update bar items active state
        barItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('is-active');
            }
            else {
                item.classList.remove('is-active');
            }
        });
        // Update card content visibility
        cardContents.forEach((content, i) => {
            if (i === index) {
                // Fade in active content
                setTimeout(() => {
                    content.classList.add('is-active');
                }, 50);
            }
            else {
                // Fade out inactive content
                content.classList.remove('is-active');
            }
        });
    }
    // Event listeners for bar items
    barItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateContent(index);
        });
    });
    // Initialize with first item active
    updateContent(0);
}
//# sourceMappingURL=about-v3.js.map