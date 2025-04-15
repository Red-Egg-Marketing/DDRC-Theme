import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls, MediaUpload } = wp.blockEditor;
const { Button, PanelBody, ToggleControl, TextControl, ButtonGroup, RadioControl, SelectControl, RangeControl, ColorPalette, ResponsiveWrapper, Flex, FlexItem } = wp.components;
const { __ } = wp.i18n;


const labelStyle = {
    'margin-bottom' : '5px',
    'margin-top' : '5px',
    'display' : 'block',
    'width' : '100%'
}

const unitOptions = [
    {
        label: __( '%' ),
        value: '%',
    },
    {
        label: __( 'px' ),
        value: 'px',
 	},
 	{
        label: __( 'rem' ),
        value: 'rem',
 	},
 	{
        label: __( 'em' ),
        value: 'em',
 	}
];


const MarginSelector = (props, clientId) => {

	const { margin, id } = props;

    const setBackgroundSizeKey = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.sizekey = selectedKey;
    	newBody.size = selectedKey == '' ? '100' : '';

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setBackgroundUnit = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.unit = selectedKey;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setMarginTop = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.margintop = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setMarginRight = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.marginright = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setMarginBottom = (value) => {
        let newBody = JSON.parse(JSON.stringify(margin));
        newBody.margingbottom = value;

        props.setAttributes({
            margin: newBody
        });
    }

    const setMarginLeft = (value) => {
        let newBody = JSON.parse(JSON.stringify(margin));
        newBody.marginleft = value;

        props.setAttributes({
            margin: newBody
        });
    }

    const setMarginUnit = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.unit = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    let string = margin.margintop ? 'margin-top:' + margin.margintop + margin.unit + ';' : '';
        string += margin.marginright ? 'margin-right:' + margin.marginright + margin.unit + ';' : '';
        string += margin.margingbottom ? 'margin-bottom:' + margin.margingbottom + margin.unit + ';' : '';
        string += margin.marginleft ? 'margin-left:' + margin.marginleft + margin.unit + ';' : '';

	return (
		<Fragment>
            <InspectorControls>
			<PanelBody
					title={__('Margin')}
					initialOpen={false}
				>
                    <Flex>
                    <FlexItem>
        			 <TextControl
					   	label={ __( 'Top' ) }
            		  	value={ margin.margintop }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setMarginTop( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Right' ) }
            		  	value={ margin.marginright }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setMarginRight( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Bottom' ) }
            		  	value={ margin.margingbottom }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setMarginBottom( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Left' ) }
            		  	value={ margin.marginleft }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setMarginLeft( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                    </Flex>
        			<ButtonGroup label="Unit Type" 
        				onClick={ (value) => {
        					let inputVal = value.target.attributes.value.nodeValue;
        					setMarginUnit(inputVal);
        				}}
        			>
            			<Button value="px" isPressed={ margin.unit == 'px' ? true : false}>px</Button>
            			<Button value="%" isPressed={ margin.unit == '%' ? true : false}>%</Button>
            			<Button value="em" isPressed={ margin.unit == 'em' ? true : false}>em</Button>
            			<Button value="rem" isPressed={ margin.unit == 'rem' ? true : false}>rem</Button>
        			</ButtonGroup>
			</PanelBody>
            </InspectorControls>

            { (margin.marginleft || margin.marginright || margin.margintop || margin.margingbottom) && (
                <style type="text/css">
                    { `#${id} {
                            ${string}
                        }`
                    }
                </style>
            )}
		</Fragment>
	)
}

MarginSelector.View = (props) => {
    const { margin, id } = props;

    if (margin.marginleft || margin.marginright || margin.margintop || margin.margingbottom) {
       let string = margin.margintop ? 'margin-top:' + margin.margintop + margin.unit + ';' : '';
        string += margin.marginright ? 'margin-right:' + margin.marginright + margin.unit + ';' : '';
        string += margin.margingbottom ? 'margin-bottom:' + margin.margingbottom + margin.unit + ';' : '';
        string += margin.marginleft ? 'margin-left:' + margin.marginleft + margin.unit + ';' : '';
	   return (
            <style type="text/css">
               {    `#${id} {
                        ${string}
                    }`
                }
            </style>
        );
    } else {
        return null;
    }
}

export default MarginSelector;