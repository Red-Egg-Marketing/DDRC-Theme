const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect, useSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class MiddleLineButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveMiddleLine = this.saveMiddleLine.bind( this );    
    }

   saveMiddleLine() {
        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/middle-line' }
        ));
    }

    render(){

        const {
            isActive,
            activeAttributes,
            value,
            onChange,
            setAttributes,
            selectedBlock
        } = this.props;


        console.log(selectedBlock);

        if ( selectedBlock && selectedBlock.name !== 'core/heading' ) {
            return null;
        } else {
            if (isActive == true) {
                selectedBlock.attributes.className = 'middle-active';
            } else {
                selectedBlock.attributes.className = '';
            }
        }

        return (
            <Fragment>
                 <RichTextToolbarButton
                    icon='admin-customizer'
                    title='Middle Line'
                    onClick={ this.saveMiddleLine }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionMiddleLineButton = compose(
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
)( MiddleLineButton );
 
registerFormatType(
    'extend-gutenberg-format/middle-line', {
        title: 'Middle Line',
        tagName: 'middleLine',
        className: 'middle',
        edit: ConditionMiddleLineButton
    }
);