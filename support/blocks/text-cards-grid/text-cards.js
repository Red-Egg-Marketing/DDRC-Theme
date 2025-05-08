require('es6-promise/auto');

(function() {


  function ScrollBgEffect() {

    gsap.registerPlugin(ScrollTrigger);

    var bg = document.querySelectorAll('.text-cards-grid.with-bg-pinwheel');

    if (bg.length > 0 ) {
      bg.forEach(function(column, index) {

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: column,
            start: "top 100%",
            onUpdate: function(progress) {
              let degree = Math.round(360 * progress.progress);
              console.log(degree);

              column.setAttribute('rotate', degree);
              // animateFrom(progress, block, x);
            }
          }
        });

      }); 
    }
  }

  ScrollBgEffect();
  
})();