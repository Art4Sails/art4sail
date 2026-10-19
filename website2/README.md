# Minimalist Photography Portfolio — Uniform Grid

Responsive static website for a personal photo portfolio. Includes a clean white design, wide hero banner, category filters, equal-size 4:3 thumbnails, captions, and a full-screen image viewer.

## Preview
Open `index.html` in a current web browser. The sample photo files are placeholders and are not included, so add your own images.

## Add photographs
1. Put your photos in `images/`.
2. Rename them to match the sample filenames (`photo-01.jpg` through `photo-08.jpg`) or update `PHOTO_LIST` in `script.js` to use your filenames.
3. For the wide hero banner, add `images/hero.jpg`.
4. Update titles, categories, locations, and alt text in `script.js`.

Example:
```js
{ src: "images/sailing-small.jpg",
  full: "images/sailing.jpg",
  title: "Sailing at Sunset",
  category: "Sailing",
  location: "Kotor Bay, Montenegro",
  alt: "Sailboat crossing the bay at sunset" }
```

## Uniform thumbnail grid
All thumbnails share a 4:3 frame and use `object-fit: cover`, so every row is aligned and tidy. This may crop a little from the sides or top/bottom of images with different proportions, but it never stretches or distorts them. The full-size viewer shows the full image within the screen.

## Personalize
In `index.html`, replace `YOUR NAME`, update the About text, and change `you@example.com` to your public contact email.

## Publish
Upload `index.html`, `styles.css`, `script.js`, and the `images/` folder to a static web host. HTTPS is recommended. No database, shopping cart, or payment processing is required.

## Notes
The Google Fonts import requires an internet connection. Remove the `@import` line from `styles.css` if you prefer local fallback fonts and no external font request. Consider removing GPS/EXIF metadata from images before publishing.
