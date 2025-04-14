const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/image-links', {
	title: __( 'Image Links', 'ddrc-theme-blocks' ),
	description: __( 'Group of Image Links. Useful to link to multiple, related pages, posts, or services.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	attributes: {
		slideshow: {
			type: 'string',
			default: 'slideshow'
		}
	},
	edit: edit,
	save: save,
} );