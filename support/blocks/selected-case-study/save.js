const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const SaveSelectedCaseStudies = ( { attributes } ) => {

	const blockProps = useBlockProps.save({
		className: 'selected-case-studies-grid',
		id: blockId,
	});

	return (
		<InnerBlocks.Content />
	);
}

export default SaveSelectedCaseStudies;