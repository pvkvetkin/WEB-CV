window.addEventListener('load', async function (event) {
  let pr_langs_field = document.getElementById("programming_languages")
  let out_pr_langs = ""
  const r_langs = await fetch('/skills')
  const p_langs = await r_langs.json();
  for (let u of p_langs) {
    if (u.skillType === 'PROGRAMMING_LANGUAGE') {
      key = u.title.split(" ").join("");
      out_pr_langs += "<li>" +
        "<button class=\"btn btn-primary rounded-circle\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#prLangModal" + u.id + "\" data-bs-whatever=\"" + u.title + "\">&#9881" +
        "</button>" +
        "<div class=\"modal fade\" id=\"prLangModal" + u.id + "\" tabindex=\"-1\" aria-labelledby=\"prLangModalLabel" + u.id + "\" aria-hidden=\"true\">\n" +
        "<div class=\"modal-dialog\">\n" +
        "<div class=\"border modal-content\">\n" +
        "<div class=\"modal-header\">\n" +
        "<h5 class=\"modal-title\" id=\"prLangModalLabel" + u.id + "\">Edit programming language</h5>" +
        "<button class=\"btn-close bg-light\" type=\"button\" data-bs-dismiss=\"modal\" aria-label=\"CLose\"></button>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">\n" +
        "<form class=\"update_remove_project\" id='projectUR'>\n" +
        "<div class=\"mb-3\"><label class=\"col-form-label\" for=\"recipient-name\">Title</label><input class=\"form-control\" id=\"skillPrLang-" + u.id + "\" type=\"text\" /></div>\n" +
        // "<div class=\"modal-footer\">" +
        "<button class=\"btn btn-danger\" type=\"button\" onclick=\"deletePrLang("+u.id+")\"'>Delete</button>\n" +
        "<button class=\"btn btn-success\" type=\"button\" onclick=\"editPrLang("+u.id+")\"'>Save</button></div>\n" +
        // "</div>" +
        "</form>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>"
        + u.title + " </li>";
    }
  }
  pr_langs_field.innerHTML = out_pr_langs;

  let frameField = document.getElementById("frameworks")
  let out_frame = ""
  const r_frame = await fetch('/skills')
  const p_frame = await r_frame.json();
  for (let u of p_frame) {
    if (u.skillType === 'FRAMEWORK') {
      key = u.title.split(" ").join("");
      out_frame += "<li>" +
        "<button class=\"btn btn-primary rounded-circle\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#frameworkModal" + u.id + "\" data-bs-whatever=\"" + u.title + "\">&#9881" +
        "</button>" +
        "<div class=\"modal fade\" id=\"frameworkModal" + u.id + "\" tabindex=\"-1\" aria-labelledby=\"frameworkModalLabel" + u.id + "\" aria-hidden=\"true\">\n" +
        "<div class=\"modal-dialog\">\n" +
        "<div class=\"border modal-content\">\n" +
        "<div class=\"modal-header\">\n" +
        "<h5 class=\"modal-title\" id=\"frameworkModalLabel" + u.id + "\">Edit framework</h5>" +
        "<button class=\"btn-close bg-light\" type=\"button\" data-bs-dismiss=\"modal\" aria-label=\"CLose\"></button>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">\n" +
        "<form class=\"update_remove_project\" id='projectUR'>\n" +
        "<div class=\"mb-3\"><label class=\"col-form-label\" for=\"recipient-name\">Title</label><input class=\"form-control\" id=\"skillFramework-" + u.id + "\" type=\"text\" /></div>\n" +
        // "<div class=\"modal-footer\">" +
        "<button class=\"btn btn-danger\" type=\"button\" onclick=\"deleteFramework("+u.id+")\"'>Delete</button>\n" +
        "<button class=\"btn btn-success\" type=\"button\" onclick=\"editFramework("+u.id+")\"'>Save</button></div>\n" +
        // "</div>" +
        "</form>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>"
        + u.title + " </li>";
    }
  }
  frameField.innerHTML = out_frame;

});

async function deletePrLang(id) {
  const response = await fetch('/skills/' + id, {
    method: "DELETE",
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

async function editPrLang(id) {
  var modal = document.getElementById('prLangModal' + id)
  var edited = modal.querySelector('#skillPrLang-' + id).value
  const data_edited = {
    title: edited
  }
  const response = await fetch('/skills/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_edited)
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

async function deleteFramework(id) {
  const response = await fetch('/skills/' + id, {
    method: "DELETE",
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

async function editFramework(id) {
  var modal = document.getElementById('frameworkModal' + id)
  var edited = modal.querySelector('#skillFramework-' + id).value
  const data_edited = {
    title: edited
  }
  const response = await fetch('/skills/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_edited)
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
}

