//start of the game

let the_name = document.getElementById("name");
let email = document.getElementById("email");
let Amount = document.getElementById("Amount");
let submit = document.getElementById("submit");

let tbb = document.getElementById("tb");

//add employee to the system

let starts = document.querySelector(".st");

window.onload = function () {
  starts.focus();
};

let datapromax;
if (localStorage.staff != null) {
  datapromax = JSON.parse(localStorage.staff);
} else {
  datapromax = [];
}

if (datapromax.length == 0) {
  tbb.style.display = "none";
  document.write("<h1> NO DATA In the system yet </h1>");
}

submit.onclick = function () {
  let newdata = {
    name: the_name.value,
    email: email.value,
    Amount: Amount.value,
  };

  if (the_name.value !== "" && email.value !== "" && Amount.value !== "") {
    datapromax.push(newdata);
    // store the data in the local storage
    // stringify to convert the object to string
    localStorage.setItem("staff", JSON.stringify(datapromax));
    showdata();
  } else {
    //alert pop up message
    window.alert("Please fill in all the fields");
  }
};

//show staff

function showdata() {
  let table = "";
  for (let i = 0; i < datapromax.length; i++) {
    table += `
      <tr>
            <th>${datapromax[i].name}</th>
            <th>${datapromax[i].email}</th>
            <th>${datapromax[i].Amount}</th>
            <th><button onclick="updateData(${i})" id="update">UPDATE</button></th>
            <th><button onclick="deleteData(${i})" id="delete">DELETE</button></th>
      </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = table;
}
showdata();

//delete data

function deleteData(i) {
  datapromax.splice(i, 1);
  //to delete the data from the local storage
  localStorage.setItem("staff", JSON.stringify(datapromax));
  showdata();
}

//update data

function updateData(i) {
  the_name.value = datapromax[i].name;
  email.value = datapromax[i].email;
  Amount.value = datapromax[i].Amount;
  submit.innerHTML = "Submit";
  datapromax.splice(i, 1);
  mood = "update";
  localStorage.setItem("staff", JSON.stringify(datapromax));
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showdata();
}

// search

let serchMood = "searchName";
function getsearchMood(id) {
  let searching = document.getElementById("search");
  if (id == "searchName") {
    serchMood = "searchName";
  } else {
    serchMood = "searchEmail";
  }
  searching.focus();
}

//search function

function searchData(value) {
  let table = "";
  if (serchMood == "searchName") {
    for (let i = 0; i < datapromax.length; i++) {
      if (datapromax[i].name.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <th>${datapromax[i].name}</th>
            <th>${datapromax[i].email}</th>
            <th>${datapromax[i].Amount}</th>
            <th><button onclick="updateData(${i})" id="update">UPDATE</button></th>
            <th><button onclick="deleteData(${i})" id="delete">DELETE</button></th>
      </tr>
        `;
      }
      document.getElementById("tableBody").innerHTML = table;
    }
  } else {
    for (let i = 0; i < datapromax.length; i++) {
      if (datapromax[i].email.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <th>${datapromax[i].name}</th>
            <th>${datapromax[i].email}</th>
            <th>${datapromax[i].Amount}</th>
            <th><button onclick="updateData(${i})" id="update">UPDATE</button></th>
            <th><button onclick="deleteData(${i})" id="delete">DELETE</button></th>
      </tr>
        `;
      }
      document.getElementById("tableBody").innerHTML = table;
    }
  }
}
