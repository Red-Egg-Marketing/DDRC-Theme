const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Cta here...'}]
		]
	],
];

const EditContactContent = ( { attributes, setAttributes } ) => {

	
		const {
			title, content, icons, subtitle
		} = attributes;

		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});

  		const updateIcon = (value, prefix) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;
			let newRow = {
				title: currentIcons[index].title,
				icon: value,
				prefix: prefix
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});

			activateSearch({ index: index, active: !searchActive.active });
  		}

		const currentRowFocus = (value) => {
			setRownumber(value);
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

		const activateIconSearch = (index) => {

			activateSearch({ index: index, active: !searchActive.active });

		}

		const blockProps = useBlockProps({
			className: 'content-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<Header
						tag="h2"
						title={ title }
						placeholder={__('Contact Section Header...', 'DDRC')}
						setAttributes={ setAttributes }
					/>
					<Content 
						tag="div"
						content={ content }
						placeholder={__('Contact Section Description...', 'DDRC')}
						multiline="p"
						classProp="content"
						setAttributes={ setAttributes }
					/>
					<Header
						tag="h4"
						title={ subtitle }
						placeholder={__('Contact Section SubHeader...', 'DDRC')}
						setAttributes={ setAttributes }
						updateProp="subtitle"
						classProp="header-suptitle"
					/>
					<Icons 
						rows={ icons }
						addIcon={ addIcon }
						rowFocus={ currentRowFocus }
						removeIcon={ removeIcon }
						currentIconList={ currentIconList }
						updateIcon={ updateIcon }
						activateIconSearch={ activateIconSearch }
						searchActive={ searchActive }
						customButtonLang={ "Add Icon" }
						setAttributes={ setAttributes }
						color={ '#F79A6C' }
						totalIcons={ 100 }
						activeText={ true }
						setIconList={ setIconList }
					/>
					<InnerBlocks 
						allowedBlocks={ ['core/buttons'] }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContactContent;