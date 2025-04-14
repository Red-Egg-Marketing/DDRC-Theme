const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Icons from '../../components/Icons.js';

const SaveCTAIcon = ( { attributes } ) => {
		const {
			icons, title
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'icon-cta'
		});
	
		return (
			<div {...blockProps}>
				<Icons.View 
					rows={ icons }
				/>
				<Header.View 
					tag="h4"
					title={ title }
				/>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveCTAIcon;