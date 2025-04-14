const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTitleImageCTA = ( { attributes } ) => {
		const {
			media, title, content, link, introTitle, padding, blockId, margin
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'cta-text'
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
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
					<a
						className="container"
						href={ link }
					>
						<Header.View
							tag="h4"
							title={ introTitle }
							classProp="intro-title"
						/>
						<ImageComp.View
							id={ media.id }
							alt={ media.alt }
							source={ media.srcSet.large }
							background={ false }
						/>
						<div className="content-cont">
							<Header.View
								tag="h4"
								title={ title }
							/>
							<Content.View
								tag="div"
								classProp="content"
								content={ content }
								multiline="p"
							/>
						</div>
					</a>
				</div>
			</Fragment>
		);
}

export default SaveTitleImageCTA;