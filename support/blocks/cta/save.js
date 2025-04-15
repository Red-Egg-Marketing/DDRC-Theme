const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCTA = ( { attributes } ) => {
		const {
			padding, blockId, margin, bgColor, bgSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'cta' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			id: blockId
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
						<div className="block-content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveCTA;