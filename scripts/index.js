const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-profile_button");
const editProfileExit = editProfileModal.querySelector(".modal__exit");
const editProfileNameInput = editProfileModal.querySelector("#name-input");
const editProfileDescInput = editProfileModal.querySelector("#desc-input");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");

const profileName = document.querySelector(".profile__user-name");
const profileDesc = document.querySelector(".profile__user-description");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post_button");
const newPostExit = newPostModal.querySelector(".modal__exit");

const newPostLinkInput = newPostModal.querySelector("#link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");
const newPostForm = newPostModal.querySelector("#new-post-form");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileExit.addEventListener("click", () => closeModal(editProfileModal));
newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostExit.addEventListener("click", () => closeModal(newPostModal));

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
  openModal(editProfileModal);
});

function editProfileUpdate() {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileNameInput.value;
  profileDesc.textContent = editProfileDescInput.value;

  closeModal(editProfileModal);
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  console.log(newPostLinkInput.value);
  console.log(newPostCaptionInput.value);

  closeModal(newPostModal);
}
newPostForm.addEventListener("submit", handleNewPostFormSubmit);
