console.log("Working");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-profile_button");
const editProfileExit = editProfileModal.querySelector(".modal__exit");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post_button");
const newPostExit = newPostModal.querySelector(".modal__exit");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  console.log("opened");
});

editProfileExit.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostExit.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
