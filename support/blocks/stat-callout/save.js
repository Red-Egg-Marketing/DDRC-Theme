const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCTA = ( { attributes } ) => {
		const {
			content, title, padding, blockId, margin 
		} = attributes;

		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'stat-callout'
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
					<div className="block-wrapper">
						<div className="stat-description col">
							<InnerBlocks.Content />
						</div>
						<div className="stat col">
							<Header.View
								tag="h3"
								title={ title }
							/>
							<Content.View
								tag="div"
								content={ content }
								multiline="p"
								classProp="content"
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveCTA;