const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedResource = ( { attributes } ) => {
	const {
		padding, blockId, margin
	} = attributes;

	return 
	<Fragment>
		<PaddingSelector.View 
			padding={ padding }
			id={ blockId }
		/>
		<MarginSelector.View 
			margin={ margin }
			id={ blockId }
		/>
		<InnerBlocks.Content />
	</Fragment>
}

export default SaveSelectedResource;