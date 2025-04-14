require('es6-promise/auto');

(function() {

	function FeatureResourceLoader() {
		const apiUrl = '/wp-json/providence/v2/projects';
		const grids = document.querySelectorAll('.selected-resources');

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
  				url: apiUrl + '?ppp=4&category=' + cat + '&html=cards' + '&post_types=projects,post' + '&stacked=true' + '&excerpt=false' + '&read_more=Read More'
  			}).then(function(resourcelist){
          		if (resourcelist != false ) {	
          			append.innerHTML = resourcelist;
          		}
  			});
  		}
  		
	}

	FeatureResourceLoader();
	
})();