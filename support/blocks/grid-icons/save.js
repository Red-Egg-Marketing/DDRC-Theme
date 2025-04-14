const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';
import PaddingSelector from '../../components/Padding.js';

const SaveGridIcons = ( { attributes } ) => {
		const {
			bgColor, bgSlug, padding, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'grid-icons' + ' ' + bgSlug,
			id: blockId
		});

		return (
			<Fragment>
				<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="icon-wrapper">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveGridIcons;