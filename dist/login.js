const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", function (event) {
  // Stop the default submit and page load
  event.preventDefault();

  

  // localStorage.setItem('userEmail', email);
  // localStorage.setItem('userPassword',password);
});

function auth(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Handle validations

  if(!email || !password){
    alert(`Provide Email And password`)
  return;
  }
  
  // Set Loading state to true
  axios
    .post("https://zlglobalalliance.com.ng/api/login-admin", {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);

      localStorage.setItem("token", response.data.token);
      // Handle response

       // Set Loading state to false
      if (response.data.token) {
        window.location.replace("./index.html");
      } else {
        alert("Invalid information");
        return;
      }
    })
    .catch(err=>{
      console.log(err)
      })
    ;

  
}
