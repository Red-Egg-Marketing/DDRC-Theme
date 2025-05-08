const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import ResourceFilters from '../../components/ResourceLoader.js';
import PaddingSelector from '../../components/Padding.js';
const apiUrl  = '/wp-json/ddrc/v2/resources';
const typeUrl  = '/wp-json/wp/v2/types';

const EditResources = ( { attributes, setAttributes, clientId } ) => {

		const {
			taxonomies, anchor, mainTitle, blockId, padding, postType
		} = attributes;
	  	
	  	const [resources, selectResources] = useState(false);
	  	const [taxonomy, setTaxes] = useState([]);
  		const [selectTax, setSelectTaxes] = useState([]);
  		const [toggleFilters, setToggleFilters] = useState({key: '', active: false});
  		const [currentTypes, activateTypes] = useState(false);
  		const [type, setPostType] = useState(postType);

		document.addEventListener('click', function(event) {
    		let target = event.target;
    		let nodeName = target.nodeName.toLowerCase();

    		if ((target.closest('.filter-items') == null)) {
        		let buttons =  document.querySelectorAll('.tax-filter-button');

        		buttons.forEach( (button) => {
        		    let par = button.parentElement;
        		    par.classList.remove('active');
        		}); 
    		}

  		}, false);

		const blockProps = useBlockProps({
			className: 'filter-resources'
		});

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}

		const filterCats = (value, id, tax) => {

    		if (value == true) {
    		  if (selectTax.indexOf(id) == -1) {
    		    selectTax.push(id);
    		  }
    		} else {
    		  let index = selectTax.indexOf(id);
    		  selectTax.splice(index, 1);
    		}
    		setSelectTaxes(selectTax);

    		wp.apiRequest({
        		url: apiUrl
    		}).then(resourcelist => {

        		let posts = resourcelist[0].resources;
        		let taxonomies = posts.taxonomies;
        		// Filter based off selected taxonomies. For example, if topic A and topic B are selected. select posts that have both topice A AND topic B.
        		let filterPosts = posts.filter((post) => {
        	  		let postTax = Object.keys(post.taxonomies);
        	  		let postTaxes = Object.entries(post.taxonomies);
        	  		let postTruthy = [];
        	  		let sizeTaxes = selectTax.length;
        	  		// loop over all selected taxonomies
        	  		selectTax.forEach((taxItem) => {
        	  		    // loop over each posts' taxonomies
        	  		    postTaxes.forEach((postTitem) => {
        	  		      let indTax = postTitem[1];
        	  		      indTax.forEach((anotherItem) => {
        	  		        let aTerm_id = anotherItem.term_id;
        	  		        if (aTerm_id == taxItem) {
        	  		          postTruthy.push(true);
        	  		        }
        	  		      });
        	  		    });
        	  		});
        	  
        	  		return postTruthy.length == sizeTaxes ? true : false;
        	  
        			});
        			selectResources(filterPosts);
    			});
	  	}

	  	const toggleCats = (key, item) => {
    		// toggle state and index to determine what is active
    		// setToggleFilters({key: key, active: !toggleFilters.active });
    		let allFilt = document.querySelectorAll('.filter-block');
    		let parent = item.parentElement;

    		allFilt.forEach( (filt) => {
    		    if (parent != filt) {
    		      filt.classList.remove('active');
    		    }
    		});
    
    		parent.classList.toggle('active');
  		}

		if (resources === false) {
    		wp.apiRequest({
    		    url: apiUrl + '?post-type=' + postType
    		}).then(resourcelist => {
    		    let posts = resourcelist[0].resources;
    		    let taxes = resourcelist[1];
    		    selectResources(posts);
    		    setTaxes(taxes);

    		});

  		}

  		if (currentTypes == false || currentTypes.length == 0) {
			wp.apiFetch({
				url: typeUrl
			}).then(types => {
				let index = 0;
				let t = [];
				for(const [key, value] of Object.entries(types)) {
					let title = value.name;
					t[index] = {
						label: title,
						value: key
					};
					index++;

				}
				activateTypes(t);
			});
		}

  		const setPostTypes = (value) => {

			wp.apiFetch({
				url: apiUrl + '?post-type=' + value
			}).then(resourcelist => {
				let posts = resourcelist[0].resources;
    		    let taxes = resourcelist[1];
    		    selectResources(posts);
    		    setTaxes(taxes);
				setAttributes({resources: posts });

			});
			console.log('the falue i' + value);
			setAttributes({
				postType: value
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
					<PanelBody
						title={ __('Select Post Type')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Post Type')}
							 value={ postType }
							 options={
							 	currentTypes
							 }
							 onChange={ setPostTypes }
						/>
					</PanelBody>
					<PaddingSelector
						setAttributes={ setAttributes }
						padding={ padding }
						id={ 'block-' + clientId }
					/>
				</InspectorControls>
				<div { ...blockProps }>
					<div className="resources-block">
						<div className="block-wrapper">
							<div className="resources-wrap"
								data-posttype={ postType }
							>
								<ResourceFilters
									filterCats={ filterCats }
									taxonomies={ taxonomy }
									toggleCats={ toggleCats }
									currentFilter={ toggleFilters }
								/>
								<header
									className="header"
								>
									<Header
										tag="h2"
										title={ mainTitle }
										updateProp="mainTitle"
										placeholder={ __('Title...', 'providence')}
										setAttributes={ setAttributes }
									/>
								</header>
								
								<div 
									className="resources-grid"
									data-title={ mainTitle }
									
								>
									{typeof resources != 'undefined' && resources.length > 0 && resources.map((resource, resourceIndex) => {
											
											return (
												<Fragment>
													<ResourceCard
														resourceIndex={ resourceIndex }
														resourceURL={ resource.link }
														resourceID={ resource.ID }
														resourceImg={ resource.media_url }
														resourceTitle={ resource.post_title  }
														resourceType={ resource.label  }
														resourceExcerpt={ resource.post_excerpt }
														updateResourceImage={ null }
														updateResourceText={ null }
														updateResourceExcerpt={ null }
														updateResourceType={ null }
													/>
												</Fragment>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditResources;