const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/post', {
	apiVersion: 2,
	title: __( 'Post', 'ddrc-theme-blocks' ),
	description: __( 'Post Block.', 'ddrc-theme-blocks' ),
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
			selector: '.post-recent',
			attribute: 'data-resource'
		}
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );