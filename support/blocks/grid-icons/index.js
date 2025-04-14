const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/grid-icons', {
	title: __( 'Grid of Icons or CTAs', 'ddrc-theme-blocks' ),
	description: __( 'Grid of Icons or CTAs', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		}
	},
	edit: edit,
	save: save,
} );