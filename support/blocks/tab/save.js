const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveTab = ( { attributes } ) => {

		const {
			title, id, icons
		} = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'tab'
		});
		
		return (
			<div {...blockProps}>
				<input type="radio" id={ `tab-${ id }` } name="tab-group-1" />
				<label
					className="header-title"
					for={ `tab-${ id }` }
				>
					{ title }
				</label>
				<div className="tab-content" data-toggled>
					<div className="content-cols">
						<div className="content">
							<InnerBlocks.Content />
						</div>
						<div className="img-col">
							<Icons.View 
								rows={ icons }
								color={ '#0B6F6F' }
							/>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveTab;