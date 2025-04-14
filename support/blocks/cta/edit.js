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
	['core/buttons', {},
		[
			['core/button', { 'placeholder' : 'CTA text...', 'className' : 'is-style-outline-green' }]
		]
	]
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {
		const {
			content, footer, padding, blockId, margin 
		} = attributes;

		const onChangeFooter = (value) => {

			setAttributes({
				footer: value
			});

		}

		const blockProps = useBlockProps({
			className: 'cta'
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
						<div className="block-content">
							<Header 
								tag="h3"
								title={ content }
								setAttributes={ setAttributes }
								placeholder={ __('CTA header...','ddrc-theme-blocks/cta')}
								updateProp="content"
							/>
							<Content 
								tag="div"
								content={ footer }
								setAttributes={ setAttributes }
								multiline="p"
								placeholder={ __('CTA description...','ddrc-theme-blocks/cta')}
								classProp="content-footer"
								updateProp="footer"
							/>
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