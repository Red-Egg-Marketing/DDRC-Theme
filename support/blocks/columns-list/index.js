const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/columns-list', {
	title: __( 'List Columns', 'ddrc-theme-blocks' ),
	description: __( 'List as columns. Optional CTA and title', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	attributes: {
		image : {
			type: 'object',
			default : {
				url : '',
				width : '',
				height : '',
				repeat: 'no-repeat',
				position: 'top left',
				size: '100',
				sizekey: '',
				attachment: 'scroll',
				bgkeyword: 'keyword'
			}
		},
	},
	edit: edit,
	save: save,
} );