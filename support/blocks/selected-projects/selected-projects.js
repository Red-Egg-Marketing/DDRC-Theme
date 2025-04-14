import Swiper from 'swiper/bundle';

require('es6-promise/auto');



(function() {

	function FeatureCaseProjects() {
		let apiUrl = '/wp-json/providence/v2/projects';
		let parent = document.querySelector('.wp-block-ddrc-theme-blocks-selected-projects');
		let projects = document.querySelectorAll('.resources .project');
		var swiper = false;

  		if (projects && projects != null) {
  			projects.forEach(function(project){
  				var id = project.getAttribute('postid');
  				loadResources(project, id);
  			});
  			initializeSwiper();
  			buildNavigation();
  		
  		}

  		// need to fix then for ie
  		function loadResources(append, id) {
  			wp.apiRequest({ 
  				url: apiUrl + '?id=' + id + '&html=cards' 
  			}).then(function(resourcelist){
          		if (resourcelist != false ) {	
          			append.innerHTML = resourcelist;
          		}
  			});
  		}

  		function buildNavigation(){
  			let wrap = document.createElement('div');
  			let innerWrap = document.createElement('div');
  			let pagination = document.createElement('div');
  			pagination.setAttribute('class', 'title-pagination');
  			wrap.setAttribute('class', 'swiper navigation');
  			innerWrap.setAttribute('class', 'swiper-wrapper');
  			wrap.appendChild(innerWrap);
  			wrap.appendChild(pagination);
  			projects.forEach(function(project){
  				let button = document.createElement('div');
  				button.setAttribute('class', 'swiper-slide');
  				innerWrap.appendChild(button);
  			});
  			parent.appendChild(wrap);
  			let navSwiper =  new Swiper(wrap,
  				{
  					loop: false,
  					slidesPerView: 1,
  					pagination: {
  						el: ".title-pagination",
  						clickable: true
  					}
  				}
  			);
  			let bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
  			navSwiper.controller.control = swiper;
  			swiper.controller.control = navSwiper;
  			bullets.forEach(function(bullet, index){
  				let button = document.createElement('div');
  				let sup = document.createElement('h4');
  				let head = document.createElement('h3');
  				button.setAttribute('class', 'resource-card');
  				head.setAttribute('class', 'resource-title');
  				sup.setAttribute('class', 'tax-item');
  				let proj = projects[index].getAttribute('postid');
  				let title = projects[index].getAttribute('posttitle');
  				let cat = projects[index].getAttribute('postcat');
  				head.innerHTML = title;
  				sup.innerHTML = cat;
  				button.appendChild(sup);
  				button.appendChild(head);
  				bullet.appendChild(button);
  				// bullet.appendChild(tax);
  			});
  		}
		
		function initializeSwiper(){

			swiper = new Swiper('.wp-block-ddrc-theme-blocks-selected-projects .swiper.resources-wrap',
          		{
          			loop: false,
          			autoplay: true,
          			slidesPerView: 1,
          			effect: 'slide',
          			watchOverflow: true,
          			speed: 1500,
          			watchSlidesProgress: true 				
          		}
          	);
		}  		
	}

	FeatureCaseProjects();
	
})();