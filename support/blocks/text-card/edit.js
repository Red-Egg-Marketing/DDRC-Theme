const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/image', {}],
	['core/heading', {'level' : 3, 'placeholder' : 'Card Title...'}],
	['core/paragraph', {'placeholder' : 'Card Description...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn More...', 'className' : 'is-style-solid-green' }]
		]
	],
];

const widthOptions = [
    {
        label: __( '--' ),
        value: '',
    },
    {
        label: __( 'Width 100%' ),
        value: '100',
    },
];

const BGOptions = [
    {
        label: __( '--' ),
        disabled: true
    },
    {
        label: __( 'None' ),
        value: '',
    },
    {
        label: __( 'Light Grey' ),
        value: 'light-grey',
    },
];

const EditCTA = ( { attributes, setAttributes } ) => {
		const {
			width, icons, bgColor, bgSlug, link, content, buttonText, iconColor, cardBG
		} = attributes;


  		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});
		let tempValue = icons[0] && icons[0].upload != 'undefined' ? icons[0].upload : '';
		const [uploadActive, activateHTML] = useState({index: false, active: false, tempValue : tempValue});

		const updateIcon = (value, prefix) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;

			let newRow = {
				icon: value,
				prefix: prefix,
				upload: ''
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});

			activateSearch({ index: index, active: !searchActive.active });
  		}

  		const updateUploadIcon = (value) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;

			let newRow = {
				icon: 'address-book',
				prefix: 'far',
				upload: value
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});
  		}

  		const addIcon = () => {
			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = currentIcons.length;
			let newRow = {
				title: '',
				icon: 'address-book',
				prefix: 'far'
			};

			currentIcons.splice(index, 0, newRow);

			setAttributes({
				icons: currentIcons
			});

		}

		const removeIcon = (index) => {

			let currentIcons = JSON.parse(JSON.stringify(icons));

			currentIcons.splice(index, 1);

			setAttributes({
				icons: currentIcons
			});

		}

		const filterIconList = (value) => {
			let search = value.replace(" ", "-");
			let foundIcons = IconLibrary.filter(icon => {
				let name = icon.iconName;
				if (name.indexOf(search, 0) != -1) {
					return icon;
				}
			});

			setIconList(foundIcons);
		}

		const activateIconSearch = (index) => {

			activateSearch({ index: index, active: !searchActive.active });

		}

		const updateHTMLUpload = (value) => {

			activateHTML({ index: uploadActive.index, active: uploadActive.active, tempValue : value});

		}

		const activateHTMLUpload = (index) => {

			activateHTML({ index: index, active: !uploadActive.active, tempValue : uploadActive.tempValue});

		}

		const currentRowFocus = (value) => {
			setRownumber(value);
		}

		const blockProps = useBlockProps({
			className: 'text-card' + ' width-' + width + ' ' + 'border-' + bgSlug + ' ' + cardBG
		});	

		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Card Width')}
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Select Card Width' ) }
            				options={ widthOptions }
            				value={ width }
            				onChange={ ( selectedWidth ) => {
            					setAttributes({
            						width: selectedWidth
            					});
            				}}
        				/>
					</PanelBody>
					<PanelBody
						title={__('Card Background')}
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Background Color' ) }
            				options={ BGOptions }
            				value={ cardBG }
            				onChange={ ( selectedBG ) => {
            					setAttributes({
            						cardBG: selectedBG
            					});
            				}}
        				/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Image Border & Background Color"
					/>
				</InspectorControls>
				<div 
					{...blockProps}
				>
					<div className="block-wrapper">
						<div className="block-content">
							{/*<Icons 
								rows={ icons }
								addIcon={ addIcon }
								rowFocus={ currentRowFocus }
								removeIcon={ removeIcon }
								currentIconList={ currentIconList }
								updateIcon={ updateIcon }
								updateUploadIcon={ updateUploadIcon }
								activateIconSearch={ activateIconSearch }
								activateHTMLUpload={ activateHTMLUpload }
								updateHTMLUpload={ updateHTMLUpload }
								searchActive={ searchActive }
								uploadActive={ uploadActive }
								filterIconList={ filterIconList }
								customButtonLang={ "Add Icon" }
								setAttributes={ setAttributes }
								color={ iconColor }
								bgColor={ bgSlug }
								setIconList={ setIconList }
								totalIcons={ 1 }
								iconColor={ iconColor }
								uploadActivated={ true }
							/>*/}

							<InnerBlocks
								template={ template }
								templateLock={ false }
								allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons', 'core/image'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;