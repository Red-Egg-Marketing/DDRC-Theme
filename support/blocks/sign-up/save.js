const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveSignUp = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'sign-up column'
		});
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveSignUp;