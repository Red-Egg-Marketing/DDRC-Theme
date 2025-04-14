const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['ddrc-theme-blocks/header-intro', {}],
	['ddrc-theme-blocks/image-text', {}],
];

const EditColumnsGroup = ( { attributes, setAttributes, clientId } ) => {

		const {
			bgColor, bgSlug, padding, blockId, margin
		} = attributes; 


		const blockProps = useBlockProps({
			className: 'columns-group'+ ' ' + bgSlug
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
						title="Background Style"
					/>
				</InspectorControls>
				<div {...blockProps}>
  					{ bgSlug == 'blue' && (
						<Fragment>
							<div class='light x1'></div>
  							<div class='light x2'></div>
  							<div class='light x3'></div>
  							<div class='light x4'></div>
  							<div class='light x5'></div>
  							<div class='light x6'></div>
  							<div class='light x7'></div>
  							<div class='light x8'></div>
  							<div class='light x9'></div>
  						</Fragment>
  					)}
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['ddrc-theme-blocks/image-text', 'ddrc-theme-blocks/header-intro'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditColumnsGroup;