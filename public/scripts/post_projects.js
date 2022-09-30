const form = document.getElementById("post_projects");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let data = {title: document.getElementById('inp_title_projects').value,
    description: document.getElementById('inp_description_projects').value};
  fetch('/projects/create', {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
      console.error(error)
    );
})