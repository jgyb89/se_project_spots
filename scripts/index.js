import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "./validations.js";

// -------- Card data --------
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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

// -------- Profile elements --------
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileNameInput = editProfileModal.querySelector("#name-input");
const editProfileDescInput = editProfileModal.querySelector("#desc-input");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");

const profileName = document.querySelector(".profile__user-name");
const profileDesc = document.querySelector(".profile__user-description");

// -------- New post elements --------
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post_button");
const newPostLinkInput = newPostModal.querySelector("#link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");
const newPostForm = newPostModal.querySelector("#new-post-form");
const cardSubmitButton = newPostModal.querySelector(".modal__button");

// -------- Preview elements --------
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// -------- Card template / list --------
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// -------- Modal helpers --------

// Named function for Escape key handler
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    // Find the currently open modal
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  // Add Escape key listener when modal opens
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  // Remove Escape key listener when modal closes
  document.removeEventListener("keydown", closeByEscape);
}

// Universal close button handler
document.querySelectorAll(".modal__close, .modal__exit").forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Optional: close when clicking the dark overlay
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// -------- Card listings --------
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Like toggle
  const likeButton = cardElement.querySelector(".card__favorite");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__favorite_active");
  });

  // Delete
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Preview
  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// -------- Reusable render function --------
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);

  if (typeof cardsList[method] === "function") {
    cardsList[method](cardElement);
  } else {
    // Fallback
    cardsList.appendChild(cardElement);
  }
}

// -------- Event wiring --------
// Open "New Post" modal
newPostBtn.addEventListener("click", () => openModal(newPostModal));

// Prefill + open "Edit Profile" modal
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;

  // Reset Edit form validation state and remove error messages on open.
  // We use the global 'settings' object defined in validations.js
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescInput],
    settings
  );

  openModal(editProfileModal);
});

// Submit: Edit Profile
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value.trim();
  profileDesc.textContent = editProfileDescInput.value.trim();
  closeModal(editProfileModal);
});

// Submit: New Post
newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const item = {
    link: newPostLinkInput.value.trim(),
    name: newPostCaptionInput.value.trim(),
  };
  renderCard(item, "prepend");

  // 1. Reset form fields (resets link and caption inputs)
  newPostForm.reset();

  // 2. Reset validation state and disable button
  const inputList = [newPostLinkInput, newPostCaptionInput];
  const submitButton = newPostModal.querySelector(
    settings.submitButtonSelector
  );

  // Clear errors and explicitly disable the button
  resetValidation(newPostForm, inputList, settings);
  disableButton(submitButton, settings);

  closeModal(newPostModal);
});

// -------- Initial render --------
initialCards.forEach((item) => renderCard(item, "append"));

enableValidation(settings);
