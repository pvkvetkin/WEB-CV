window.addEventListener("load", async function(event) {
  supertokens.init({
    apiDomain: "https://web-sem6.herokuapp.com",
    // apiDomain: "http://localhost:12345",
    apiBasePath: "/api"
  });

  let project_field = document.getElementById("project_field");
  let out_projects = "";
  const r = await fetch("/projects");
  const p = await r.json();
  for (let u of p) {
    key = u.title.split(" ").join("");
    out_projects += "<li> <b>" + u.title + "</b><br>" +
      u.description + "</li>";
  }
  project_field.innerHTML = out_projects;
});

