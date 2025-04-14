const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/cards-grid', {
	title: __( 'Text Cards Grid', 'ddrc-theme-blocks' ),
	description: __( 'Grid of Text Cards', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	attributes: {
		columns: {
			type: 'string',
			default: '3'
		},
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
		padding: {
			type: 'object',
			default: {
			}
		},
		margin: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		}
	},
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );