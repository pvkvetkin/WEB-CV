window.addEventListener('load', async function (event) {
  let code = new URL(window.location.href).searchParams.get('code');

  console.log(code);

  const responseCode = await fetch("/api/signinup", {
    method: "POST",
    headers: {
      "rid": "thirdparty",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code,
      redirectURI: "/callback/github",
      thirdPartyId: "github"
    })
  });
});