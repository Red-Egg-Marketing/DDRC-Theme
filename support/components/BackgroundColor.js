import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'Light Orange', color: 'rgba(254, 191, 45)', slug: 'light-orange' },
    { name: 'Red', color: 'rgba(224, 59, 69)', slug: 'red' },
    { name: 'Teal', color: 'rgba(81, 179, 168)', slug: 'teal' },
    { name: 'Purple', color: 'rgba(126, 51, 128)', slug: 'purple' },
    { name: 'Orange', color: 'rgba(245, 127, 45)', slug: 'orange' },
    { name: 'Light Brown', color: 'rgba(240, 232, 215)', slug: 'light-brown' },
    { name: 'White', color: 'rgba(255, 255, 255)', slug: 'white' },
    { name: 'Green', color: 'rgba(0, 79, 102)', slug: 'green' },
];

const BackgroundColor = (props) => {

	const { bgColor, bgSlug, colors, title } = props;

	const customColors = colors == null ? defcolors : colors;

	const settitle = title == null ? 'Background Color' : title;

	const setBackgroundColor = (value) => {

		var bgColor = customColors.find(obj => {
			if (obj.color == value) {
				return obj;
			}
		});

		props.setAttributes( {
			bgColor: value
		});

		props.setAttributes({
			bgSlug: bgColor != undefined ? bgColor.slug : ''
		});
	}

	
	return (
		<Fragment>
			<PanelBody
				title={__( settitle )}
				initialOpen={ true }
			>
				<ColorPalette
            		colors={ customColors }
            		value={ bgColor }
            		onChange={ setBackgroundColor }
            		disableCustomColors={ true }
        		/>
			</PanelBody>
		</Fragment>
	)
}

BackgroundColor.View = (props) => {
	return null;
}

export default BackgroundColor;