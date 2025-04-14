const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/savings-form', {
	title: __( 'Savings Form', 'ddrc-theme-blocks' ),
	description: __( 'Savings Form block.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	parent: ['ddrc-theme-blocks/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );