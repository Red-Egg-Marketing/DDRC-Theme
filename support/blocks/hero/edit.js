const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, RangeControl, ToggleControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;
import BackgroundSelector from '../../components/BackgroundSelector.js';
import Anchor from '../../components/Anchor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const VidImg = [
    {
        label: __( 'Image' ),
        value: 'image',
    },
    {
        label: __( 'Video' ),
        value: 'video',
    } 
];

const EditHero = ( { attributes, setAttributes, clientId } ) => {

		const { image, anchor, vidOrImg, videoID, videoURL, videothumb, padding, blockId, margin } = attributes;

        const blockProps = useBlockProps({
        	className: 'hero'
        });

        const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

        let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize,
    	}

    	const updateVideoAttr = (media) => {
            setAttributes({
                videoURL : media.url + '#t=0.5',
                videoID : media.id
            });
        }

        const removeBackgroundImage = () => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		newBody.url = '';
    		newBody.width = '';
    		newBody.height = '';

    		setAttributes({
    			videothumb: newBody
    		});
    	}

        const setBackgroundImage = (media) => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		let type = media.mime;
    		newBody.url = media.url;
    		if (type == "image/svg+xml") {
    			var xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", media.url, true);  
				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						let myresponse = xmlhttp.responseText;
						let parser = new DOMParser();
    					let doc = parser.parseFromString(myresponse, "image/svg+xml");
    					let viewBox = doc.documentElement.viewBox.baseVal;
    					let width = viewBox.width;
    					let height = viewBox.height;
    					newBody.width = width;
    					newBody.height = height;
					}
				}
				xmlhttp.send();
    		} else {
    			newBody.width = media.width;
    			newBody.height = media.height;
    		}

    		setAttributes({
    			videothumb: newBody
    		});
    	}

    	React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'block-' + clientId } );
        	}
    	}, [] );

		return (
			<Fragment>
				<InspectorControls>
					<PaddingSelector
						setAttributes={ setAttributes }
						padding={ padding }
						id={ 'block-' + clientId }
					/>
					<MarginSelector
						setAttributes={ setAttributes }
						margin={ margin }
						id={ 'block-' + clientId }
					/>
					{ vidOrImg == 'image' && (
						<BackgroundSelector
							setAttributes={ setAttributes }
							image={ image }
						/>
					)}
					<PanelBody
						title={ __( 'With Video or Image' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Video or Image' ) }
							value={ vidOrImg }
							options={ VidImg }
							onChange={ ( selectedVidImg ) => {
								setAttributes( {
									vidOrImg: selectedVidImg,
								} );
							} }
						/>
					</PanelBody>
					{ vidOrImg == 'video' && (
							<PanelBody
								title={ __('Video Thumbnail')}
								initialOpen={ false }
							>
								<MediaUpload
									allowedTypes={ ['image'] }
									onSelect={ setBackgroundImage }
									value={ videothumb.url }
									render={ ( {open} ) =>(
										<Fragment>
											<Button
												isSecondary
												onClick={ open }
												style={
													{
														'margin-bottom' : '15px',
														'height' : 'auto',
														'display' : 'block',
														'width' : '100%'
													}
												}
											> 
												{ videothumb.url == '' && ( __('Add Video Thumbnail') )}
												{ videothumb.url != '' && (
													<ResponsiveWrapper
														naturalWidth={ videothumb.width }
														naturalHeight={ videothumb.height }
													>
														<img 
															src={ videothumb.url }
															style={
																{
																	'max-height' : 'auto',
																	'width' : 'auto',
																}
															}
														/>
													</ResponsiveWrapper>
												)}
											</Button>
								
												{ videothumb.url != '' && (
													<Fragment>
														<Button
															isDestructive
															isSmall
															onClick={
																removeBackgroundImage
															}
														>
															Remove Image
														</Button>
													</Fragment>
												)}
										</Fragment>
									)}
								/>
							</PanelBody>
						)
					}
					<Anchor
						setAttributes={ setAttributes }
						anchor={ anchor }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="hero__inner">
							<div className="content-wrap">
								<div className="hero-block-content">
									<div className="hero-block-wrap">
										<InnerBlocks
											allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons'] }
										/>
									</div>
								</div>
							</div>
							<div className="hero-block-image">
								{ vidOrImg == 'image' && (
									<Fragment>
										<div className="hero-block-image-wrap" style={ backgroundSettings }></div>
									</Fragment>
								)}
								{ vidOrImg == 'video' && (
									<Fragment>
										<MediaUpload
											onSelect={ updateVideoAttr }
											allowedTypes="video/mp4"
											value={ videoID }
											render={ ( { open } ) => (
												<Button
													className="button"
													onClick={ open }
												>
													Upload/Change Video
												</Button>
											) }
										/>
		
										{ videoID && (
											<video className="hero-asset"
											 poster={ videothumb }
											 autoplay playsinline muted loop>
												<source src={videoURL} className="hero-source" type="video/mp4" />
											</video>
										)}
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditHero;