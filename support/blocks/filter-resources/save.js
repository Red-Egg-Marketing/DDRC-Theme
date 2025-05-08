const { useBlockProps } = wp.blockEditor;
const { RichText, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
import PaddingSelector from '../../components/Padding.js';

const SaveResources = ( { attributes }  ) => {
	const { taxonomies, anchor, mainTitle, blockId, padding, postType } = attributes;

	const blockProps = useBlockProps.save({
		className: 'filter-resources'
	});


	return (
		<Fragment>
			<PaddingSelector.View 
				padding={ padding }
				id={ blockId }
			/>
			<div {...blockProps}>
				<div className="resources-block">
					<div className="resources-wrap">
						<div
							id="ResourcesWrap" 
							className="resources-grid"
							data-posttype={ postType }
							data-title={ mainTitle }
							>
							<div className="block-wrapper">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default SaveResources;