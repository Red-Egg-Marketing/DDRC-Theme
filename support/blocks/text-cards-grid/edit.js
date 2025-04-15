const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import CustomBG from '../../components/CustomBG.js';
import Columns from '../../components/Columns.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['ddrc-theme-blocks/header-intro', {}],
	['ddrc-theme-blocks/text-card', {}],
	['ddrc-theme-blocks/text-card', {}],
	['ddrc-theme-blocks/text-card', {}],
];

const EditCTAGrid = ( { attributes, setAttributes, clientId } ) => {

		const {
			columns, bgColor, bgSlug, color, padding, blockId, margin, bg
		} = attributes;

		const onChangeContent = (value) => {
			setAttributes({
				content: value
			});
		}

		const blockProps = useBlockProps({
			className: 'text-cards-grid' + ' columns-' + columns + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (bg != '' ? ' ' + bg : '')
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
					<Columns
						setAttributes={ setAttributes }
						columns={ columns }
					/>
					<CustomBG
						setAttributes={ setAttributes }
						bg={ bg }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['ddrc-theme-blocks/text-card', 'ddrc-theme-blocks/header-intro', 'core/heading'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTAGrid;