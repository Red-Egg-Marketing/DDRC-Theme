const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/event', {
	apiVersion: 2,
	title: __( 'Event', 'ddrc-theme-blocks' ),
	description: __( 'Event Block.', 'ddrc-theme-blocks' ),
	parent: ['ddrc-theme-blocks/selected-events-blog'],
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		resource: {
			type: 'array',
			default: []
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
		},
		postID: {
			type: 'string',
			source: 'attribute',
			selector: '.project',
			attribute: 'data-resource'
		}
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );