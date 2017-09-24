//META { "name": "HorizontalCode" } *//

var HorizontalCode = (function (){
  //var addListener;

  class HorizontalCode {
    getName() { return "HorizontalCode"; }

    getDescription() { return "Plugin for horizontal Scrolling in Codeblocks. (Made for Infiniti#9714)"; }

    getAuthor() { return "spthiel"; };

    getVersion() { return "1.0.0"; }

    load(){}

    start() {
      if (document.getElementById('app-mount').addEventListener) {
          // IE9, Chrome, Safari, Opera
          document.getElementById('app-mount').addEventListener("mousewheel", scrollHorizontally, false);
          // Firefox
          document.getElementById('app-mount').addEventListener("DOMMouseScroll", scrollHorizontally, false);
      } else {
          // IE 6/7/8
          document.getElementById('app-mount').attachEvent("onmousewheel", scrollHorizontally);
      }
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
        elementMouseIsOver = document.elementFromPoint(x, y);


    var currentStack = 0;
    var maxStack = 10;
    
    while (elementMouseIsOver.tagName !== 'HTML' && currentStack <= maxStack){

        currentStack = currentStack + 1;
    
        if(elementMouseIsOver.tagName == 'CODE'){
          return elementMouseIsOver;
        }
        
        elementMouseIsOver = elementMouseIsOver.parentElement;

        
    }

    return null;
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

  return HorizontalCode;
})();
