#Gallery.js

Gallery.js generates collage-like galleries. Not fully working (yet)...

#Getting started
Load the script file in your html file.

This line creates a gallery from the element with id 'gallery'
`gallery.createGallery(document.getElementById('gallery'));`

The script expects the following structure to be found inside the element. The `a` tag can be skipped if you don't want the images to be links.

`<div id="gallery">
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
</div>`