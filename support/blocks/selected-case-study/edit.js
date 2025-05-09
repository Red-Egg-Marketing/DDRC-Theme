const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
// import a component

const apiUrl  = '/wp-json/ddrc/v2/events';
const catUrl  = '/wp-json/wp/v2/donors';

const template = [
	['core/buttons']
]
const count = 3;
const buttonStyle = {
	"margin-left" : "15px"
}
const styleControls = {
	"margin-bottom" : "15px",
	"padding-top"		: "10px",
	"padding-bottom"		: "10px"
}
const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const EditSelectedCaseStudies = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const { resources, mainTitle, category, padding, blockId, margin } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-case-studies'
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentCats, activateCategories] = useState(false);
		const [tempSwip, activateSwipe] = useState(false);
		const [tempResources, activateResources] = useState(false);

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'block-' + clientId } );
        	}
    	}, [] );

		if ( (resources == undefined || resources.length == 0)) {

			wp.apiFetch({
				url: apiUrl + '?post_types=stories&ppp=10'
			}).then(resourcelist => {
				let posts = resourcelist;
				setAttributes({resources: posts });
				activateResources(posts);	
				activateSwipe(true);

			});

			return (
				<section { ...blockProps }>
					Loading Spotlight Stories...
				</section>
			);
				
		}

		if (currentCats == false || currentCats.length == 0) {
			wp.apiFetch({
				url: catUrl
			}).then(categories => {
				let cats = [];
				categories.forEach((category, index) => {
					if (index == 0) {
						cats[index] = {
							label: '--',
							value: ''
						}
					}
					cats[index + 1] = {	
						label: category.name,
						value: category.id,
					};
				});
				activateCategories(cats);
			});
		}

		const setCategoryPosts = (value) => {
			activateSwipe(false);
			wp.apiFetch({
				url: apiUrl + '?donor=' + value + '&post_types=stories&ppp=10'
			}).then(resourcelist => {
				setAttributes({resources: resourcelist });
				activateResources(resourcelist);
				activateSwipe(true);
			});

			setAttributes({
				category: value
			});

		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __('Select Donor')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Donor')}
							 value={ category }
							 options={
							 	currentCats
							 }
							 onChange={ setCategoryPosts }
						/>
						<PaddingSelector
							setAttributes={ setAttributes }
							padding={ padding }
							id={ 'block-' + clientId }
						/>
						<MarginSelector
							setAttributes={ setAttributes }
							margin={ margin }
							id={ 'block-' + clientId }
						/>
					</PanelBody>
				</InspectorControls>
				<section {...blockProps}>
					<div className="case-studies-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<div className="resources swiper">
							{ tempSwip == true && (
								<Fragment>
									<div className="swiper-wrapper">
											{ (tempResources.length > 0) && tempResources.map((resource, resourceIndex) => {
													let swip = new Swiper('.resources.swiper', 
														{
															loop: false,
															slidesPerView: 3,
															autoplay: false,
															effect: 'slide',
															spaceBetween: 15,
															speed: 1500,
															navigation: {
  															  nextEl: '.swiper-button-next',
  															  prevEl: '.swiper-button-prev',
  															},
														}
													);
													return (
														<Fragment>
															<ResourceCard
																resourceIndex={ resourceIndex }
																resourceURL={ resource.link }
																resourceID={ resource.ID }
																resourceImg={ resource.featured_image }
																resourceTitle={ resource.title  }
																resourceExcerpt={ resource.excerpt  }
																resourceClass="swiper-slide"
															/>
														</Fragment>
													)
												})
											}
											{ tempSwip && tempResources.length == 0 && (
												<Fragment>
													<div className="error">
														<h3>There are no available stories matching your filters. Please try something else.</h3>
													</div>
												</Fragment>
											)}
									</div>
									<div class="fa swiper-button-prev"></div>
  									<div class="fa swiper-button-next"></div>
  								</Fragment>
  							)}
							</div>
							<InnerBlocks
								template={ template }
								allowBlocks={['core/buttons']}
							/>
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedCaseStudies;