/* ============================================
   ISMAIL MOHAMED – PORTFOLIO JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Typing Animation ----------
  const typingElement = document.getElementById('typingText');
  const titles = [
    'ASP.NET Core Developer',
    'Backend Engineer',
    'REST API Specialist',
    'Web Developer',
    'Clean Code Advocate'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeText() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Mobile Hamburger Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ---------- Active Nav Link Highlight ----------
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- GitHub API Integration ----------
  const githubReposContainer = document.getElementById('githubRepos');
  const githubUsername = 'AsmaelShowky70';

  async function fetchGitHubRepos() {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
      if (!response.ok) throw new Error('GitHub API error');
      const repos = await response.json();

      if (repos.length === 0) return; // Keep static fallback

      // Clear static fallback cards
      githubReposContainer.innerHTML = '';

      repos.forEach(repo => {
        const langDotClass = getLanguageDotClass(repo.language);
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <a href="${repo.html_url}" target="_blank" rel="noopener" style="text-decoration:none; color:inherit;">
            <div class="repo-card-header">
              <div class="repo-icon">📂</div>
              <h4>${repo.name}</h4>
            </div>
            <p class="repo-desc">${repo.description || 'No description available.'}</p>
            <div class="repo-card-footer">
              ${repo.language ? `<div class="repo-lang"><span class="repo-lang-dot ${langDotClass}"></span> ${repo.language}</div>` : ''}
              <div class="repo-stat">⭐ ${repo.stargazers_count}</div>
              <div class="repo-stat">🍴 ${repo.forks_count}</div>
            </div>
          </a>
        `;
        githubReposContainer.appendChild(card);
      });
    } catch (error) {
      // Silently fail — static fallback cards remain
      console.info('GitHub API unavailable, using static cards.');
    }
  }

  function getLanguageDotClass(language) {
    if (!language) return '';
    const lang = language.toLowerCase();
    if (lang === 'c#') return 'csharp';
    if (lang === 'html') return 'html';
    if (lang === 'javascript') return 'js';
    return '';
  }

  fetchGitHubRepos();

  // ---------- Smooth scroll for nav links (fallback for older browsers) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
