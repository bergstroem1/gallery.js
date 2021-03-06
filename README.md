#Gallery.js

Gallery.js generates collage-like galleries.

#Getting started
Load the script file in your html file.

This line creates a gallery from the element with id 'gallery'
```javascript
gallery.createGallery(document.getElementById('gallery'));
```

The script expects the following structure to be found inside the element. The `a` tag can be skipped if you don't want the images to be links. You can even mix, with some items having an `a` tag and some not having it.

```html
<div id="gallery">
        <a><img src="images/1.jpg" alt="Bild 1"/></a>
        <a><img src="images/2.jpg" alt="Bild 2"/></a>
        <a><img src="images/3.jpg" alt="Bild 3"/></a>
        <a><img src="images/4.jpg" alt="Bild 4"/></a>
        <a><img src="images/5.jpg" alt="Bild 5"/></a>
        <a><img src="images/6.jpg" alt="Bild 6"/></a>
        <a><img src="images/7.jpg" alt="Bild 7"/></a>
        <a><img src="images/8.jpg" alt="Bild 8"/></a>
        <a><img src="images/9.jpg" alt="Bild 9"/></a>
        <a><img src="images/10.jpg" alt="Bild 10"/></a>
        <a><img src="images/11.jpg" alt="Bild 11"/></a>
        <a><img src="images/12.jpg" alt="Bild 12"/></a>
</div>
```

It is possible to specify options for the gallery through a second parameter. The following code sets the margin for the images to 2%:

```javascript
gallery.createGallery(document.getElementById('gallery'), {margin: "2%"});
```

The alt text can be used to show a caption for each image. This is also done through the options parameter: 

```javascript
gallery.createGallery(document.getElementById('gallery'), {margin: "2%", caption: true});
```

If you set `showCaptionOnHover` to `true` the captions will only show when you hover the image:

```javascript
gallery.createGallery(document.getElementById('gallery'), {margin: "2%",  caption: true, showCaptionOnHover: true});
```

#Styling
Styling the gallery can easily be done with css. Gallery.js assigns the classname `gallery-image-container` to every image container. The following example shows how to add rounded corners to the images in the gallery.

```css
.gallery-image-container {
        border-radius: 10px;
}
```

The captions can also be styled through the `.gallery-caption` selector.