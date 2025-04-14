const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
	['core/heading', {'level' : 2, 'placeholder': 'Stat description...'}],
	['core/paragraph', {'placeholder': 'Stat description...'}]
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {
		const {
			content, title, padding, blockId, margin
		} = attributes;


		const blockProps = useBlockProps({
			className: 'stat-callout'
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
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="stat-description col">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/paragraph', 'core/heading'] }
							/>
						</div>
						<div className="stat col">
							<Header 
								tag="h3"
								title={ title }
								setAttributes={ setAttributes }
								placeholder={ __('Stat...','ddrc-theme-blocks/stat-')}
								updateProp="title"
							/>
							<Content 
								tag="div"
								content={ content }
								setAttributes={ setAttributes }
								multiline="p"
								placeholder={ __('Stat description...','ddrc-theme-blocks/cta')}
								classProp="content"
								updateProp="content"
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;