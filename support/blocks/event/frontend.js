const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';
import ResourceCard from '../../components/ResourceCard.js';
const apiUrl  = '/wp-json/ddrc/v2/events';

let ResourcesRoot = document.querySelectorAll('.project');

const SaveSelectedProjects = (posts) => {

	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});
  		const [noResource, activateResource] = useState(false);
		React.useEffect( () => {
			if (resources === false) {
				data['ppp'] = 1;
				data['id'] = posts.posts;
				data['post_types'] = 'tribe_events';
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
									buttonText={ "Learn More" }
								/>
							</Fragment>
						)
					})
				} { resources.length == 0 && (
						<Fragment>
							<div className="resource-card">
								<div className="image-cont">
									<img 
										className="resource-img"
										src={ `${ DDRC.template_directory }/img/event-calendar.jpg` }
									/>
								</div>
								<h3 className="resource-title">There are no upcoming events at this time. Please check back later updates or subscribe to our newsletter!</h3>
							</div>
						</Fragment>
					) }
			</Fragment>
		);
}


if (ResourcesRoot) {
	ResourcesRoot.forEach((resource) => {
		let wrapper = resource.querySelector('.wrapper');
		let event = resource.getAttribute('data-resource');
		render(
			<SaveSelectedProjects posts={ event } />,
			wrapper
		)
	});
}
