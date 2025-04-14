const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveTabGroup = ( { attributes } ) => {

		const { title } = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'tab-group'
		});
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="tabs-wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveTabGroup;