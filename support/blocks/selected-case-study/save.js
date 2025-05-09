const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedCaseStudies = ( { attributes } ) => {

	const { resources, mainTitle, category, padding, blockId, margin } = attributes;

	const blockProps = useBlockProps.save({
		className: 'selected-case-studies',
		id: blockId
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
				<div className="case-studies-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<div 
								className="resources swiper"
								data-donor={ category }
							>
							</div>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default SaveSelectedCaseStudies;