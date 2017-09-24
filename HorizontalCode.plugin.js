//META { "name": "HorizontalCode" } *//

var HorizontalCode = (function (){
  //var addListener;

  class HorizontalCode {
    getName() { return "HorizontalCode"; }

    getDescription() { return "Plugin for SparklingSkull."; }

    getAuthor() { return "spthiel"; };

    getVersion() { return "1.0.0"; }

    load(){}

    start() {
      //scrollH();
    }

    stop() {
      BdApi.clearCSS("HorizontalCode");
    }

    onSwitch() {
    }
  }
  
  function getCodeBelowMouse(e){
    
    var x = e.clientX,
        y = e.clientY,
        stack = [],
        elementMouseIsOver = document.elementFromPoint(x, y);

    stack.push(elementMouseIsOver);

    var currentStack = 0;
    var maxStack = 4;
    
    while (elementMouseIsOver.tagName !== 'HTML' && currentStack <= maxStack){

        currentStack = currentStack + 1;
    
        elementMouseIsOver.style.pointerEvents = 'none';
        elementMouseIsOver = document.elementFromPoint(x, y);

        stack.push(elementMouseIsOver);
        
        if(elementMouseIsOver.tagName == 'CODE'){
          break;
        }
    }
    var i  = 0,
        il = stack.length;

    for (; i < il; i += 1) {
        stack[i].style.pointerEvents = '';
    }

    return elementMouseIsOver.tagName == 'CODE' ? elementMouseIsOver : null;
  }
  
  function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var elementToScroll = getCodeBelowMouse(e)
        if(elementToScroll !== null){
          elementToScroll.scrollLeft -= (delta*40); // Multiplied by 40
          e.preventDefault();
        }
  }
  if (document.getElementById('app-mount').addEventListener) {
      // IE9, Chrome, Safari, Opera
      document.getElementById('app-mount').addEventListener("mousewheel", scrollHorizontally, false);
      // Firefox
      document.getElementById('app-mount').addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
      // IE 6/7/8
      document.getElementById('app-mount').attachEvent("onmousewheel", scrollHorizontally);
  }

  return HorizontalCode;
})();
