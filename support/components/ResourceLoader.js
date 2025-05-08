const { render, useState, Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, CheckboxControl } = wp.components;
const { __ } = wp.i18n;
const apiUrl = '/wp-json/ddrc/v2/resources';
import Header from './Header.js';
import ResourceCard from './ResourceCard.js';

const ResourceFilters = (props) => {

  const { taxonomies, currentFilter, currentTax, testingFilter, searchFilter, postType } = props;

  let placeholder = postType == 'post' ? 'Search Our News & Insights' : 'Search Spotlight Stories';

  return (
      <Fragment>
        <form 
          className="form-filters"
          onSubmit={ testingFilter }
        >
          <div className="wrapper filter-items">


          { taxonomies && Object.entries(taxonomies).map(([key, value]) => {
                let tax = key;
                let taxItem = value;
                {/*let taxKey = Object.keys(value);*/}
                let isActive = '';
                if (currentFilter.key == key && currentFilter.active == true) {
                  isActive = ' active';
                } else {
                  isActive = '';
                }
                return (
                
                    <Fragment>
                      { typeof taxItem == 'object' && (
                      <div className={`col-6${ isActive } flex align-center j-center filter-block`}>
                        <Button
                          className="tax-filter-button"
                          onClick={ (event) => { 
                              props.toggleCats(key, event.currentTarget);
                            }
                          }
                        >
                          <span className="filt-icon"></span>Filter By { tax }
                        </Button>
                        <div className="tax-cont">
                          <div class="tax-wrapper">
                          <Button
                            className="tax-close"
                            onClick={ (event) => {
                                  props.toggleCats(key, event.currentTarget);
                                }
                            }
                          >
                            X
                          </Button>
                          <ul className="tax-list">
                          { Object.entries(taxItem).map(([intKey, intValue]) => {
                              let taxName = intKey;
                              let checked = (currentTax != undefined && currentTax.includes(intValue.tax_id) == true) ? true : false;
                              
                              return (
                                <Fragment>
                                  <li className="tax-item">
                                    <div className="tax-wrap">
                                      <input 
                                        id={ `inspector-control-box-${ intValue.tax_id }` }
                                        value={ intValue.tax_id }
                                        type="checkbox"
                                        checked={ checked }
                                        className="checkbox-component"
                                        onChange={ (box) => { 
                                            let value = box.currentTarget.checked;
                                            props.filterCats(value, intValue.tax_id, intValue.taxonomy);
                                          }
                                        }
                                      />
                                      <label
                                        for={ `inspector-control-box-${ intValue.tax_id }` }
                                        dangerouslySetInnerHTML={{__html: `${ taxName }`}}
                                      >
                                      </label>
                                    </div>
                                  </li>
                                </Fragment>
                              );
                            })
                          }
                          </ul>
                          </div>
                        </div>
                      </div>
                      )}
                    </Fragment>
                );
              })

          }
          <div className="col-6 align-center">
            <input 
              type="search"
              placeholder={ placeholder }
              onChange={ searchFilter }
            />
          </div>
          </div>
        </form>
      </Fragment>
  );
};

// let grid = document.getElementById('ResourcesGrid');
// if (grid) {
//   render(<ResourceLoader />, grid);
// }

export default ResourceFilters;