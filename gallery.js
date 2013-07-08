
var gallery =  (function() {
	var _options = {};

	var _gallery = {};

	/* Private methods */

	// Makes a horizontal or vertical cut depending on the aspect ratio of the parent container.
	function cut(parentContainer, container1, container2) {
		var parentWidth = parentContainer.clientWidth;
		var parentHeight = parentContainer.clientHeight;

		var aspect = (parentWidth / parentHeight);

		//Do vertical cut
		if (aspect > 1) {
			var cutRatio = 0.4 + Math.random() * (0.2);

			container1.style.width = Math.floor(100 * cutRatio) + "%";
			container1.style.height = "100%";
			container2.style.width = Math.ceil(100 * (1 - cutRatio)) + "%";
			container2.style.height = "100%";
		}
		else { // Horizontal cut
			var cutRatio = 0.4 + Math.random() * (0.2);

			container1.style.width = "100%";
			container1.style.height = Math.floor(100 * cutRatio) + "%";
			container2.style.width = "100%";
			container2.style.height = Math.ceil(100 * (1 - cutRatio)) + "%";
		}

		parentContainer.appendChild(container1);
		parentContainer.appendChild(container2);
	}

	// Recursive method that divides the parent container until there
	// is a container for every image.
	function divide(parentContainer, numImagesLeft, margin) {
		if (numImagesLeft > 1) {

			var container1 = document.createElement('div');
			container1.style.position = "relative";
			container1.style.cssFloat = "left";

			var container2 = document.createElement('div');
			container2.style.position = "relative";
			container2.style.cssFloat = "left";
			
			cut(parentContainer, container1, container2, margin);

			var numImagesLeft1 = Math.ceil(numImagesLeft / 2);
			var numImagesLeft2 = Math.floor(numImagesLeft / 2);

			divide(container1, numImagesLeft1, margin);
			divide(container2, numImagesLeft2, margin);
		}
		else if (numImagesLeft == 1) {
			var container = document.createElement('div');
			container.style.position = "absolute";
			container.style.left = 0;
			container.style.right = 0;
			container.style.top = 0;
			container.style.bottom = 0;
			container.style.margin = margin;
			container.style.overflow = "hidden";
			container.style.backgroundSize = "cover";
			container.style.backgroundPosition = "center center";
			container.style.backgroundClip = "content-box";
			container.className = "gallery-image-container";

			parentContainer.appendChild(container);
		}
	}

	function findNodeWithTagName(node, tagName) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			findNodeWithTagName(child, tagName);
			if(child.tagName.toLowerCase() == tagName) {
				return child;
			}
		}
	}

	this.createCaption = function(imageContainer, text, showCaptionOnHover) {
		
		var captionBox = document.createElement('div');
		captionBox.style.backgroundColor = "rgba(0,0,0,0.5)";
		captionBox.style.position = "absolute";
		captionBox.style.width = "100%";
		captionBox.style.padding = "5px";
		captionBox.style["box-sizing"] = "border-box";
		captionBox.style["-webkit-box-sizing"] = "border-box";
		captionBox.style["-moz-box-sizing"] = "border-box";
		captionBox.style.color = "white";
		captionBox.className = "gallery-caption";
		var caption = document.createTextNode(text);
		captionBox.appendChild(caption);
		imageContainer.appendChild(captionBox);
		
		if(showCaptionOnHover){
			captionBox.style.bottom = -captionBox.clientHeight + "px";
			captionBox.style['-webkit-transition'] = "bottom 0.25s ease-in";
			captionBox.style['-moz-transition'] = "bottom 0.25s ease-in";
			captionBox.style['-o-transition'] = "bottom 0.25s ease-in";
			captionBox.style['transition'] = "bottom 0.25s ease-in";
			
			imageContainer.onmouseover = function(e) {
				captionBox.style.bottom = "0px";
			}
			imageContainer.onmouseout = function(e){
				captionBox.style.bottom = -captionBox.clientHeight + "px";
			}
		}
		else captionBox.style.bottom = "0px";
	}

	function createRandomTiles(target, galleryItems, margin) {
		var num_images = galleryItems.length;

		//Divide up the space
		divide(target, num_images, margin);

		//Collect all 'image-container'-elements
		var allContainers = target.getElementsByTagName('div');
		var imageContainers = [];

		for (var i = 0; i < allContainers.length; i++) {
			if (allContainers[i].className == 'gallery-image-container') {
				imageContainers.push(allContainers[i]);
			}
		}
		
		//Put the images into the 'image-container'-elements
		for (var i = 0; i < imageContainers.length; i++) {

			imageContainers[i].style.backgroundImage = "url(" + galleryItems[i].imgSrc + ")";
			
			
			if(_options.caption == true)
				createCaption(imageContainers[i], galleryItems[i].imgAlt, _options.showCaptionOnHover);
		}
	}

	// Public methods

	_gallery.createGallery = function(target, options) {

		//Load options
		_options.caption = options.caption || false;
		_options.showCaptionOnHover = options.showCaptionOnHover || false;
		_options.margin = options.margin || "2px";


		_gallery.target = target;
		_gallery.galleryItems = [];

		//Collect all gallery items in target
		for (var i = 0; i < _gallery.target.childNodes.length; i++) {
			if (_gallery.target.childNodes[i].tagName != undefined) {
				var item = {};

				// Find a href
				if(	_gallery.target.childNodes[i].tagName.toLowerCase() == 'a' && 
						_gallery.target.childNodes[i].href != undefined &&
						_gallery.target.childNodes[i].href != "") {
						
					item.linkUrl = _gallery.target.childNodes[i].href;
				}

				// Find first image in each and save url and alt text
				var img = findNodeWithTagName(_gallery.target.childNodes[i], "img");
				item.imgSrc = img.src;
				item.imgAlt = img.alt;

				_gallery.galleryItems.push(item);
			}
		}

		// Empty the container
		while (_gallery.target.firstChild) {
			_gallery.target.removeChild(_gallery.target.firstChild);
		}

		createRandomTiles(_gallery.target, _gallery.galleryItems, _options.margin);
	}

	return _gallery;
})();