document.addEventListener("DOMContentLoaded", () => {
  const usernameLoggedIn = localStorage.getItem("usernameLoggedIn");

  const instantFeedback = document.getElementById("instantFeedback");
  instantFeedback.style.display = "none";

  const twittForm = document.getElementById("twittForm");
  const ownerPhoto = document.getElementById("ownerPhoto");
  const twittsWrapper = document.getElementById("twittsWrapper");
  const twittContent = document.getElementById("twittContent");

  let selectedFeeling = null;

  const feelingItems = document.querySelectorAll(".item-feeling");

  feelingItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectedFeeling = item.getAttribute("data-feeling");

      feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]"));

      item.classList.add("border-[#1880e8]");
    });
  });

  const twittManager = new Twitt();
  const userManager = new User();

  const twittUsers = userManager.getUsers();

  const ownerLoggedIn = twittUsers.find(
    (user) => user.username.toLowerCase() === usernameLoggedIn.toLowerCase()
  );
  ownerPhoto.src = ownerLoggedIn.avatar;

  // membuat format tanggal yang disimpan speerti 'yyyy-mm-dd'
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  twittForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const twittData = {
      twittContent: twittContent.value,
      twittUsernameOwner: usernameLoggedIn,
      twittFeeling: selectedFeeling,
      twittCreatedAt: `${year}-${month}-${day}`,
    };

    const result = twittManager.saveTwitt(twittData);

    if (result.success) {
      instantFeedback.style.display = "none";
      twittContent.value = "";
      selectedFeeling = null;

      feelingItems.forEach((item) => {
        item.classList.remove("border-[#1880e8]");
      });

      displayAllTwitts(twittManager.getTwitts());
    } else {
      instantFeedback.style.display = "flex";
      instantFeedback.textContent = result.error;
    }
  });

  const existingTwitts = twittManager.getTwitts();
  const existingLoveTwitts = twittManager.getLoveTwitts();

  function displayAllTwitts(twitts = existingTwitts) {
    if (twitts.length === 0) {
      console.log("tidak ada twitts tersedia");
    } else {
      console.log("tersedia twitts siap digunakan");
      twittsWrapper.innerHTML = "";

      twitts.sort((a, b) => b.id - a.id);

      twitts.forEach((twitt) => {
        const ownerTwitt = twittUsers.find(
          (user) =>
            user.username.toLowerCase() ===
            twitt.twittUsernameOwner.toLowerCase()
        );

        const getAllLoveTwitts = existingLoveTwitts.filter(
          (loveTwitt) => loveTwitt.twittId === twitt.id
        );
        const countLoveTwitts = getAllLoveTwitts.length;

        const hasLiked = twittManager.userHasLikedTwittValidate(
          twitt.id,
          usernameLoggedIn
        );

        const itemTwitt = document.createElement("div");
        itemTwitt.className = "bg-primary p-4 border-b-2 border-line";
        itemTwitt.id = `twitt-${twitt.id}`;
        itemTwitt.innerHTML = `
                <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <img id="visitProfile-${
                              ownerTwitt.username
                            }" src="${ownerTwitt.avatar}" alt="search" srcset=""
                                class="object-cover w-[46px] h-[46px] rounded-full">
                            <div class="pl-2">
                                <div class="flex gap-1">
                                    <p class="text-base font-bold inline-block">${
                                      ownerTwitt.name
                                    } <img src="assets/verify.png"
                                            alt="" srcset="" class="inline w-5 h-5 rounded-full"> </p>
                                </div>
                                <p class="text-username text-sm">@${
                                  twitt.twittUsernameOwner
                                } • ${twitt.twittCreatedAt}</p>
                            </div>
                        </div>
                        <div
                            class="flex justify-center items-center rounded-full px-3 py-1.5 border-line border-2 gap-1.5">
                            <p class="text-sm font-semibold">${
                              twitt.twittFeeling
                            }</p>
                        </div>
                    </div>

                    <p class="pl-[55px] py-2.5 leading-7 text-base">
                        ${twitt.twittContent}
                    </p>

                    <div class="flex justify-between items-center pl-[55px] w-[484px]">
                        <div class="flex justify-center items-center gap-2.5 pr-[250px]">
                            <a id="loveTwitt-${
                              twitt.id
                            }" href="#" class="cursor flex justify-start items-center w-[93px] gap-1.5">
                                <img class="like-icon" src="assets/${
                                  hasLiked ? `heart-fill.svg` : `heart.svg`
                                }" alt="heart">
                                <p id="totalLikeThatTwitt" class="text-sm font-normal text-like">${countLoveTwitts} Likes
                                </p>
                            </a>
                            ${
                              twitt.twittUsernameOwner === usernameLoggedIn
                                ? `<a id="deleteTwitt-${twitt.id}" href="#" class="cursor flex justify-start items-center w-[93px] gap-1.5">
                                <img src="assets/trash.svg" alt="heart">
                                <p class="text-sm font-normal text-username">Delete</p>
                            </a>`
                                : `<a href="#" class="flex justify-start items-center w-[93px] gap-1.5">
                                <img src="assets/warning-2.svg">
                                <p class="text-sm font-normal text-username">Report</p>
                            </a>`
                            }
                        </div>
                    </div>
                `;

        twittsWrapper.appendChild(itemTwitt);

        itemTwitt
          .querySelector(`#visitProfile-${ownerTwitt.username}`)
          .addEventListener("click", function (event) {
            event.preventDefault();

            localStorage.setItem(
              "usernameProfileChosen",
              `${ownerTwitt.username}`
            );
            // arahkan pengguna kepada halaman lain yaitu login
            return (window.location.href = "../profile.html");
          });

        const totalLikeThatTwitt = itemTwitt.querySelector(
          "#totalLikeThatTwitt"
        );
        const likeIcon = itemTwitt.querySelector(".like-icon");

        // bikin event listener untuk fitur like
        itemTwitt
          .querySelector(`#loveTwitt-${twitt.id}`)
          .addEventListener("click", function (event) {
            event.preventDefault();

            const loveTwittData = {
              twittId: twitt.id,
              userId: usernameLoggedIn,
            };

            const result = twittManager.loveTwitt(loveTwittData);

            if (result.success) {
              let currentLikes = parseInt(totalLikeThatTwitt.textContent) || 0;
              totalLikeThatTwitt.textContent = currentLikes + 1 + " Likes";
              likeIcon.src = "assets/heart-fill.svg";
            } else {
              instantFeedback.style.display = "flex";
              instantFeedback.textContent = result.error;
            }
          });

        const deleteTwittButton = itemTwitt.querySelector(
          `#deleteTwitt-${twitt.id}`
        );

        if (deleteTwittButton) {
          deleteTwittButton.addEventListener("click", function (event) {
            event.preventDefault();
            const result = twittManager.deleteTwitt(twitt.id);
            if (result.success) {
              displayAllTwitts(twittManager.getTwitts());
            } else {
              instantFeedback.style.display = "flex";
              instantFeedback.textContent = result.error;
            }
          });
        }
      });
    }
  }

  displayAllTwitts();
});
