const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveColumnsGroup = ( { attributes } ) => {

		const {
			bgColor, bgSlug, padding, blockId, margin
		} = attributes;
		
		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'columns-group' + ' ' + bgSlug
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
				<div {...blockProps}>
					{ bgSlug == 'blue' && (
						<Fragment>
							<div class='light x1'></div>
  							<div class='light x2'></div>
  							<div class='light x3'></div>
  							<div class='light x4'></div>
  							<div class='light x5'></div>
  							<div class='light x6'></div>
  							<div class='light x7'></div>
  							<div class='light x8'></div>
  							<div class='light x9'></div>
  						</Fragment>
  					)}
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveColumnsGroup;