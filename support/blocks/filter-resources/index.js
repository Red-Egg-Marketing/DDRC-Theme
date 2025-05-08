const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/resources', {
	apiVersion: 2,
	title: __( 'Filterable Resources', 'ddrc-theme-blocks' ),
	description: __( 'Block with filterable list of Resourcess', 'ddrc-theme-blocks' ),
	icon: 'megaphone',
	category: 'layout',
	supports: {
		anchor: true
	},
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		taxonomies : {
			type: 'object'
		},
		mainTitle : {
			type: 'string',
		},
		padding: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		},
		postType: {
			type: 'string',
			default: 'post',
			source: 'attribute',
			selector: '.resources-grid',
			attribute: 'data-posttype'
		}
	},
	edit: edit,
	save: save
} );