// Add your projects here
const projects = [

  {
    name: " Image Processing app-CSS variables",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day3-JavaScript/Javascript30/03%20-%20CSS%20Variables/index.html"
  },
    {
    name: " Drum Kit",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day4-javaScript30/01%20-%20JavaScript%20Drum%20Kit/index-START.html"
  },
     {
    name: " Alarm clock - Time ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day4-javaScript30/02%20-%20JS%20and%20CSS%20Clock/index-START.html"
  },
    {
    name: " DOM Playground ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day5-jsDommanipulation/Mini-Dom-Playground/index.html"
  }


  
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
