const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/selected-case-study', {
	apiVersion: 2,
	title: __( 'Selected Projects', 'ddrc-theme-blocks' ),
	description: __( 'Block for a selecting Case Studies by category. Displays statistics block associated with Case Study.', 'ddrc-theme-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		resources: {
			type: 'string',
			source: 'html',
			default: ''
		},
		anchor: {
			type: 'string',
			default: ''
		},
		category : {
			type: 'string',
		},
		mainTitle : {
			type: 'string',
		}
	},
	edit: edit,
	save: save
} );