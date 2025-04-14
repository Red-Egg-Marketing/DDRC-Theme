const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFAQ = ( { attributes } ) => {
		const {
			title, content, open, padding, blockId, margin 
		} = attributes;

		const blockProps = useBlockProps.save({
			id: blockId,
			className: 'faq'
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
						<div className="block-content">
							<div 
								className="content-column"
								data-toggled={ open }
							>
								<Header.View
									tag="h4"
									title={ title }
								/>
								<div className="answer">
									<div class="content-col">
										<Content.View
											tag="div"
											content={ content }
											multiline="p"
											classProp="content"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveFAQ;