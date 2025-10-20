// Card Array
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Form Variables
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

// Open Modal Function
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

const cardName = initialCards.map(function (item) {
  return item.name;
});

cardName.forEach(function (name) {
  console.log(name);
});
