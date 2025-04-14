const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/cta', {
	title: __( 'Call to Action', 'ddrc-theme-blocks' ),
	description: __( 'Button with short blurb.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: ''
		},
		footer: {
			type: 'string',
			source: 'html',
			selector: '.content-footer',
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
	edit: edit,
	save: save,
} );