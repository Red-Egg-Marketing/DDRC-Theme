const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveContactColumn = ( { attributes } ) => {
		const {
			title, content, icons, subtitle
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'content-column column'
		});
	
		return (
			<div {...blockProps}>
				<Header.View
					tag="h2"
					title={ title }
				/>
				<Content.View
					tag="div"
					content={ content }
					multiline="p"
					classProp="content"
				/>
				<Header.View
					tag="h4"
					title={ subtitle }
					classProp="header-suptitle"
				/>
				<Icons.View
					rows={ icons }
					color={ '#F79A6C' }
					activeText={ true }
				/>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveContactColumn;