const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/tab-group', {
	title: __( 'Tab Group', 'ddrc-theme-blocks' ),
	description: __( 'Group of tabs.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['ddrc-theme-blocks/tabs'],
	attributes: {
		height : {
			type: 'string',
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );