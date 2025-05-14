const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';
import ResourceCard from '../../components/ResourceCard.js';
const apiUrl  = '/wp-json/ddrc/v2/events';

const ResourcesRoot = document.querySelectorAll('.selected-case-studies');

const SaveSelectedProjects = ( {donor, append} ) => {
	  	
	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});

		React.useEffect( () => {

			if (resources === false) {
				data['ppp'] = 10;
				data['donor'] = donor;
				data['post_types'] = 'stories';
				setData(data);
    			wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			    data: data
    			}).then(resourcelist => {
    			    selectResources(resourcelist);
    			    new Swiper(append, 
						{
							loop: false,
							slidesPerView: 1,
							autoplay: true,
							effect: 'slide',
							spaceBetween: 15,
							speed: 1500,
							navigation: {
  							  nextEl: '.swiper-button-next',
  							  prevEl: '.swiper-button-prev',
  							},
							breakpoints: {
								768: {
									slidesPerView: 2
								},
								1200: {
									slidesPerView: 3,
									spaceBetween: 45
								}
							}
						}
					);
					if (resourcelist.length == 0) {
						setEmpty(true);
					}
    			});
  			}
  		}, [] );
		

		return (
			<Fragment>
				<div className="swiper-wrapper">
					{ (resourcesEmpty == false && resources.length > 0) && resources.map((resource, resourceIndex) => {
							return ( 
								<Fragment>
									<ResourceCard.View
										resourceIndex={ resourceIndex }
										resourceURL={ resource.link }
										resourceID={ resource.ID }
										resourceImg={ resource.featured_image }
										resourceTitle={ resource.title  }
										resourceExcerpt={ resource.excerpt }
										resourceClass="swiper-slide"
										displayButton={ false }
									/>
								</Fragment>
							)
						})
					}
					{ resourcesEmpty && (
						<Fragment>
							<div className="error">
								<h3>There are no available Stories matching your filters. Please try something else.</h3>
							</div>
						</Fragment>
					)}
				</div>
				<div class="fa swiper-button-prev"></div>
  				<div class="fa swiper-button-next"></div>
			</Fragment>
		);
}



ResourcesRoot.forEach((resource) => {
		let wrapper = resource.querySelector('.swiper');
		let cat = wrapper.getAttribute('data-donor');

		render(
			<SaveSelectedProjects 
				donor={ cat } 
				append={ wrapper } 
			/>,
			wrapper
		)
});
