const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/savings-calculator', {
	title: __( 'Savings Calculator', 'ddrc-theme-blocks' ),
	description: __( 'Block for displaying Savings Calculator.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'calculator',
	category: 'layout',
	edit: edit,
	save: save,
} );