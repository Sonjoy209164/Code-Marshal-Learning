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
  },

     {
    name: " Task Manager ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day8-javaScript30/15%20-%20LocalStorage/index.html"

  },

     {
    name: " Shadow on mouse movement ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day8-javaScript30/16%20-%20Mouse%20Move%20Shadow/index-START.html"

  },
       {
    name: " JS 30 DOM parent child understanding ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day5-jsDommanipulation/Task1_Favmovie/index.html"

  },
        {
    name: " Type Sekho ",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day6-javaScript30/30%20-%20Whack%20A%20Mole/index.html"

  },

        {
    name: " Sorting movie name without A|AN|THE",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day8-javaScript30/17%20-%20Sort%20Without%20Articles/index-START.html"

  },
          {
    name: " Time Parsing :  convert to array Split and Calc",
    link: "https://sonjoy209164.github.io/Code-Marshal-Learning/Task%20Day9-javaScript30%20copy/18%20-%20Adding%20Up%20Times%20with%20Reduce/index-START.html"

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
