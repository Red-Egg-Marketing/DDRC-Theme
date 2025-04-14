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

const apiUrl  = '/wp-json/providence/v2/projects';

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

const warningStyle = {
	"text-align" : "center",
	"font-size" : "24px",
	"width" : "100%",
	"color" : "red"
}


const EditSelectedProject = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const { resource, padding, blockId, margin } = attributes;

		const blockProps = useBlockProps({
			className: 'project',
			postId: resource ? resource.ID : ''
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentProjects, activateProjects] = useState(false);

		if ( (resource == undefined || resource.length == 0) && currentProjects.length == 0) {

			wp.apiFetch({
				url: apiUrl
			}).then(resourcelist => {
				let size = resourcelist.length < count ? resourcelist.length : count;
				let posts = [];
				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[x];
				}

				setAttributes({resource: posts });
			});

			return (
				<section { ...blockProps }>
					Select a Post...
				</section>
			);
				
		}

		if (currentProjects == false || currentProjects.length == 0) {
			wp.apiFetch({
				url: apiUrl
			}).then(projects => {
				let projs = [];
				projects.forEach((project, index) => {
					projs[index] = {	
						label: project.title,
						value: project.ID,
					};
				});
				activateProjects(projs);
			});
		}

		const setProject = (value) => {

			wp.apiFetch({
				url: apiUrl + '?id=' + value
			}).then(resourcelist => {
				let size = resourcelist.length < count ? resourcelist.length : count;
				let posts = [];

				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[x];
				}
				setAttributes({resource: posts });

			});

			setAttributes({
				project: value
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
						title={ __('Select Project')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Project')}
							 value={ resource.length > 0 ? resource[0].ID : false }
							 options={
							 	currentProjects
							 }
							 onChange={ setProject }
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					{ resource.length > 0 && resource.map( (resource, resourceIndex) => {
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
					{ resource.length == 0 && (
						<p style={ warningStyle }>{__('No Project found. Try again.', 'ddrc-theme-blocks')}</p>
					)}
				</div>
			</Fragment>
		);
}

export default EditSelectedProject;