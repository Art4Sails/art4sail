/*
  Add photographs to images and list them in PHOTO_LIST.
  `src` is the thumbnail, `full` is the image shown in the viewer.
  Use matching image proportions if you want to minimize cropping in the uniform 4:3 grid.
*/
const PHOTO_LIST = [
  { src:"images/capelight200.webp", full:"images/capelight.webp", title:"Cape Light", category:"Sloops", location:"l18xh20", alt:"Cape Light" },
  { src:"images/approachingsails.webp", full:"images/approachingsails.webp", title:"Approaching Sails", category:"Sloops", location:"l20xh22", alt:"Mist and Waves" },
  { src:"images/perfectday.webp", full:"images/perfectday.webp", title:"Perfect Day", category:"Sloops", location:"l18xh20", alt:"Perfect day to sail" },
  { src:"images/racingsails.webp", full:"images/racingsails.webp", title:"Racing Sails", category:"Schooners", location:"l20xh24", alt:"Racing to the horizon" },
  { src:"images/safeharbor.webp", full:"images/safeharbor.webp", title:"Sails at rest", category:"Sloops", location:"l18xh20 ", alt:"Ships at rest" },
  { src:"images/squaredrigged.webp", full:"images/squaredrigged.webp", title:"Square Rigged", category:"Sloops", location:"l18xh20 ", alt:"Old quare rigged ship" },
  { src:"images/gaffrigged.webp", full:"images/gaffrigged.webp", title:"Gaff Rigged", category:"Sloops", location:"500jpg", alt:"Old gaff rigged ship" },
  { src:"images/fadeingsun.webp", full:"images/fadeingsun.webp", title:"Fadeing Sun", category:"Schooners", location:"l20xh24", alt:"Sun goes down after day on the water" },
  {src:"images/beachcruiseI.webp", full:"images/beachcruiseI.webp", title:"Beach Cruise", category:"Sloops", location:"l18xh20", alt:"Cruise along the shore" },
  { src:"images/beachcruiseII.webp", full:"images/beachcruiseII.webp", title:"Beach Cruise II", category:"Schooners", location:"l20xh24 ", alt:"Cruise along the shore" },
  
  {src:"images/seasquall_IIbig.webp", full:"images/seasquall_IIbig.webp", title:"Sea Squall", category:"Sloops", location:"l18xh20", alt:"Storm at Sea" },

  {src:"images/seastorm.webp", full:"images/seastorm.webp", title:"Sea Storm", category:"Sloops", location:"l18xh20", alt:"Rough Weather" },

  {src:"images/stormking.webp", full:"images/stormking.webp", title:"Storm King", category:"Sloops", location:"l18xh20", alt:"Rough Sailing" } ,
  
   {src:"images/yachtrace.webp", full:"images/yachtrace.webp", title:"Yacht Race", category:"Sloops", location:"l18xh20", alt:"Storm at Sea" },

  {src:"images/yachtraceII.webp", full:"images/yachtraceII.webp", title:"Yacht Race II", category:"Schooners", location:"l20xh24", alt:"Yacht Race II" },

  {src:"images/boathouse.webp", full:"images/boathouse.webp", title:"Boat House", category:"Sloops", location:"l18xh20", alt:"Rough Sailing" } 
  
];

const grid = document.querySelector("#galleryGrid");
const filters = document.querySelector("#categoryFilters");
const emptyMessage = document.querySelector("#emptyMessage");
const count = document.querySelector("#galleryCount");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxCounter = document.querySelector("#lightboxCounter");
let visiblePhotos = [];
let activeIndex = 0;

document.querySelector("#year").textContent = new Date().getFullYear();

[...new Set(PHOTO_LIST.map(p => p.category).filter(Boolean))]
  .sort((a,b) => a.localeCompare(b))
  .forEach(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.dataset.category = category;
    button.textContent = category === "Black & White" ? "Black & White" : category;
    button.type = "button";
    filters.append(button);
  });

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  filters.querySelectorAll(".filter-button").forEach(b => b.classList.toggle("active", b === button));
  renderGallery(button.dataset.category);
});

function renderGallery(category = "all") {
  visiblePhotos = PHOTO_LIST.filter(p => category === "all" || p.category === category);
  grid.replaceChildren();
  emptyMessage.hidden = visiblePhotos.length > 0;
  count.textContent = `${visiblePhotos.length} photograph${visiblePhotos.length === 1 ? "" : "s"}`;

  visiblePhotos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    button.type = "button";
    button.setAttribute("aria-label", `View ${photo.title || "photograph"}`);
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt || photo.title || "Portfolio photograph";
    img.loading = "lazy";
    img.decoding = "async";
    const title = document.createElement("span");
    title.className = "photo-title";
    title.textContent = photo.title || "Untitled";
    const location = document.createElement("span");
    location.className = "photo-category";
    location.textContent = photo.location || photo.category || "";
    button.append(img, title, location);
    button.addEventListener("click", () => openLightbox(index));
    grid.append(button);
  });
}
function openLightbox(index) {
  activeIndex = index;
  showPhoto();
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else lightbox.setAttribute("open", "");
}
function showPhoto() {
  const photo = visiblePhotos[activeIndex];
  if (!photo) return;
  lightboxImage.src = photo.full || photo.src;
  lightboxImage.alt = photo.alt || photo.title || "Portfolio photograph";
  lightboxCaption.textContent = [photo.title, photo.location].filter(Boolean).join(" — ");
  lightboxCounter.textContent = `${activeIndex + 1} / ${visiblePhotos.length}`;
}
function stepPhoto(direction) {
  if (!visiblePhotos.length) return;
  activeIndex = (activeIndex + direction + visiblePhotos.length) % visiblePhotos.length;
  showPhoto();
}
function closeLightbox() {
  if (typeof lightbox.close === "function") lightbox.close();
  else lightbox.removeAttribute("open");
}
document.querySelector("#closeLightbox").addEventListener("click", closeLightbox);
document.querySelector("#prevPhoto").addEventListener("click", () => stepPhoto(-1));
document.querySelector("#nextPhoto").addEventListener("click", () => stepPhoto(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") stepPhoto(-1);
  if (event.key === "ArrowRight") stepPhoto(1);
});
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
renderGallery();
