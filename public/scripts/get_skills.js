window.addEventListener('load', async function (event) {
  let pr_langs_field = document.getElementById("programming_languages")
  let out_pr_langs = ""
  const r_langs = await fetch('/skills')
  const p_langs = await r_langs.json();
  for (let u of p_langs) {
    if (u.skillType === 'PROGRAMMING_LANGUAGE') {
      out_pr_langs += '<li>' + u.title + '</li> ';
    }
  }
  pr_langs_field.innerHTML = out_pr_langs;

  let frameField = document.getElementById("frameworks")
  let out_frame = ""
  const r_frame = await fetch('/skills')
  const p_frame = await r_frame.json();
  for (let u of p_frame) {
    if (u.skillType === 'FRAMEWORK') {
      out_frame += '<li>' + u.title + '<li> ';
    }
  }
  frameField.innerHTML = out_frame;

});