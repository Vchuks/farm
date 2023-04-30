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



const header = new Headers();
header.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE2ODI3ODgwNjl9.2_3_yniURb3EGrpX50I0HplmoXsEZSN688a-s3XN8CM`)

const reqq = {
    method: "GET",
    headers:header
}
const arr = []
function getPage(pagenum){
    fetch(`https://zlglobalalliance.com.ng/api/get-medical-records?page=${pagenum}`,reqq)
    .then(response=>response.json())
    .then(result=>{
        console.log(result)
        localStorage.setItem("pagenum",JSON.stringify(result.totalpages))
    })
}
getPage()

const getPageBtn = document.querySelector(".pagebtn");
const getArr = JSON.parse(localStorage.getItem("pagenum"))
for (let i =0; i < getArr; i++){
    arr.push(i)
}

arr.map(num=>{
    getPageBtn.innerHTML+=`<button onclick="getPage(${num})">${num + 1}</button>`
})






// SETTING PAGINATION FOR EACH PAGE
// selecting required element
const element = document.querySelector(".pagination ul");
let totalPages = 1000;
let page = 10;

//calling function with passing parameters and adding inside element which is ul tag
element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if(page > 1){ //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if(page > 2){ //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if(page == plength){ //if page is equal to plength than assign active string in the active variable
      active = "active";
    }else{ //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
    if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
