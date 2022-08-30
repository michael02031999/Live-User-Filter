let personContainer = document.getElementById("personContainer");
let loading = document.getElementsByClassName("loading");
let actualSearchbar = document.getElementById("actualSearchbar");

async function getRandomUser() {
  personContainer.append(loading[0]);

  let people = await fetch("https://randomuser.me/api/?results=45")
    .then((response) => response.json())
    .then((data) => data);

  loading[0].remove();
  personContainer.style.height = "390px";

  for (let i = 0; i < people["results"].length; i++) {
    console.log(
      people["results"][i]["location"]["city"] +
        ", " +
        people["results"][i]["location"]["country"]
    );

    let individualPersonContainer = document.createElement("div");
    individualPersonContainer.classList.add("boxStyle");
    individualPersonContainer.classList.add("person");
    let pictureImage = document.createElement("img");
    pictureImage.src = people["results"][i]["picture"]["thumbnail"];
    pictureImage.style.borderRadius = "50%";
    pictureImage.style.height = "55px";
    pictureImage.style.width = "55px";
    pictureImage.style.display = "block";
    individualPersonContainer.append(pictureImage);

    let nameAndLocation = document.createElement("div");
    individualPersonContainer.append(nameAndLocation);

    let fullName =
      people["results"][i]["name"]["first"] +
      " " +
      people["results"][i]["name"]["last"];

    let fullLocation =
      people["results"][i]["location"]["city"] +
      ", " +
      people["results"][i]["location"]["country"];

    let name = document.createElement("div");
    name.classList.add("Name");
    let location = document.createElement("div");
    location.classList.add("Location");

    name.insertAdjacentText("beforeend", fullName);
    location.insertAdjacentText("beforeend", fullLocation);

    nameAndLocation.append(name);
    nameAndLocation.append(location);

    nameAndLocation.classList.add("nameLocation");

    nameAndLocation.style.width = "100%";

    nameAndLocation.style.padding = "7.5px";
    name.style.paddingBottom = "5px";
    name.style.fontSize = "16px";
    name.style.fontWeight = "700";

    location.style.fontSize = "12px";
    location.style.fontWeight = "400";

    personContainer.append(individualPersonContainer);
  }

  let allPersonContainers = document.querySelectorAll(".person");
  let allNames = document.querySelectorAll(".Name");
  let allLocations = document.querySelectorAll(".Location");

  //console.log(allPersonContainers);
  let arrayOfNamesandLocations = [];

  for (let i = 0; i < allPersonContainers.length; i++) {
    let individualNameAndLocation =
      allPersonContainers[i]["lastElementChild"]["firstElementChild"][
        "innerHTML"
      ] +
      " " +
      allPersonContainers[i]["lastElementChild"]["lastElementChild"][
        "innerHTML"
      ];

    /* console.log(
      allPersonContainers[i]["lastElementChild"]["firstElementChild"][
        "innerHTML"
      ] +
        " " +
        allPersonContainers[i]["lastElementChild"]["lastElementChild"][
          "innerHTML"
        ]
    ); */

    arrayOfNamesandLocations.push(individualNameAndLocation.toLowerCase());

    /* console.log(
      allPersonContainers[i]["lastElementChild"]["lastElementChild"][
        "innerHTML"
      ]
    ); */
  }
  //console.log(arrayOfNamesandLocations);
  /* console.log(allNames);
  console.log(allLocations);
 */
  actualSearchbar.addEventListener("keyup", searchbarFunc);

  let searchString = "";

  function searchbarFunc(e) {
    if (actualSearchbar.value == "") {
      console.log("this works ");
      for (let i = 0; i < allPersonContainers.length; i++) {
        //allPersonContainers[i].style.display = "flex";
      }
    }
    for (let i = 0; i < allPersonContainers.length; i++) {
      allPersonContainers[i].style.display = "none";
    }

    //actualSearchbar.value.toLowerCase();

    /* let match = arrayOfNamesandLocations.find((element) => {
      if (element.includes(actualSearchbar.value.toLowerCase())) {
        return true;
      }
    });

    console.log(match); */

    let matches = arrayOfNamesandLocations.filter((element) =>
      element.includes(actualSearchbar.value.toLowerCase())
    );

    console.log(matches.length);

    let arrayOfIndices = [];

    let indexNum;

    for (let i = 0; i < matches.length; i++) {
      indexNum = arrayOfNamesandLocations.indexOf(matches[i]);
      console.log(indexNum);

      allPersonContainers[indexNum].style.display = "flex";
      //arrayOfIndices.push(indexNum);
    }

    //console.log(arrayOfIndices);
  }
}

getRandomUser();
