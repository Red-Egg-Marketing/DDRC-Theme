const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFAQSection = ( { attributes } ) => {

		const { padding, blockId, margin, bgColor, bgSlug } = attributes;
	
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'faq-section' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});

		return (
			<Fragment>
				<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
				<MarginSelector.View 
					margin={ margin }
					id={ blockId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveFAQSection;