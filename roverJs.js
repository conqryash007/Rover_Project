// const roverOne = document.querySelector(".one");
// const roverTwo = document.querySelector(".two");
// const roverThree = document.querySelector(".three");
const launch = document.querySelector(".launch");
const text = document.querySelector(".text");
const roverClicked = document.querySelectorAll(".btn-rover");
const overlay = document.querySelector(".overlay");
const btnCont = document.querySelector(".btn-cont");
const inv = document.querySelectorAll(".inv");
const btnSol = document.querySelector(".btn-sol");
let btnCam = document.querySelector(".btn-cam");
const card1 = document.querySelector(".c-1");
const card2 = document.querySelector(".c-2");
let camInp = document.querySelector(".rover-cam");
const inpSol = document.querySelector(".inpSol");
const info = document.querySelector(".info");
const above = document.querySelector(".above");
const rovInfo = document.querySelector(".rov-info");
const btnPics = document.querySelector(".btn-pic");
//-------------launch button pressed--------//
launch?.addEventListener("click", function () {
  text.style.zIndex = 0;
  text.style.opacity = 0;
  overlay.style.zIndex = 1;
  btnCont.style.opacity = 100;
  btnCont.style.zIndex = 2;
});
let latestSpirit;
let latestOppor;
let latestCur;
let latestPer;
let userRover;
let url;
let finalUrl;
let cam;
let latestImg;
let sol;
let roverInfo;
let optSelect = ``;

fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/spirit/latest_photos`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    latestSpirit = data.latest_photos;
  });
fetch(
  `https://mars-photos.herokuapp.com/api/v1/rovers/opportunity/latest_photos`
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    latestOppor = data.latest_photos;
  });
fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    latestCur = data.latest_photos;
  });
fetch(
  `https://mars-photos.herokuapp.com/api/v1/rovers/perseverance/latest_photos`
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    latestPer = data.latest_photos;
  });

roverClicked.forEach((a) => {
  a.addEventListener("click", function () {
    userRover = a.value;
    url = `https://mars-photos.herokuapp.com/api/v1/rovers/${userRover}`;
    //when clicked add options
    if (userRover === "perseverance") {
      optSelect = `<select class="inp rover-cam" name="cam" id="">
            <option value="EDL_RUCAM">Rover Up-Look Camera</option>
            <option value="EDL_RDCAM">Rover Down-Look Camera</option>
            <option value="EDL_DDCAM">Descent Stage Down-Look Camera</option>
            <option value="EDL_PUCAM1">Parachute Up-Look Camera A</option>
            <option value="EDL_PUCAM2">Parachute Up-Look Camera B</option>
            <option value="NAVCAM_LEFT">Navigation Camera - Left</option>
            <option value="NAVCAM_RIGHT">Navigation Camera - Right</option>
            <option value="MCZ_RIGHT">Mast Camera Zoom - Right</option>
            <option value="MCZ_LEFT">Mast Camera Zoom - Left</option>
            <option value="FRONT_HAZCAM_LEFT_A">
              Front Hazard Avoidance Camera - Left
            </option>
            <option value="FRONT_HAZCAM_RIGHT_A">
              Rear Hazard Avoidance Camera - Left
            </option>
            <option value="REAR_HAZCAM_RIGHT">
              Rear Hazard Avoidance Camera - Right
            </option>
            <option value="SKYCAM">MEDA Skycam</option>
            <option value="SHERLOC_WATSON	">SHERLOC WATSON Camera</option>
          </select>
          <button class="btn-next btn-cam">NEXT</button>`;
    } else if (userRover === "curiosity") {
      optSelect = `
          <select class="inp rover-cam" name="cam" id="">
      <option value="FHAZ">Front Hazard Avoidance Camera</option>
      <option value="RHAZ">Rear Hazard Avoidance Camera</option>
      <option value="MAST">Mast Camera</option>
      <option value="CHEMCAM">Chemistry and Camera Complex</option>
      <option value="MAHLI">Mars Hand Lens Imager</option>
      <option value="MARDI">Mars Descent Imager</option>
      <option value="NAVCAM">Navigation Camera</option>
    </select>
    <button class="btn-next btn-cam">NEXT</button>
          `;
    } else {
      optSelect = `
          <select class="inp rover-cam" name="cam" id="">
      <option value="FHAZ">Front Hazard Avoidance Camera</option>
      <option value="RHAZ">Rear Hazard Avoidance Camera</option>
      <option value="NAVCAM">Navigation Camera</option>
      <option value="PANCAM">Panoramic Camera</option>
      <option value="MINITES">Miniature Thermal Emission Spectrometer</option>
    </select> 
    <button class="btn-next btn-cam">NEXT</button>
          `;
    }

    card2.insertAdjacentHTML("beforeend", optSelect);
    btnCam = document.querySelector(".btn-cam");
    btnCam.addEventListener("click", () => {
      card1.style.zIndex = 2;
      // card2.style = "transform:translateX(2000px)";
      card2.classList.add("inv");
      // alert("click");

      camInp = document.querySelector(".rover-cam");
    });
  });
});

roverClicked.forEach((a) => {
  a.addEventListener("click", function () {
    inv.forEach((b) => {
      b.classList.remove("inv");
    });
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        roverInfo = data.rover;
      });

    roverClicked.forEach((d) => {
      d.classList.add("inv");
    });
  });
});

info.addEventListener("", function () {});

let images;

btnSol.addEventListener("click", () => {
  card1.classList.add("inv");
  cam = camInp.value;
  sol = inpSol.value;
  finalUrl = `https://mars-photos.herokuapp.com/api/v1/rovers/${userRover}/photos?sol=${sol}`;
  // &camera=${cam}
  fetch(finalUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      images = data.photos;
    });
  fetch(
    `https://mars-photos.herokuapp.com/api/v1/rovers/${userRover}/latest_photos`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      latestImg = data.latest_photos;
    });
  above.style.zIndex = 5;
  overlay.classList.add("inv");
  // setTimeout(function () {
  //   above.insertAdjacentHTML(
  //     "afterbegin",
  //     `
  //     <img class="img-rov" src="${images[0].img_src}" >`
  //   );
  // }, 1000);
  rovInfo.insertAdjacentHTML(
    "afterbegin",
    `
  <h2 class="txt">${roverInfo.name}</h2>
        <h3 class="txt">LANDING DATE : ${roverInfo.landing_date}</h3>
        <h3 class="txt">LAUNCH DATE : ${roverInfo.launch_date}</h3>
        <h2 class="txt">MAX SOL : ${roverInfo.max_sol}</h2>
        <h1 class="txt">!!CLICK HERE!!</h1>
  `
  );
});

const crtRan = (max) => {
  return Math.trunc(Math.random() * max);
};

rovInfo.addEventListener("click", function () {
  // console.log(images);
  btnPics.style.display = "inline-block";
  overlay.classList.remove("inv");
  rovInfo.classList.add("inv");
  if (images.length == 0) {
    if (userRover === "spirit") {
      above.insertAdjacentHTML(
        "afterbegin",
        `
        <img class="img-rov" src="${latestSpirit[0].img_src}" >`
      );
    } else if (userRover === "perseverance") {
      above.insertAdjacentHTML(
        "afterbegin",
        `
        <img class="img-rov" src="${latestPer[0].img_src}" >`
      );
    } else if (userRover === "opportunity") {
      above.insertAdjacentHTML(
        "afterbegin",
        `
        <img class="img-rov" src="${latestOppor[0].img_src}" >`
      );
    } else {
      above.insertAdjacentHTML(
        "afterbegin",
        `
        <img class="img-rov" src="${latestCur[0].img_src}" >`
      );
    }
  } else {
    above.insertAdjacentHTML(
      "afterbegin",
      `
      <img class="img-rov" src="${images[0].img_src}" >`
    );
  }
});

document.querySelector(
  ".bg-image"
).style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
let i = 0;
btnPics.addEventListener("click", function () {
  btnPics.textContent = "NEXT";
  if (images.length == 0) {
    if (userRover === "spirit") {
      if (i > latestSpirit.length - 1) {
        i = 0;
      } else {
        i++;
      }
      above.insertAdjacentHTML(
        "beforeend",
        `
        <img class="img-rov" src="${latestSpirit[i].img_src}" >`
      );
    } else if (userRover === "perseverance") {
      if (i > latestPer.length - 1) {
        i = 0;
      } else {
        i++;
      }
      above.insertAdjacentHTML(
        "beforeend",
        `
        <img class="img-rov" src="${latestPer[i].img_src}" >`
      );
    } else if (userRover === "opportunity") {
      if (i > latestOppor.length - 1) {
        i = 0;
      } else {
        i++;
      }
      above.insertAdjacentHTML(
        "beforeend",
        `
        <img class="img-rov" src="${latestOppor[i].img_src}" >`
      );
    } else {
      if (i > latestCur.length - 1) {
        i = 0;
      } else {
        i++;
      }
      above.insertAdjacentHTML(
        "beforeend",
        `
        <img class="img-rov" src="${latestCur[i].img_src}" >`
      );
    }
  } else {
    if (i > images.length - 1) {
      i = 0;
    } else {
      i++;
    }
    above.insertAdjacentHTML(
      "beforeend",
      `
      <img class="img-rov" src="${images[i].img_src}" >`
    );
  }
});
