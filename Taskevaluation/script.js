// Add your projects here
const projects = [
  {
    name: "Code Marshal Learning",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/"
  },
  {
    name: "Task Day 3 - CSS Variables",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day3-JavaScript/Javascript30/03%20-%20CSS%20Variables/index.html"
  },
  // Add more manually as needed
];

const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.classList.add("project-card");

  card.innerHTML = `
    <div class="project-title">${project.name}</div>
    <a class="view-button" href="${project.link}" target="_blank">View</a>
  `;

  container.appendChild(card);
});
