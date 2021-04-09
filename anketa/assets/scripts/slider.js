// slider 1 experience-js

var slider = new Slider({
  elem: document.querySelector('.experience-js .slider')
});

function Slider(options) {
  var elem = options.elem;
  var thumbElem = elem.querySelector('.slider__thumb');

  var sliderCoords, thumbCoords, shiftX, shiftY;

  elem.ondragstart = function() {
    return false;
  };

  elem.onmousedown = function(event) {
    if (event.target.closest('.slider__thumb')) {
      startDrag(event.clientX, event.clientY);
      return false; // disable selection start (cursor change)
    }
  }

  function startDrag(startClientX, startClientY) {
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    sliderCoords = elem.getBoundingClientRect();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }


  function moveTo(clientX) {
    // вычесть координату родителя, т.к. position: relative
    var newLeft = clientX - shiftX - sliderCoords.left;

    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = elem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElem.style.left = newLeft + 'px';
  }


  function onDocumentMouseMove(e) {
    moveTo(e.clientX);
  }

  function onDocumentMouseUp() {
    endDrag();
  }


  function endDrag() {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  }

}

// slider 2 experience-css
$(function() {
  $(".experience-css .slider").slider({
    value: 850,
    min: 0,
    max: 1000,
    step: 125
  });
});
