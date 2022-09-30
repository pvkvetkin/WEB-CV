const form = document.getElementById("post_pr_langs");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {title: document.getElementById('inp_title').value, skillType: "PROGRAMMING_LANGUAGE"};
  fetch('/skills/create', {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json())
    .then((text) => console.log(text))
    .catch((error) =>
    console.error(error)
    );
})