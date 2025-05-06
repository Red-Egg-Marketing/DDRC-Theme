const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedPost = ( { attributes } ) => {

	const {
		resource, padding, blockId, margin, postID
	} = attributes;

	const blockProps = useBlockProps.save({
			className: 'post-recent',
			id: blockId
	});

	return  (
		<Fragment>
			<PaddingSelector.View 
				padding={ padding }
				id={ blockId }
			/>
			<MarginSelector.View 
				margin={ margin }
				id={ blockId }
			/>
			<div 
				{...blockProps}
				data-resource={ postID }
			>
				<InnerBlocks.Content />
				<div className="wrapper"></div>
			</div>
		</Fragment>
	);
}

export default SaveSelectedPost;