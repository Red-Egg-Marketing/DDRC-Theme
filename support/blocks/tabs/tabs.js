(function() {

	function tabsFunctionality() {
		let tabs = document.querySelectorAll('.tabs');

		if (tabs && tabs.length > 0) {
			for (x = 0; x < tabs.length; x++) {
				let head = tabs[x].querySelectorAll('.header-title');
				let firstHead = tabs[x].querySelector('.tab:first-of-type .header-title');
				let wrap = tabs[x].querySelector('.tabs-wrap');
				let tab = tabs[x].querySelector('.tab');
				let first = tabs[x].querySelector('.tab:first-of-type .tab-content');
				let style = getComputedStyle(first);
				let position = style.position;
				let firstHeight = first.offsetHeight;
				tab.classList.add('loaded');
				if (position == 'absolute') {
					wrap.style.height = firstHeight + 'px';
				} else {
					wrap.style.height = 'auto';
				}
				firstHead.classList.add('active');
				for (z = 0; z < head.length; z++) {
					head[z].addEventListener('click', eventToggleTab);
				}
			}
		}

		function eventToggleTab() {
			let that = this;
			let parent = that.parentElement.parentElement;
			let allToggles = parent.querySelectorAll('.tab-content');
			let head = parent.querySelectorAll('.header-title');
			for (x = 0; x < head.length; x++) {
				head[x].classList.remove('active');
			}
			if (allToggles != null) {
				for (x = 0; x < allToggles.length; x++) {
					allToggles[x].setAttribute('data-toggled', false);
				}
			}
			that.classList.add('active');
			let currentToggle = that.nextElementSibling;
			let currentHeight = currentToggle.offsetHeight;
			let style = getComputedStyle(currentToggle);
			let position = style.position;
			if (position == 'absolute') {
				parent.style.height = currentHeight + 'px';
			} else {
				parent.style.height = 'auto';
			}
		}
	}

	tabsFunctionality();

})();