window.addEventListener("load", (event) => {

  BlockIntersect();

}, false);


let prevRatio = 0.0;
let rotate = 0;
let scrollPos = window.pageYOffset;

function BlockIntersect() {

  var blocks = document.querySelectorAll('.text-cards-grid');
    
  if (blocks != null && blocks.length > 0) {
    blocks.forEach(function(background) {
      let test = createObserverBG(background);

    });
  }
}


function createObserverBG(boxElement) {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdListBG()
  };

  observer = new IntersectionObserver(handleIntersect, options);

  observer.observe(boxElement);

}


function buildThresholdListBG() {
  let thresholds = [];
  let numSteps = 20;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}


function handleIntersect(entries, observer) {

  scrollPos = window.pageYOffset;

  console.log(scrollPos);
  entries.forEach((entry, index) => {
    let target = entry.target;
    let inView = entry.isIntersecting;
    if (inView) {

      target.classList.remove('rotate-' + rotate);
      rotate += 1;
      target.classList.add('rotate-' + rotate);

    }

    prevRatio = entry.intersectionRatio;
    
  });


}