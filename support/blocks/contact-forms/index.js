const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/contact-forms', {
	title: __( 'Contact Form Selector', 'ddrc-theme-blocks' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['ddrc-theme-blocks/contact', 'ddrc-theme-blocks/sign-up'],
	category: 'layout',
	edit: edit,
	save: save,
} );