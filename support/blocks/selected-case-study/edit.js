const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
// import a component

const apiUrl  = '/wp-json/providence/v2/projects';
const catUrl  = '/wp-json/wp/v2/categories';

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

const EditSelectedCaseStudies = ( { setAttributes, attributes, isSelected } ) => {

		const { resources, anchor, mainTitle, category } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-case-studies'
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentCats, activateCategories] = useState(false);

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}

		if ( (resources == undefined || resources.length == 0)) {

			wp.apiFetch({
				url: apiUrl + '?&html=cards'
			}).then(resourcelist => {
				let posts = resourcelist;
				setAttributes({resources: posts });
			});

			return (
				<section { ...blockProps }>
					Loading Projects...
				</section>
			);
				
		}

		if (currentCats == false || currentCats.length == 0) {
			wp.apiFetch({
				url: catUrl
			}).then(categories => {
				let cats = [];
				categories.forEach((category, index) => {
					cats[index] = {	
						label: category.name,
						value: category.id,
					};
				});
				activateCategories(cats);
			});
		}

		const setCategoryPosts = (value) => {

			wp.apiFetch({
				url: apiUrl + '?category=' + value + '&html=true'
			}).then(resourcelist => {
			
				setAttributes({resources: resourcelist });

			});

			setAttributes({
				category: value
			});

		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __('Select Category')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Cateogry')}
							 value={ category }
							 options={
							 	currentCats
							 }
							 onChange={ setCategoryPosts }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'HTML Anchor' ) }
						initialOpen={ false }
					>
							<TextControl
								label={ __( 'HTML Anchor' ) }
								value={ anchor }
								onChange={ ( anchor ) => updateAnchor( anchor ) }
								help={__('Enter a word or two — without spaces — to make a unique web address just for this heading, called an “anchor.”')}
							/>
						
					</PanelBody>
				</InspectorControls>
				<section {...blockProps}>
					<div className="case-studies-block">
					<div className="block-wrapper" id={anchor}>
						<div className="resources-wrap">
							<header
								className="header"
							>
								<Header
									tag="h2"
									title={ mainTitle }
									setAttributes={ setAttributes }
									updateProp="mainTitle"
									placeholder={ "Selected Projects Heading..." }
									
								/>
							</header>
							<div className="resources"
								dangerouslySetInnerHTML={{ __html: resources }}
							>
							</div>
							{/*<InnerBlocks 
								template={ template }
								allowedBlocks={['core-buttons']}
							/>*/}
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedCaseStudies;