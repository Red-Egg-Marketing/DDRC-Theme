import React from 'react';
const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;


const ResourceCard = (props) => {
	let buttonText = props.resourceType == 'Videos' ? 'Watch Video' : 'Read More';
	let slideClass = props.resourceClass != null ? props.resourceClass : '';
	let text = props.buttonText != null ? props.buttonText : 'Read More';
	let displayType = props.displayType != null ? props.displayType : false;
	let displayButton = props.displayButton != null ? props.displayButton : true;
	let typeClass= '';
	if (props.resourceType == 'Whitepaper') {
		typeClass = 'whitepaper';
	} else if(props.resourceType == 'Video') {
		typeClass = 'video';
	}

	return (
		<Fragment>
			<div className={ `resource-card ${slideClass} ${typeClass}` } key={ props.resourceIndex }>
				<div className="resource-extra">
				<div className="resource-wrap" href={ props.resourceURL }>
					{ (props.resourceID != 0 && props.updateResourceImage != null) && (
						<Fragment>
							<div className="media-controls">
							<MediaUpload
								onSelect={ (val) => {
									props.updateResourceImage(val, props.resourceIndex);
								}}
								allowedTypes="image"
								value={ props.resourceImgID }
								render={ ({ open }) => (
									<Fragment>
										<Button
											onClick={ open }
											isLink
											isSmall
										>
											Change Image
										</Button>
									</Fragment>
								)}
							/>
							</div>
							{ (props.resourceImg != 'undefined') && (
							<div className="image-cont"
								data-imgid={ props.resourceImgID }
							>
								<img
									className="resource-img"
									src={ props.resourceImg }
								/>
							</div>
							)}
							
						</Fragment>
					)}
					{ (props.updateResourceImage == null && props.resourceImg != false) && (
						<div className="image-cont">
							<img 
								className="resource-image"
								src={ props.resourceImg }
							/>
						</div>
					)}
					<div 
						className="content"
						data-id={ props.resourceID }
					>
						{ (props.resourceID != 0 && props.updateResourceType != null) && (
            				<RichText
								tagName="h4"
								className="resource-type"
								value={ props.resourceType }
								allowedFormats={ [''] }
								placeholder={ __(
									'Resource type...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceType(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceType == null ** displayType == true && (
							<h4
								className="resource-type"
							>
								{ props.resourceType }
							</h4>
						)}
						
						{ (props.resourceID != 0 && props.updateResourceText != null) && (
            				<RichText
								tagName="h3"
								className="resource-title"
								value={ props.resourceTitle }
								allowedFormats={ ['core/italic'] }
								placeholder={ __(
									'Resource text...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceText(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceText == null && (
							<h3
								className="resource-title"
							>
								{ props.resourceTitle }
							</h3>
						)}
						{ (props.resourceID != 0 && props.updateResourceExcerpt != null) && (
            				<RichText
								tagName="p"
								className="resource-excerpt"
								value={ props.resourceExcerpt }
								allowedFormats={ ['core/italic'] }
								placeholder={ __(
									'Resource excerpt...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceExcerpt(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceExcerpt == null && (
							<p
								className="resource-excerpt"
							>
								{ props.resourceExcerpt }
							</p>
						)}
						{displayButton == true && (
							<button className="wp-button">
								{ text }
							</button>
						)}
					</div>	
				</div>
				</div>
			</div>
		</Fragment>
	)
}

ResourceCard.View = (props) => {
	let buttonText = props.resourceType == 'Videos' ? 'Watch Video' : 'Read More';
	let slideClass = props.resourceClass != null ? props.resourceClass : '';
	let text = props.buttonText != null ? props.buttonText : 'Read More';
	let displayType = props.displayType != null ? props.displayType : false;
	let displayButton = props.displayButton != null ? props.displayButton : true;
	let typeClass= '';
	if (props.resourceType == 'Whitepaper') {
		typeClass = 'whitepaper';
	} else if(props.resourceType == 'Video') {
		typeClass = 'video';
	}
	return(
		<Fragment>
			<div className={ `resource-card ${slideClass} ${typeClass}` } key={ props.resourceIndex }>
				<div className="resource-extra">
				<a className="resource-wrap" href={ props.resourceURL }>
					{ props.resourceImg != 'undefined' && (
						<div className="image-cont"
							data-imgid={ props.resourceImgID }
						>
							<img
								className="resource-img"
								src={ props.resourceImg }
							/>
						</div>
					)}
					<div
						className="content"
						data-id={ props.resourceID }
					>
						{displayType == true && (
							<RichText.Content
								tagName="h4"
								className="resource-type"
								value={
									props.resourceType
								}
							/>
						)}
						<RichText.Content
							tagName="h3"
							className="resource-title"
							value={
								props.resourceTitle
							}
						/>
						<RichText.Content
							tagName="p"
							className="resource-excerpt"
							allowedFormats={['']}
							value={
								props.resourceExcerpt
							}
						/>
						{displayButton == true && (
							<button className="wp-button">
								{ text }
							</button>
						)}
					</div>
				</a>
				</div>
			</div>
		</Fragment>
	)
}

export default ResourceCard;