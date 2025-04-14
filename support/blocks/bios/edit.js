const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['ddrc-theme-blocks/bio'],
	['ddrc-theme-blocks/bio'],
	['ddrc-theme-blocks/bio'],
];

const EditBios = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'bios'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="fake-grid">
							<InnerBlocks
								template={ template }
								allowedBlocks={['ddrc-theme-blocks/bio']}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditBios;