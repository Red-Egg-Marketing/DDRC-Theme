const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { select, dispatch } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const template = [
	['core/heading', {'placeholder' : 'Tab Heading...'}],
	['core/paragraph', {'placeholder' : 'Tab Content...'}],
	['core/buttons', {}],
];

const EditTab = ( { attributes, setAttributes, clientId } ) => {

		const { title, id, icons } = attributes;

		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});

		const blockProps = useBlockProps({
			className: 'tab'
		});


		const parent = select('core/block-editor').getBlockParents(clientId);
		const parentAttributes = select('core/block-editor').getBlockAttributes(parent);
		const block = document.querySelector('#block-' + clientId + ' .tab-content');

		if (block != undefined) {
			let blockHeight = block.offsetHeight > 0 ? block.offsetHeight : 300;
			let isVisible = block.offsetParent;
			if (isVisible != null) {
				dispatch('core/block-editor').updateBlockAttributes(parent, {height : blockHeight});
			}
		}

		const updateIcon = (value, prefix) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;

			let newRow = {
				icon: value,
				prefix: prefix
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

		const currentRowFocus = (value) => {
			setRownumber(value);
		}

		const setTitle = (value) => {
			setAttributes({
				title: value
			});

			if (block != undefined) {
				let blockHeight = block.offsetHeight > 0 ? block.offsetHeight : 300;
				dispatch('core/block-editor').updateBlockAttributes(parent, {height : blockHeight});
			}

		}

		React.useEffect(() => {

			return(
				setAttributes({
					id: clientId
				})
			);

		}, []);
		
		return (
			<Fragment>
				<div {...blockProps}>
					<input 
						type="radio" 
						name="tab-group-1" 
						id={ `tab-${ id }` }
					/>
					<TextControl
						label=""
						value={ title }
						className="header-title"
						for={ `tab-${ id }` } 
						onChange={ setTitle }
					/>
					<div className="tab-content" data-toggled>
						<div className="content-cols">
							<div className="content">
								<InnerBlocks
									template={ template }
									allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons', 'core/list'] }
								/>
							</div>
							<div className="img-col">
								<Icons 
									rows={ icons }
									addIcon={ addIcon }
									rowFocus={ currentRowFocus }
									removeIcon={ removeIcon }
									currentIconList={ currentIconList }
									updateIcon={ updateIcon }
									activateIconSearch={ activateIconSearch }
									searchActive={ searchActive }
									filterIconList={ filterIconList }
									customButtonLang={ "Add Icon" }
									color={ '#0B6F6F' }
									totalIcons={ 1 }
									setIconList={ setIconList }
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTab;