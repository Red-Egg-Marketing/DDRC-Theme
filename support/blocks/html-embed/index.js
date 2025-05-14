const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/html-embed', {
	title: __( 'Full Width HTML Embed', 'cls-blocks' ),
	description: __( 'Can be used for full width Google map', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'admin-site',
	category: 'layout',
	edit: edit,
	save: save,
} );