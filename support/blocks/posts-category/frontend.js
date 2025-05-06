const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';
import ResourceCard from '../../components/ResourceCard.js';
const apiUrl  = '/wp-json/ddrc/v2/events';

let ResourcesRoot = document.querySelectorAll('.selected-resources');

const SavePostsCategory = (category) => {

	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});
  		const [noResource, activateResource] = useState(false);

		React.useEffect( () => {
			if (resources === false) {
				data['ppp'] = 2;
				data['category'] = category.category;
				data['post_types'] = 'post';
				setData(data);
    			wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			    data: data
    			}).then(resourcelist => {
    				let empty = resourcelist.empty;
    			    let posts = resourcelist;
    			    selectResources(posts);
    			});
  			}
  		}, [] );
		
		return (
			<Fragment>
				{ resources.length > 0 && resources.map((resource, resourceIndex) => {
						return (
							<Fragment>
								<ResourceCard.View
									resourceIndex={ resourceIndex }
									resourceURL={ resource.link }
									resourceID={ resource.ID }
									resourceImg={ resource.featured_image }
									resourceTitle={ resource.title  }
									resourceType={ resource.label  }
									resourceExcerpt={ resource.excerpt }
									updateResourceImage={ null }
									updateResourceText={ null }
									updateResourceExcerpt={ null }
									updateResourceType={ null }
									displayType={ false }
									buttonText={ "Read More" }
								/>
							</Fragment>
						)
					})
				}
			</Fragment>
		);
}


if (ResourcesRoot) {
	ResourcesRoot.forEach((resource) => {
		let wrapper = resource.querySelector('.resources');
		let cat = wrapper.getAttribute('data-category');

		render(
			<SavePostsCategory category={ cat } />,
			wrapper
		)
	});
}
