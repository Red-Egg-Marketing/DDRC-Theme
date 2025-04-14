const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
			['core/heading', {'level': 2, 'className' : 'header-title'}],
			['core/paragraph', {'placeholder' : 'Intro paragraph...'}],
];

const EditHeaderIntro = ( { attributes, setAttributes, clientId } ) => {
		const {
			image, bgColor, bgSlug, color, coloroverlay, padding, blockId, margin
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
    		"background-size" : imageSize
    	}

    	const blockProps = useBlockProps({
			className: 'header-intro-block' + (coloroverlay == true ? ' with-overlay ' : '') + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			style: backgroundSettings
		});
		
    	const toggleOverlay = (value) => {
    		setAttributes(
    			{
    				coloroverlay: value
    			}
    		);
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
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<PanelBody>
						<ToggleControl
							label={__('Background Overlay')}
							checked={ coloroverlay }
							onChange={ toggleOverlay }
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps} >
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks
								allowedBlocks={ ['core/heading', 'core/paragraph', 'core/list', 'core/buttons'] }
								template={ template }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditHeaderIntro;