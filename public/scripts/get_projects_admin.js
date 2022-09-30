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
    out_projects += "<li>" +
      "<button class=\"btn btn-primary rounded-circle\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal" + u.id + "\" data-bs-whatever=\"" + u.title + "\">&#9881" +
      "</button>" +
      "<div class=\"modal fade\" id=\"exampleModal" + u.id + "\" tabindex=\"-1\" aria-labelledby=\"exampleModalLabel" + u.id + "\" aria-hidden=\"true\">\n" +
      "<div class=\"modal-dialog\">\n" +
      "<div class=\"border modal-content\">\n" +
      "<div class=\"modal-header\">\n" +
      "<h5 class=\"modal-title\" id=\"exampleModalLabel" + u.id + "\">Edit project</h5>" +
      "<button class=\"btn-close bg-light\" type=\"button\" data-bs-dismiss=\"modal\" aria-label=\"CLose\"></button>\n" +
      "</div>\n" +
      "<div class=\"modal-body\">\n" +
      "<form class=\"update_remove_project\" id='projectUR'>\n" +
      "<div class=\"mb-3\"><label class=\"col-form-label\" for=\"recipient-name\">Title</label><input class=\"form-control\" id=\"project-" + u.id + "\" type=\"text\" /></div>\n" +
      "<div class=\"mb-3\">\n" +
      "<label for=\"description_project-" +u.id+ "\" class=\"col-form-label\">Description:</label>\n" +
      "<textarea class=\"form-control\" id=\"description_project-" +u.id+ "\"></textarea>\n" +
      "</div>" +
      // "<div class=\"modal-footer\">" +
      "<button class=\"btn btn-danger\" type=\"button\" onclick=\"deleteProject(" + u.id + ")\"'>Delete</button>\n" +
      "<button class=\"btn btn-success\" type=\"button\" onclick=\"editProject(" + u.id + ")\"'>Save</button></div>\n" +
      // "</div>" +
      "</form>\n" +
      "</div>\n" +
      "</div>\n" +
      "</div>\n" +
      "</div>"
      + u.title + "</b><br>" +
      u.description + "</li>";
  }
  project_field.innerHTML = out_projects;
});

async function deleteProject(id) {
  const response = await fetch("/projects/" + id, {
    method: "DELETE"
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

async function editProject(id) {
  var modal = document.getElementById("exampleModal" + id);
  var edited_title = modal.querySelector("#project-" + id).value;
  var edited_description = modal.querySelector("#description_project-" + id).value;
  const data_edited = {
    title: edited_title,
    description: edited_description
  };
  const response = await fetch("/projects/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data_edited)
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

