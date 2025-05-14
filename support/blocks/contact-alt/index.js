const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/contact-alt', {
	title: __( 'Contact Section with text column .', 'ddrc-theme-blocks' ),
	description: __( 'Section for displaying contact info, and contact form (Gravity Form)', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'forms',
	category: 'layout',
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );