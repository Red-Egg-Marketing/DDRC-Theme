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

const template = [
	['ddrc-theme-blocks/post'],
	['ddrc-theme-blocks/event']
	
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

const EditSelectedProjects = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const {
			padding, blockId, margin
		} = attributes;

		const blockProps = useBlockProps({
			className: 'selected-case-studies-grid'
		});

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
				</InspectorControls>
				<section {...blockProps}>
					<div className="resources-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<div className="resources grid">
								<InnerBlocks 
									template={ template }
									allowedBlocks={['ddrc-theme-blocks/event', 'ddrc-theme-blocks/post']}
								/>
							</div>
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedProjects;