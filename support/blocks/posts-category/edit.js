const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
// import a component

const apiUrl  = '/wp-json/ddrc/v2/events';
const catUrl  = '/wp-json/wp/v2/categories';

const template = [
	['ddrc-theme-blocks/header-intro']
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

const warningStyle = {
	"text-align" : "center",
	"font-size" : "24px",
	"width" : "100%",
	"color" : "red"
}

const EditSelectedResources = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const { resources, anchor, mainTitle, category, bgColor, bgSlug, padding, blockId, margin } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-resources' +  ' ' + bgSlug
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentCats, activateCategories] = useState(false);


		const addResource = () => {
			let curResources = JSON.parse(JSON.stringify(resourcelist));
			let index = resourcelist.length;
			let len = resourcelist.length == 0 ? 1 : resourcelist.length;

			let newResource = {
				resource : []
			};
			let newTotal = parseInt(totalNotes) + 1;
			
			for (var x = 0; x < len; x++) {
				newResource = 0;
				newResource = {
					'id' : 0,
					'img' : '',
					'post_title' : '',
					'url' : ''
				}
			}

			curResources[index] = newResource;

			setAttributes({
				resourcelist: curResources,
				totalNotes: newTotal
			});


		}

		if ( (resources == undefined || resources.length == 0) && currentCats.length == 0) {

			wp.apiFetch({
				url: apiUrl + '?post_types=post&ppp=2'
			}).then(resourcelist => {
				let size = resourcelist.length < count ? resourcelist.length : count;
				let posts = [];
				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[x];
				}

				setAttributes({resources: posts });
			});

			return (
				<section { ...blockProps }>
					Loading Posts...
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

			wp.apiFetch({
				url: apiUrl + '?&post_types=post&category=' + value + '&ppp=2'
			}).then(resourcelist => {
				let size = resourcelist.length < count ? resourcelist.length : count;
				let posts = [];
				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[x];
				}
				setAttributes({resources: posts });

			});

			setAttributes({
				category: value
			});

		}

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'block-' + clientId } );
        	}
    	}, [] );


		return (
			<Fragment>
				<InspectorControls>
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
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<section {...blockProps}>
					<div className="resources-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<InnerBlocks
								template={ template }
								allowBlocks={['ddrc-theme-blocks/header-intro']}
							/>
							<div className="resources grid">
									{ resources.length > 0 && resources.map( (resource, resourceIndex) => {
											return(
												<Fragment>
													<ResourceCard
														resourceIndex={ resourceIndex }
														resourceURL={ resource.link }
														resourceID={ resource.ID }
														resourceImg={ resource.featured_image }
														resourceTitle={ resource.title  }
														resourceType={ resource.label  }
														resourceExcerpt={ resource.excerpt }
														updateResourceImage={ null }
														updateResourceText={ null }
														updateResourceExcerpt={ null }
														updateResourceType={ null }
													/>	
												</Fragment>
											);
										})
									}
							</div>
							{ resources.length == 0 && (
								<p style={ warningStyle }>{__('No Posts found. Try a different category.', 'ddrc-theme-blocks')}</p>
							)}
							
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedResources;