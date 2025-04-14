const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/icon-cta', {
	title: __( 'Icon or CTA', 'ddrc-theme-blocks' ),
	description: __( 'Option for CTA (button) or icon and title.', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['ddrc-theme-blocks/grid-icons'],
	attributes: {
		template: {
			type: 'array',
			default: []
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		icons : {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.icon-row',
			query: {
				icon: {
					type: 'string',
      				source: 'attribute',
      				default: 'address-book',
      				selector: '.icon-icon',
      				attribute: 'data-icon'
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );