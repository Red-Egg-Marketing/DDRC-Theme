const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/heading', {'level' : 3, 'placeholder': 'Sign Up...'}],
	['gravityforms/form']
];

const EditSignUp = ( { attributes, setAttributes } ) => {
	
		const blockProps = useBlockProps({
			className: 'sign-up column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks 
							allowedBlocks={ ['core/heading', 'ddrc-theme-blocks/contact-forms'] }
							template={ template }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditSignUp;