const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/heading', {'level' : 3, 'placeholder' : 'CTA Heading...'}],
	['core/paragraph', {'placeholder' : 'CTA Description...'}],
	['core/buttons', {},
		[
			['core/button', { 'placeholder' : 'CTA text...', 'className' : 'is-style-outline-green' }]
		]
	]
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {
		const {
			padding, blockId, margin, bgColor, bgSlug
		} = attributes;

	
		const blockProps = useBlockProps({
			className: 'cta' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/buttons'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;