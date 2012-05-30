
function Montage(container) {
	this.container = container;
	this.prevWidth = container.clientWidth;
	this.prevHeight = container.clientHeight;
	
	this.montageType = "randomTiles";
	this.caption = false;
	this.showCaptionOnHover = false;
	this.numColumns = 4;
	this.minColumnWidth;
	this.margin = 2;
	
	this.images = [];
	this.isCreated = false;
	
	//Rebuild the montage
	this.rebuild = function() {
		//Check if size has been changed otherwise rebuild isn't necessary
		if(this.prevWidth != this.container.clientWidth || this.prevHeight != this.container.clientHeight) {
			
			this.createMontage({
				montageType: this.montageType, 
				caption: this.caption, 
				showCaptionOnHover: this.showCaptionOnHover,
				numColumns: this.numColumns,
				minColumnWidth: this.minColumnWidth,
				margin: this.margin
			});
			this.prevWidth = this.container.clientWidth;
	        this.prevHeight = this.container.clientHeight;
		}
	}
	
	this.createMontage = function(settings) {
		//Retrieve settings
		if(typeof settings != 'undefined') {
			this.montageType = settings.montageType || this.montageType;
			this.caption = settings.caption || this.caption;
			this.showCaptionOnHover = settings.showCaptionOnHover || this.showCaptionOnHover;
			this.numColumns = settings.numColumns || this.numColumns;
			this.minColumnWidth = settings.minColumnWidth || undefined;
			this.margin = settings.margin || this.margin;
		}
		
		//If a montage hasn't been created before, do preparation
		if(this.isCreated == false) {
			//Collect all a tags
			for (var i = 0; i < this.container.childNodes.length; i++) {
				if (this.container.childNodes[i].tagName != undefined) {
					this.images.push(container.childNodes[i]);
				}
			}

			//Set style height/width for the images
			for (var i = 0; i < this.images.length; i++) {
				this.images[i].childNodes[0].style.width = this.images[i].childNodes[0].clientWidth + "px";
				this.images[i].childNodes[0].style.height = this.images[i].childNodes[0].clientHeight + "px";
				this.images[i].childNodes[0].style.position = "relative";
			}
		}
		
		//Empty the container
		while (this.container.firstChild) {
			this.container.removeChild(this.container.firstChild);
		}
		
		//Create the montage depending on type
		if(this.montageType == "randomTiles")
			this.createRandomTiles();
		else if(this.montageType == "columnMontage")
			this.createColumnMontage();
		
		this.isCreated = true;
	}
	
	this.createColumnMontage = function(){
		//Calculate numColumns if minColumnWidth is set
		if(this.minColumnWidth != undefined) {
			var totalWidth = this.container.clientWidth;
			this.numColumns = Math.floor(totalWidth / this.minColumnWidth);
		}
		
		//Create the columns
		var cols = [];
		var colWidth = this.container.clientWidth / this.numColumns;
		
		for(var i = 0; i < this.numColumns; i++) {
			var col = document.createElement('div');
			col.style.width = colWidth - this.margin * 2 + "px";
			col.style.margin = this.margin + "px";
			col.style.display = "inline-block";
			col.style.verticalAlign = "top";
			col.className = "montage-column";
			cols.push(col);
			container.appendChild(col);
		}
		
		var colNum = 0;
		if(this.numColumns > 0) {
			for(var i = 0; i < this.images.length; i++) {
				colNum = i % this.numColumns;
				
				var image = this.images[i].childNodes[0];
				image.style.width = "100%";
				image.style.removeProperty('height');
				
				var mainContainer = document.createElement('div');
				mainContainer.className = "montage-image-main-container";
				var imageContainer = document.createElement('div');
				imageContainer.className = "montage-image-container";
				imageContainer.appendChild(this.images[i]);
				mainContainer.appendChild(imageContainer);
				
				if(this.caption){
					var descriptionContainer = document.createElement('div');
					descriptionContainer.className = "montage-image-description-container";
					var description = document.createTextNode(image.alt);
					descriptionContainer.appendChild(description);
					descriptionContainer.style.position = "relative";
					descriptionContainer.style.top = "0px";
					
					mainContainer.appendChild(descriptionContainer);
				}
				
				cols[colNum].appendChild(mainContainer);
			}
		}
	}
	
	this.createRandomTiles = function(){
		var num_images = this.images.length;

		//Divide up the space
		this.divide(this.container, num_images, this.margin);

		var allContainers = this.container.getElementsByTagName('div');
		var imageContainers = [];
		//Collect all 'image-container'-elements
		for (var i = 0; i < allContainers.length; i++) {
			if (allContainers[i].className == 'montage-image-container') {
				imageContainers.push(allContainers[i]);
			}
		}

		//Put the images into the 'image-container'-elements
		for (var i = 0; i < imageContainers.length; i++) {
			this.scaleImageToFit(imageContainers[i], this.images[i].childNodes[0]);

			imageContainers[i].appendChild(this.images[i]);
			
			if(this.caption == true)
				this.createCaption(imageContainers[i], this.images[i], this.showCaptionOnHover);
		}
	}
	
	this.createCaption = function(imageContainer, image, showCaptionOnHover) {
	
		var captionBox = document.createElement('div');
		captionBox.style.backgroundColor = "rgba(0,0,0,0.5)";
		captionBox.style.position = "absolute";
		captionBox.style.width = imageContainer.clientWidth - 10 + "px";
		captionBox.style.padding = "5px";
		captionBox.style.color = "silver";
		var caption = document.createTextNode(image.childNodes[0].getAttribute('alt'));
		captionBox.appendChild(caption);
		imageContainer.appendChild(captionBox);
		
		if(this.showCaptionOnHover){
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
	
	this.divide = function(parentContainer, numImagesLeft, margin) {
		if (numImagesLeft > 1) {
			var container1 = document.createElement('div');
			container1.style.position = "relative";
			container1.style.float = "left";
			var container2 = document.createElement('div');
			container2.style.position = "relative";
			container2.style.float = "left";
			
			this.cut(parentContainer, container1, container2, margin);

			var numImagesLeft1 = Math.ceil(numImagesLeft / 2);
			var numImagesLeft2 = Math.floor(numImagesLeft / 2);

			this.divide(container1, numImagesLeft1, margin);
			this.divide(container2, numImagesLeft2, margin);
		}
		else if (numImagesLeft == 1) {
			var container = document.createElement('div');
			container.style.position = "relative";
			container.style.width = parentContainer.clientWidth - margin * 2 + "px";
			container.style.height = parentContainer.clientHeight - margin * 2 + "px";
			container.style.margin = margin + "px";
			container.style.overflow = "hidden";
			container.className = "montage-image-container";
			parentContainer.appendChild(container);
		}
	}
	
	this.cut = function(parentContainer, container1, container2) {
		var verticalOrHorizontalCut = Math.random();

		var parentWidth = parentContainer.clientWidth;
		var parentHeight = parentContainer.clientHeight;

		var aspect = (parentWidth / parentHeight);

		//Do vertical cut
		if (verticalOrHorizontalCut < (0.5 * aspect)) {
			var cutRatio = 0.4 + Math.random() * (0.2);

			var width1 = Math.floor(parentWidth * cutRatio);
			var width2 = Math.ceil(parentWidth * (1 - cutRatio));

			container1.style.width = width1 + "px";
			container1.style.height = parentHeight + "px";
			container2.style.width = width2 + "px";
			container2.style.height = parentHeight + "px";
		}
		else { // Horizontal cut
			var cutRatio = 0.4 + Math.random() * (0.2);

			var height1 = Math.floor(parentHeight * cutRatio);
			var height2 = Math.ceil(parentHeight * (1 - cutRatio));

			container1.style.width = parentWidth + "px";
			container1.style.height = height1 + "px";
			container2.style.width = parentWidth + "px";
			container2.style.height = height2 + "px";
		}

		parentContainer.appendChild(container1);
		parentContainer.appendChild(container2);
	}
	
	this.scaleImageToFit = function(container, image) {
		var widthScaledByHeight = image.style.width.split("px")[0] * container.clientHeight / image.style.height.split("px")[0];

		if (widthScaledByHeight < container.clientWidth) {
			var aspectRatio = image.style.height.split("px")[0] / image.style.width.split("px")[0];
			image.style.width = container.clientWidth + "px";
			image.style.height = container.clientWidth * aspectRatio + "px";
			//Center image vertically
			heightDiff = container.clientHeight - image.style.height.split("px")[0];
			image.style.top = heightDiff / 2 + "px";
			image.style.left = "0px";
		}
		else {
			var aspectRatio = image.style.width.split("px")[0] / image.style.height.split("px")[0];
			image.style.height = container.clientHeight + "px";
			image.style.width = container.clientHeight * aspectRatio + "px";
			//Center image horizontally
			var widthDiff = container.clientWidth - image.style.width.split("px")[0];
			image.style.left = widthDiff / 2 + "px";
			image.style.top = "0px";
		}
	}
}
