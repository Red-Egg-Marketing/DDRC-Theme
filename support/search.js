const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import FuzzySet from 'fuzzyset';
const ResourcesRootNew = document.getElementsByClassName('search-site');

const SaveSearch = ( { attributes } ) => {
	  	
	  	const [resources, selectResources] = useState(posts_search);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [searchActive, setSearch] = useState(false);
  		const [data, setData] = useState({});

  		const matchInfo = (item) => {
  			let search = data['search'];
  			item = item.toLowerCase();
  			item = item.split(' ');
  			let s = search.toLowerCase();
  			let test = FuzzySet(item, false);
  			let match = test.get(s);
  			if (match != null) {
  				let success = match[0][0];
  				return success > 0.6;
  			} else {
  				return false;
  			}
  		}
  		
  		const filterResources = () => {

	  		let temp = posts_search.filter((post) => {
	  			let info = '';
    			let title = post.post_title;
    			let content = post.content;
    			let truthy = false;
    			info += title + ' ' + content;
    			let match = matchInfo(info);
    			return match;
    		});
    		return temp;
	  	}

  		const buildQuery = (value) => {
  			data['search'] = value;
  			setData({
  				...data
  			});
  		}

  		const filterFormSubmitted = (event) => {
  			event.preventDefault();

  			let temp = false;
  			let search = typeof data['search'] != 'undefined' ? data['search'] : '';
  			if (search == '') {
  				temp = filterResources();
  				selectResources(temp);
  			} else {
  				temp = filterResources();
  				selectResources(temp);
  			}

  			if (temp.length == 0){
  				setEmpty(true);
  			} else {
  				setEmpty(false);
  			}
  			setSearch(true);
  		}

  		const clearSearch = () => {
  			setSearch(false);
  		}

  		let tempClass = searchActive == true ? 'active-search' : '';


		return (
			<Fragment>
				<form
					className="search-filters"
					onSubmit={ filterFormSubmitted }
				>
				<input 
					type="search"
					className={ tempClass }
					placeholder="Search" 
					onChange={ (input) => {
							let value = input.currentTarget.value;
							buildQuery(value)
						}
					}
					onKeyUp={ (event) => {
							let code = event.keyCode;
							if (code == 27) {
								clearSearch();
							}
						}
					}
				/>
				<input
					type="submit"
				/>
				{ searchActive && (
				<Fragment>
					<button
						className="clear"
						onClick={
							clearSearch
						}
					>
						X
					</button>
					<div className="results-container">
					<div className="results">
						{ (resources.length > 0 && resourcesEmpty == false) && resources.map((resource, resourceIndex) => {
								let title = resource.post_title;
								let link = resource.link;
								return (
									<Fragment>
										<div className="result">
											<a href={ link }>
												<div className="content">
													<h3>{title}</h3>
												</div>
											</a>
										</div>
									</Fragment>
								)
							})
						}
						{ (resourcesEmpty) && (
							<Fragment>
								<div className="result error">
									<h3>Nothing Found</h3>
								</div>
							</Fragment>
						)}
					</div>
					</div>
				</Fragment>
				)}
				</form>
			</Fragment>
		);
}


if (ResourcesRootNew) {
	Array.from(ResourcesRootNew).forEach(function(value, key) {
		render(
			<SaveSearch />,
			value,
		);
	});
}
