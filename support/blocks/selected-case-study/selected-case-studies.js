require('es6-promise/auto');
import Swiper from 'swiper/bundle';

(function() {

	function FeatureCaseStudies() {
		const apiUrl = '/wp-json/providence/v2/case-studies';
		const grids = document.querySelectorAll('.selected-case-studies');

  		if (grids && grids != null) {
  			grids.forEach(function(grid){
  				var append = grid.querySelector('div[data-append]');
  				var cat = append.getAttribute('data-category');
  				loadResources(append, cat);
  			});
  		}
  		// need to fix then for ie
  		function loadResources(append, cat) {
  			wp.apiRequest({ 
  				url: apiUrl + '?category=' + cat + '&html=true'
  			}).then(function(resourcelist){
          		if (resourcelist != false ) {	

          			append.innerHTML = resourcelist;

          			new Swiper('.selected-case-studies .swiper', 
						{
							loop: false,
							slidesPerView: 1,
							autoplay: false,
							effect: 'slide',
							spaceBetween: 40,
							speed: 800,
							navigation: {
    							nextEl: '.swiper-button-next',
    							prevEl: '.swiper-button-prev',
  							},
						}
					);
          		}
  			});
  		}
  		
	}

	FeatureCaseStudies();
	
})();