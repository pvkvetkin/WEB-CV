supertokens.init({
  apiDomain: "https://web-sem6.herokuapp.com",
  // apiDomain: "http://localhost:12345",
  apiBasePath: "/api"
});

const form_auth = document.getElementById("auth_button");
form_auth.addEventListener("click", async (e) => {


  const responseForm = await fetch("https://web-sem6.herokuapp.com/api/authorisationurl?thirdPartyId=github",
  // const responseForm = await fetch("http://localhost:12345/api/authorisationurl?thirdPartyId=github",
    {
      method: "GET",
      headers: {
        rid: "thirdparty"
      }
    }
  ).then(responseForm => responseForm.json());

  let urlObj = new URL(responseForm.url);
  urlObj.searchParams.append("redirect_uri", "https://web-sem6.herokuapp.com/auth/callback/github");
  // urlObj.searchParams.append("redirect_uri", "http://localhost:12345/auth/callback/github");
  window.location.href = urlObj.toString();
});

// const form_logout = document.getElementById("logout_button");
// form_logout.addEventListener("click", async (e) => {
//   async function logout() {
//     await supertokens.signOut();
//     window.location.href = "/";
//   }
//
//   if (await supertokens.doesSessionExist()) {
//     const responseForm = await fetch("/auth/logout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }
//     }).then((response) => response.json())
//       .then((text) => console.log(text)
//       );
//   }
// });

