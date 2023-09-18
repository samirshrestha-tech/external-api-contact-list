let userList = [];
const listElm = document.getElementById("list");
const apiEp = "https://randomuser.me/api/?results=20";

const fetchUser = async (url) => {
  try {
    // promise method using fetch data from any server, fetch()
    //   fetch(url)
    //     .then((response) => {
    //     //   console.log(response);
    //       // returns the response from the web api and puts it as paramater in the then() function.
    //       return response.json();
    //       //   to grab the data we use the json method, we are pulling data from the response and giving data as object.
    //     })
    //     .then((data) => {
    //       userList = data.results;
    //       display(userList);
    //     });
    //   Async/Await

    const dt = await fetch(url);
    const data = await dt.json();
    userList = data.results;
    display(userList);
    //   console.log(data);
    //   console.log(dt);
  } catch (error) {
    console.log(error);
  }
};
fetchUser(apiEp);

// display function
const display = (users) => {
  let str = "";
  users.map((item, i) => {
    // console.log(item);
    str += ` <div class="card flex-grow-1" style="width: 18rem">
                <img
                  src="${item?.picture?.large}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">${item.name.title} ${item.name.first} ${item.name.last}</h5>
                  <ul class="list-unstyled">
                    <li><i class="fa-solid fa-mobile"> ${item.cell} </i></li>
                    <li><i class="fa-solid fa-envelope"></i> ${item.email} </li>
                    <li><i class="fa-solid fa-house"></i> ${item?.location?.street?.number} ${item?.location?.street?.name} ${item?.location?.city} ${item?.location?.state} ${item?.location?.postcode} ${item?.location?.country} </li>
                  </ul>
                </div>
              </div>
        `;
  });
  listElm.innerHTML = str;
  document.getElementById("count").innerHTML = users.length;
  //   console.log(users);
};

const handleOnGenderSelect = (e) => {
  const g = e.value;
  const url = `${apiEp}&gender=${g}`;
  fetchUser(url);
};

// const funct = (e) => {
//   const { value } = e.target;
//   console.log(e.value);
// };
document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  //   console.log(e.target.value);

  const filteredArg = userList.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last} `.toLowerCase();
    //   console.log(fullName);
    if (fullName.includes(value.toLowerCase())) {
      return true;
    }
  });
  display(filteredArg);
});
