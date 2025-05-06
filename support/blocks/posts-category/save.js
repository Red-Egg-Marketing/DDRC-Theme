const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedResource = ( { attributes } ) => {

	const { resources, anchor, mainTitle, category, bgColor, bgSlug, padding, blockId, margin } = attributes;

	const blockProps = useBlockProps.save({
		className: 'selected-resources' + ' ' + bgSlug,
		id: blockId,
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
			<section {...blockProps}>
				<div className="resources-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<InnerBlocks.Content />
							<div 
								className="resources grid" 
								data-category={ category }
							>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default SaveSelectedResource;