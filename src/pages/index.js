import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validations.js";

import Api from "../utils/Api.js";

import "./index.css";

// -------- API Instantiation --------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "594ccbee-3c58-44c3-9687-ba64e26ab126",
    "Content-Type": "application/json",
  },
});

// -------- Profile elements --------
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileNameInput = editProfileModal.querySelector("#name-input");
const editProfileDescInput = editProfileModal.querySelector("#desc-input");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const profileAvatar = document.querySelector(".profile__user-image");
const profileAvatarBtn = document.querySelector(".profile__avatar-edit"); //

const profileName = document.querySelector(".profile__user-name");
const profileDesc = document.querySelector(".profile__user-description");

// -------- Avatar elements --------
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector("#edit-avatar-form");
const editAvatarInput = editAvatarModal.querySelector("#avatar-link-input");

// -------- New post elements --------
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post_button");
const newPostLinkInput = newPostModal.querySelector("#link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");
const newPostForm = newPostModal.querySelector("#new-post-form");

// -------- Delete Confirmation elements --------
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const cancelDeleteBtn = deleteModal.querySelector(".modal__button_type_cancel");

// -------- Preview elements --------
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// -------- Card template / list --------
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// -------- State for deletion --------
let cardToDelete = null; // Stores { element, id } [cite: 185]

// -------- Initial Load --------
api
  .getAppInfo()
  .then(([userData, cards]) => {
    // Set user info
    profileName.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    // Render cards
    cards.forEach((item) => renderCard(item, "append"));
  })
  .catch((err) => {
    console.error(err);
  });

// -------- Modal helpers --------

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Universal close button handler
document.querySelectorAll(".modal__close, .modal__exit").forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// -------- Helper: Render Loading State  --------
function renderLoading(
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// -------- Card listings --------
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__favorite");
  const deleteButton = cardElement.querySelector(".card__delete");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Set initial like state
  if (data.isLiked) {
    likeButton.classList.add("card__favorite_active");
  }

  // Like handler [cite: 218]
  likeButton.addEventListener("click", () => {
    // Check if currently liked to decide API method
    const isLiked = likeButton.classList.contains("card__favorite_active");

    if (isLiked) {
      api
        .removeLike(data._id)
        .then((updatedCard) => {
          likeButton.classList.remove("card__favorite_active");
        })
        .catch(console.error);
    } else {
      api
        .addLike(data._id)
        .then((updatedCard) => {
          likeButton.classList.add("card__favorite_active");
        })
        .catch(console.error);
    }
  });

  // Delete handler [cite: 195, 202]
  deleteButton.addEventListener("click", () => {
    // Store the card details for the confirmation modal
    cardToDelete = { element: cardElement, id: data._id };
    openModal(deleteModal);
  });

  // Preview handler
  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  if (typeof cardsList[method] === "function") {
    cardsList[method](cardElement);
  } else {
    cardsList.appendChild(cardElement);
  }
}

// -------- Event wiring --------

// Open "New Post" modal
newPostBtn.addEventListener("click", () => {
  newPostForm.reset();
  resetValidation(
    newPostForm,
    [newPostLinkInput, newPostCaptionInput],
    settings
  );
  openModal(newPostModal);
});

// Open "Edit Profile" modal
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescInput],
    settings
  );
  openModal(editProfileModal);
});

// Open "Edit Avatar" modal
profileAvatarBtn.addEventListener("click", () => {
  editAvatarForm.reset();
  resetValidation(editAvatarForm, [editAvatarInput], settings);
  openModal(editAvatarModal);
});

// Submit: Edit Profile
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector(".modal__button");
  renderLoading(true, submitButton); //

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Submit: Edit Avatar [cite: 228]
editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = editAvatarForm.querySelector(".modal__button");
  renderLoading(true, submitButton);

  api
    .updateAvatar(editAvatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Submit: New Post
newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = newPostForm.querySelector(".modal__button");
  renderLoading(true, submitButton);

  api
    .addNewCards({
      link: newPostLinkInput.value.trim(),
      name: newPostCaptionInput.value.trim(),
    })
    .then((data) => {
      renderCard(data, "prepend");
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Add the click listener to close the modal
cancelDeleteBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// Submit: Delete Confirmation
deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!cardToDelete) return;

  const submitButton = deleteForm.querySelector(".modal__button");
  const originalText = submitButton.textContent;
  renderLoading(true, submitButton, originalText, "Deleting..."); // [cite: 274]

  api
    .deleteCard(cardToDelete.id)
    .then(() => {
      cardToDelete.element.remove(); // [cite: 214]
      closeModal(deleteModal);
      cardToDelete = null;
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, originalText);
    });
});

enableValidation(settings);
