const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class WithArrowButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveWithArrow = this.saveWithArrow.bind( this );    
    }

   saveWithArrow() {

        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/arrow' }
        ));
    }

    render(){

        const {
            isActive,
            activeAttributes,
            value,
            onChange,
            setAttributes,
        } = this.props;

        return (
            <Fragment>
                 <RichTextToolbarButton
                    icon={
                        <svg id="Group_74" data-name="Group 74" width="24" height="20" viewBox="0 0 29.154 25">
                            <g id="Group_73" data-name="Group 73">
                              <path id="Path_28" data-name="Path 28" d="M28.544,13.971a2.086,2.086,0,0,0,0-2.948L18.131.61a2.085,2.085,0,1,0-2.948,2.948l6.866,6.859H2.083a2.083,2.083,0,0,0,0,4.165h19.96l-6.853,6.859a2.085,2.085,0,0,0,2.948,2.948L28.55,13.977Z" fill="#000"/>
                            </g>
                        </svg>
                    }
                    title='With Arrow'
                    onClick={ this.saveWithArrow }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionWithArrowButton = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock
        );
    } )
)( WithArrowButton );
 
registerFormatType(
    'extend-gutenberg-format/arrow', {
        title: 'With Arrow',
        tagName: 'arrow',
        className: 'with-arrow',
        edit: ConditionWithArrowButton
    }
);