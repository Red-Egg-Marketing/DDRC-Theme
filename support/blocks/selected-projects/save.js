const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSelectedProjectsBlock = ( { attributes } ) => {

	const {
		padding, blockId, margin
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'selected-case-studies-grid',
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
			<section {...blockProps} id={blockId}>
				<div className="resources-block">
					<div className="block-wrapper">
						<div className="resources-wrap swiper">
							<div className="resources swiper-wrapper">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default SaveSelectedProjectsBlock;