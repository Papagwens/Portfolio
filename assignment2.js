const carouse1 = document.querySelector(".carouse1"),
firstImg = carouse1.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 0;

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () => {
      if (icon.id === "left") {
         carouse1.scrollLeft -= firstImgWidth;
      } else {
         carouse1.scrollLeft += firstImgWidth;
      }
   });
});

const dragStart = (e) => {
   isDragStart = true;
   prevPageX = e.pageX;
   prevScrollLeft = carouse1.scrollLeft;
}
const dragging = (e) => {
   if(!isDragStart) return;
   e.preventDefault()
   carouse1.classList.add("dragging");
   let positionDiff = e.pageX - prevPageX;
   carouse1.scrollLeft = prevScrollLeft - positionDiff;
}
const dragStop = () => {
   isDragStart = false;
   carouse1.classList.remove("dragging");

}

carouse1.addEventListener("mousedown", dragStart);
carouse1.addEventListener("mousemove", dragging);
carouse1.addEventListener("mouseup", dragStop);

const images = carouse1.querySelectorAll("img");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const modalFavoriteBtn = document.getElementById("modal-favorite-btn");
const closeBox = document.getElementById("close-box");
const favoritesContainer = document.querySelector(".favorites-container");

const captions = [
   "Noble steed (Akita)",
   "Picture ready (Yorkie)",
   "Short legs, big heart ♥ (Corgi)",
   "Ready, set, go! (Rottweiler)",
   "Doggy on watch (Pitbull)",
   "Beware of dog!! (Chihuahua)",
   "I spy with my little eye (Cockapoo)",
   "Goldilocks (Toy Poodle)",
   "I'm all ears (German Shepherd)",
   "Reporting for duty, Sir! (Belgian Malinois)",
   "Rolls on rolls  (Bulldog)",
   "Hungry eyes (American Akita)",
   "Up all night to get lucky (Husky)",
   "Say cheese! ☺ (Golden Retriever)"
 ];
 
 images.forEach((image, index) => {
   image.addEventListener("click", () => {
     modalImage.src = image.src;
     modalCaption.innerText = captions[index];
     modal.style.display = "block";
   });
 });

closeBox.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


 
const addToFavorites = () => {
   const favoritesList = document.querySelector(".favorites-list");
   const imagesInFavorites = favoritesList.querySelectorAll("img");
   const modalImageSrc = modalImage.src;
 
   // Double check if the image is already in favourites
   for (let i = 0; i < imagesInFavorites.length; i++) {
     if (imagesInFavorites[i].src === modalImageSrc) {
       alert("This photo is already in your favorites.");
       return;
     }
   }
 
   // Check if number of favourites is less than 5
   if (favoritesList.children.length < 5) {
     const favoriteImageContainer = document.createElement("div"); // Create a container for the image and remove button
     favoriteImageContainer.classList.add("favorite-image-container"); // Add a class to the container element
 
     const favoriteImage = document.createElement("img");
     favoriteImage.src = modalImageSrc;
     favoriteImageContainer.appendChild(favoriteImage);
 
     const removeButton = document.createElement("button");
     removeButton.classList.add("remove-button"); // Add a class to the button element
     removeButton.innerText = "X";
     removeButton.type = "button";
     removeButton.addEventListener("click", (event) => {
       event.preventDefault();
       favoriteImageContainer.remove(); 
     });
 
     favoriteImageContainer.appendChild(removeButton); // Append the remove button after the image
 
     favoritesList.appendChild(favoriteImageContainer);
   } else {
     alert("You can only have up to 5 favorites. Please remove at least one favorite before adding another.");
   }
 };
 
 

 // Attach click event listener to favorite button
 modalFavoriteBtn.addEventListener("click", addToFavorites);

