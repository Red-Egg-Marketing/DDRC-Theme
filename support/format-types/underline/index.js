const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class UnderlineButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveUnderline = this.saveUnderline.bind( this );    
    }

   saveUnderline() {

        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/underline' }
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
                    icon='admin-customizer'
                    title='Underline'
                    onClick={ this.saveUnderline }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionUnderlineButton = compose(
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
)( UnderlineButton );
 
registerFormatType(
    'extend-gutenberg-format/underline', {
        title: 'Underline',
        tagName: 'underline',
        className: 'underline',
        edit: ConditionUnderlineButton
    }
);