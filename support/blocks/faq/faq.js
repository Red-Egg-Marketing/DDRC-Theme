(function() {

	function faqFunctionality() {
		let faq = document.querySelectorAll('.faq');

		if (faq && faq.length > 0) {

			for (x = 0; x < faq.length; x++) {
				let f = faq[x];
				let head = f.querySelector('.header-title');
				head.addEventListener('click', eventToggleAnswer);
			}

		}

		function eventToggleAnswer() {
			// hide all faq
			let that = this;
			let parent = that.parentElement;
			for (x = 0; x < faq.length; x++) {
				let f = faq[x];
				let allToggles = f.querySelectorAll('div[data-toggled]');
				allToggles.forEach((toggle) => {
					if (toggle != parent){
						toggle.setAttribute('data-toggled', 'false');
					}
				});
			}

			let toggle = parent.getAttribute('data-toggled');
			if (toggle == "false") {
				parent.setAttribute('data-toggled', 'true');
			} else {
				parent.setAttribute('data-toggled', 'false');
			}
			parent.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});

		}
	}

	faqFunctionality();
})();