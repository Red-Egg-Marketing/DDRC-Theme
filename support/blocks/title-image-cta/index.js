const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/title-image-cta', {
	title: __( 'CTA - Title, Image', 'ddrc-theme-blocks' ),
	description: __( 'Useful for displaying CTA with title image', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'format-image',
	category: 'layout',
	parent: ['ddrc-theme-blocks/title-image-cta-group'],
	attributes: {
		introTitle : {
			type: 'string',
			source: 'html',
			selector: '.intro-title',
			default: '',
		},
		title : {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: '',
		},
		content : {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: '',
		},
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.container',
			attribute: 'href',
			default: '',
		},
		media: {
			type: 'object',
			default: {
				id: '',
				alt: '',
				srcSet: {
					large: '',
					medium: '',
					small: '',
				}
			}
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