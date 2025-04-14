const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';

const template = [
	[
		'core/heading', {'level' : 3, 'textAlign' : 'center', 'placeholder' : 'Super list heading...'}
	],
	[
		'core/heading', {'level' : 2, 'textAlign' : 'center', 'placeholder' : 'List heading...'}
	],
	[
		'core/list', {'placeholder' : 'List item..'}
	],
];


const EditColumnsList = ( { attributes, setAttributes } ) => {
		const {
			image
		} = attributes;

		const imageSize = image.size != '' ? image.size + image.unit : image.sizekey;

		let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize,
    	}

		const blockProps = useBlockProps({
			className: 'columns-list',
			style: backgroundSettings
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['core/heading', 'core/list', 'core/buttons']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditColumnsList;