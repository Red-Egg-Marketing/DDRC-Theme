const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTabs = ( { attributes } ) => {

		const { anchor } = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'tabs'
		});
		
		return (
			<div {...blockProps} id={anchor}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveTabs;