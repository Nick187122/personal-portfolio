📌 Overview
A responsive portfolio website showcasing Nicholas Oyiolo's cybersecurity and software development expertise. Features dark/light mode toggle, project showcase, and contact form.

✨ Features
🌓 Dark/Light mode toggle with localStorage persistence

📱 Fully responsive design

🛡️ Cybersecurity-focused project showcase

📧 Functional contact form (browser storage)

📊 GitHub-inspired project cards

🛠️ Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)

Icons: Font Awesome 6

Styling: CSS Variables for theming

Storage: localStorage for data persistence

🚀 Installation & Setup
Clone the repository:

bash
Copy
git clone https://github.com/oyiolon/portfolio.git
cd portfolio
Open in browser:

Simply open index.html in any modern browser

For best results, use a local server (like VS Code's Live Server)

Customize content:

Edit index.html for personal information

Update projects in js/database.js

Replace placeholder image in /images/profile.jpg

📂 File Structure
Copy
/portfolio
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
└── js/
    ├── script.js       # Main JavaScript
    └── database.js     # Simulated database
🎨 Theming System
The portfolio includes a color scheme with:

Primary: Purple (#8a2be2)

Dark mode: Black background with light text

Light mode: White background with dark text

To modify colors, edit the CSS variables in styles.css:

css
Copy
:root {
    --primary-color: #8a2be2;
    --secondary-color: #000000;
    --text-color: #f8f9fa;
    --bg-color: #121212;
}

[data-theme="light"] {
    --text-color: #333;
    --bg-color: #f8f9fa;
}
📝 Adding Projects
Edit the sample projects in js/database.js:

javascript
Copy
// Example project structure
{
    id: 1,
    title: "Secure Auth System",
    description: "Multi-factor authentication with biometrics",
    technologies: "Python, Flask, JWT",
    github_url: "https://github.com/yourusername/project",
    category: "cybersecurity"
}
🌐 Deployment
Deploy to any static hosting service:

GitHub Pages

Netlify

Vercel

Firebase Hosting

📧 Contact
For any questions or suggestions, please contact:

Email: oyiolon@gmail.com

GitHub: github.com/oyiolon

📜 License
This project is open-source and available under the MIT License.
