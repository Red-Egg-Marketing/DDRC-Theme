const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/selected-projects', {
	apiVersion: 2,
	title: __( 'Projects', 'ddrc-theme-blocks' ),
	description: __( 'Block for a selecting Projects. Displays latest 3 from selected category.', 'ddrc-theme-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
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
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );