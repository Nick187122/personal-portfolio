import { mysql } from "./database.js";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize database
  const db = mysql;

  // Mobile Navigation (same as before)
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burger.classList.toggle("active");
  });

  // Theme Toggle (same as before)
  document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");

    // 1. Initialize theme from localStorage or prefered color scheme
    function initializeTheme() {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Use saved theme, else prefer system preference, else default to dark
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

      document.documentElement.setAttribute("data-theme", initialTheme);
      updateThemeIcon(initialTheme);
    }

    // 2. Update the theme icon
    function updateThemeIcon(theme) {
      if (theme === "dark") {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }

    // 3. Toggle theme when button is clicked
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      // Update the theme
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });

    // Initialize the theme when page loads
    initializeTheme();
  });
  // Load projects from "database"
  function loadProjects() {
    const projects = db.query("SELECT * FROM projects");
    const container = document.getElementById("projects-container");

    if (projects.length === 0) {
      container.innerHTML = `
                <p class="empty-message">Working on exciting projects! Check back soon.</p>
            `;
      return;
    }

    container.innerHTML = projects
      .map(
        (project) => `
            <div class="project-card" data-id="${project.id}">
                <div class="project-image">
                    <i class="fas fa-${
                      project.category === "cybersecurity" ? "lock" : "code"
                    }"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies
                          .split(", ")
                          .map(
                            (tech) => `
                            <span class="tag">${tech}</span>
                        `
                          )
                          .join("")}
                    </div>
                    ${
                      project.github_url
                        ? `
                    <div class="project-links">
                        <a href="${project.github_url}" target="_blank" class="btn small">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>`
                        : ""
                    }
                </div>
            </div>
        `
      )
      .join("");
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value,
      ip_address: "127.0.0.1", // Simulated
      user_agent: navigator.userAgent,
    };

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Simulate async DB operation
    setTimeout(() => {
      const result = db.query("INSERT INTO messages SET ?", formData);

      submitBtn.textContent = "Message Sent!";
      this.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1000);
  });

  // Track visitor
  function trackVisitor() {
    db.query("INSERT INTO visitors SET ?", {
      ip_address: "127.0.0.1", // Simulated
      user_agent: navigator.userAgent,
      page_visited: window.location.hash || "home",
    });
  }

  // Initialize everything
  loadProjects();
  trackVisitor();
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
