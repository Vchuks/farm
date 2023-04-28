function populateTable() {
  const getSpinal = document.querySelector(".pagemodal");

  getSpinal.style.display = "block";

  const myToken = localStorage.getItem("token");
  // console.log(myToken)

  const tokenHeader = new Headers();

  tokenHeader.append("Authorization", `Bearer ${myToken}`);

  const tokenRequest = {
    method: "GET",
    headers: tokenHeader,
  };

  let data = [];

  const url = "https://zlglobalalliance.com.ng/api/get-medical-records?page=0";
  fetch(url, tokenRequest)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      const patientsRecord = document.querySelector(".patData");

      if (result.length === 0) {
        patientsRecord.innerHTML = "No Record Found";
      } else {
        result.records.rows.map((item) => {
          data += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.sex}</td>
                    <td>${item.age}</td>
                    <td>${item.cardnumber}</td>
                    <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                    <td><button class="delete" onclick="deleteDetails(${item.id})">delete</button></td>
                </tr>
            `
          patientsRecord.innerHTML = data;
          getSpinal.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}

populateTable();

function viewDetails(id) {
  console.log(id);
}

function getDateRange(event) {
  event.preventDefault();
//   const getSpinal = document.querySelector(".pagemodal");

//   getSpinal.style.display = "block";

  const start = document.querySelector(".start").value;
  const end = document.querySelector(".end").value;
  // console.log(start, end)

  if (start === "" || end === "") {
    alert("all fields are required");
    // getSpinal.style.display = "none";
  } else {
    const myToken = localStorage.getItem("token");

    const tokenHeader = new Headers();

    tokenHeader.append("Authorization", `Bearer ${myToken}`);

    const dateProfile = JSON.stringify({
      startdate: start,
      enddate: end,
    });

    const dateRequest = {
      method: "POST",
      headers: tokenHeader,
      body: dateProfile,
    };

    const url =
      "https://zlglobalalliance.com.ng/api/daterange-filter-medical-records?page=1";

    fetch(url, dateRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const patientsRecord = document.querySelector(".patData");

        if (result.records.rows.length === 0) {
          patientsRecord.innerHTML = "No Record Found";
        } else {
          result.records.rows.map((item) => {
            data += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.sex}</td>
                    <td>${item.age}</td>
                    <td>${item.cardnumber}</td>
                    <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                    <td><button class="delete" onclick="deleteDetails(${item.id})">delete</button></td>
                </tr>
            `
            
            patientsRecord.innerHTML = data;
          });
        //   getSpinal.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}
// const regTable = document.querySelector("#regTable");
// // const token =  localStorage.getItem('token');
// // console.log(token)
// regTable.addEventListener("click", function (event) {
//   // Stop the default submit and page load
//   event.preventDefault();

//   const id = document.querySelector("id").value;
//   const name = document.querySelector("name").value;
//   const cardNumber = document.querySelector("#cardNumber").value;
//   const phoneNumber = document.querySelector("#phoneNumber").value;
//   const sex = document.querySelector("#gender").value;

//   const token = localStorage.getItem("token");
//   console.log(token);

//   // Handle validations
//    axios
//    .get(
//     "https://zlglobalalliance.com.ng/api/get-medical-records?page=0",
//     {
//       id: id,
//       name: name,
//       cardnumber: cardNumber,
//       phonenumber: phoneNumber,
//       sex: sex

//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   .then((response) => {
//     console.log(response);
//     alert(`Form submitted successfully`)
//     //   localStorage.setItem('token', JSON.stringify(response.data.token));
//     // Handle response
//   });

// // localStorage.setItem('userEmail', email);
// // localStorage.setItem('userPassword',password);
// });
