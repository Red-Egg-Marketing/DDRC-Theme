const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/tab', {
	title: __( 'Tab', 'ddrc-theme-blocks' ),
	description: __( 'Tab', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['ddrc-theme-blocks/tab-group'],
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		id : {
			type: 'string',
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
      			},
      			prefix: {
      				type: 'string',
      				source: 'attribute',
      				selector: '.icon-wrap',
      				attribute: 'data-prefix',
      				default: 'far'
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );