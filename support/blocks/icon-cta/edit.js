const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import * as IconList from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Icons from '../../components/Icons.js';
import Header from '../../components/Header.js';

const EditCTAIcon = ( { attributes, setAttributes } ) => {
		const {
			icons, template, title
		} = attributes;

		const IconLibrary = Object
  			.keys(IconList)
  			.filter(key => key !== "fas" && key !== "prefix" )
  			.map(icon => IconList[icon]);

  		library.add(...IconLibrary);

  		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(IconLibrary);
		const [searchActive, activateSearch] = useState({index: false, active: false});

		const updateIcon = (value) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;
			let newRow = {
				icon: value
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});

			activateSearch({ index: index, active: !searchActive.active });
  		}

  		const addIcon = () => {
			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = currentIcons.length;
			let newRow = {
				title: '',
				icon: 'address-book'
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

		const currentRowFocus = (value) => {
			setRownumber(value);
		}

		const blockProps = useBlockProps({
			className: 'icon-cta'
		});	
		
		
		return (
			<Fragment>
				<div {...blockProps}>
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
						color={ '#FFB924' }
						totalIcons={ 100 }
						activeText={ true }
						setIconList={ setIconList }
					/>
					<Header
						title={ title }
						tag="h4"
						setAttributes={ setAttributes }
					/>
					<br />
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['core/buttons'] }
					/>
				</div>
			</Fragment>
		);
}

export default EditCTAIcon;