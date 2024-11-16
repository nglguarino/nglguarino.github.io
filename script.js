document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');

            // Check if the link is an in-page anchor link (starts with #)
            if (target.startsWith('#')) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Defer autoplay for videos outside the viewport
    const videos = document.querySelectorAll('.hover-video');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play(); // Start playing when in view
            } else {
                video.pause(); // Pause when out of view
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the video is visible
    });

    videos.forEach(video => observer.observe(video));

    // Filtering projects based on checkboxes
    const checkboxes = document.querySelectorAll('.project-filter');
    const projects = document.querySelectorAll('.project-card');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProjects);
    });

    function filterProjects() {
        // Get all checked values
        const selectedTags = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        projects.forEach(project => {
            const projectTags = project.getAttribute('data-tags').split(', ');

            // Check if the project has at least one of the selected tags
            const shouldDisplay = selectedTags.length === 0 || selectedTags.some(tag => projectTags.includes(tag));

            // Show or hide the project
            project.style.display = shouldDisplay ? 'block' : 'none';
        });
    }
});
