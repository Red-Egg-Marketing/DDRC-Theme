const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['ddrc-theme-blocks/header-intro'],
	['ddrc-theme-blocks/contact-forms']
];

const EditContact = ( { attributes, setAttributes, clientId } ) => {

		// console.log(wp.data.select('core/editor').getCurrentPostAttribute('acf'));
	
		const {
			bgColor, bgSlug, padding, blockId, margin
		} = attributes;  		

		const blockProps = useBlockProps({
			className: 'contact-section' + ' ' + bgSlug
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
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Contact Background Color"
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="content">
							<InnerBlocks 
								allowedBlocks={ ['ddrc-theme-blocks/header-intro', 'ddrc-theme-blocks/contact-forms'] }
								template={ template }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditContact;