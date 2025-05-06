const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc/hero', {
	apiVersion: 2,
	title: __( 'Home Hero Block', 'DDRC' ),
	icon: 'id',
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
		videoID: {
			type: 'number',
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		videoURL: {
			type: 'string',
			source: 'attribute',
			selector: '.hero-source',
			attribute: 'src',
		},
		videothumb : {
			type: 'object',
			default : {
				url: '',
				width: '',
				height: '',
			}
		},
		anchor: {
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
	edit: edit,
	save: save,
} );