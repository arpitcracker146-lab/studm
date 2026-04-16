// Navbar HTML string to be injected on pages
const navbarHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">
            <i class="bi bi-mortarboard-fill me-2"></i> Student CMS
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto fw-semibold">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="add.html">Add Student</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="view.html">View Records</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="about.html">About</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
`;

// Footer HTML string
const footerHTML = `
<footer class="footer bg-white border-top py-4 mt-5">
    <div class="container text-center">
        <p class="text-muted mb-0 fw-semibold">Web Development Minor Project &ndash; CRUD Application</p>
        <small class="text-muted">Designed by Kavya Shrivastava</small>
    </div>
</footer>
`;

// Inject components on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('navbar-container');
    const footContainer = document.getElementById('footer-container');

    if (navContainer) navContainer.innerHTML = navbarHTML;
    if (footContainer) footContainer.innerHTML = footerHTML;

    // Highlight current page in Navbar
    const currentUrl = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        } else if (currentUrl === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active'); // default to index
        }
    });
});
