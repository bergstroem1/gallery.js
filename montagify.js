var images = [];

function montagify(container, margin, reMontageOnResize, isResize) {

    if (reMontageOnResize == true) {
        window.onresize = function () { montagify(container, margin, true, true) };
    }

    if (!isResize) {
        images = [];
        //Collect all a tags
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].tagName == 'A') {
                images.push(container.childNodes[i]);
            }
        }

        //Set style height/width for the images
        for (var i = 0; i < images.length; i++) {
            images[i].childNodes[0].style.width = images[i].childNodes[0].clientWidth + "px";
            images[i].childNodes[0].style.height = images[i].childNodes[0].clientHeight + "px";
            images[i].childNodes[0].style.position = "relative";
        }
    }

    //Empty the container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var num_images = images.length;

    //Divide up the space
    divide(container, num_images, margin);

    var allContainers = container.getElementsByTagName('div');
    var imageContainers = [];
    //Collect all 'image-container'-elements
    for (var i = 0; i < allContainers.length; i++) {
        if (allContainers[i].className == 'image-container') {
            imageContainers.push(allContainers[i]);
        }
    }

    //Put the images into the 'image-container'-elements
    for (var i = 0; i < imageContainers.length; i++) {
        scaleImageToFit(imageContainers[i], images[i].childNodes[0]);

        imageContainers[i].appendChild(images[i]);
    }
}
function divide(parentContainer, numImagesLeft, margin) {
    if (numImagesLeft > 1) {
        var container1 = createDiv();
        var container2 = createDiv();

        cut(parentContainer, container1, container2, margin);

        var numImagesLeft1 = Math.ceil(numImagesLeft / 2);
        var numImagesLeft2 = Math.floor(numImagesLeft / 2);

        divide(container1, numImagesLeft1, margin);
        divide(container2, numImagesLeft2, margin);
    }
    else if (numImagesLeft == 1) {
        var container = document.createElement('div');

        container.style.width = parentContainer.clientWidth - margin * 2 + "px";
        container.style.height = parentContainer.clientHeight - margin * 2 + "px";
        container.style.margin = margin + "px";
        container.setAttribute("class", "image-container");
        /*container.style["background-color"] = "rgba(" + Math.round(Math.random() * 255) + ","
        + Math.round(Math.random() * 255) + ","
        + Math.round(Math.random() * 255) + ","
        + 1 + ")";*/
        parentContainer.appendChild(container);
    }
}

function cut(parentContainer, container1, container2) {
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

function createDiv() {
    var container = document.createElement('div');
    container.setAttribute("class", "box");
    return container;
}

function scaleImageToFit(container, image) {
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