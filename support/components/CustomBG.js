import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const BGArray = [
	{
		label: __('Set Background'),
		disabled: true
	},
	{
		label: __('With Pinwheel Background'),
		value: 'with-bg-pinwheel'
	},
	{
		label: __('With White Repeating Pinwheel'),
		value: 'with-bg-repeat'
	},
	{
		label: __('No Background'),
		value: '',
	},
];


const CustomBG = (props) => {

	const { bg } = props;
	
	return (
		<Fragment>
			<PanelBody
				title={__('With Pinwheel Background')}
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Select' ) }
            		options={ BGArray }
            		value={ bg }
            		onChange={ ( selectBG ) => {
            			props.setAttributes({
            				bg: selectBG
            			});
            		}}
        		/>
			</PanelBody>
		</Fragment>
	)
}

CustomBG.View = (props) => {
	return null;
}

export default CustomBG;