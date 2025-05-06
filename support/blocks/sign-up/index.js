const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'ddrc-theme-blocks/sign-up', {
	title: __( 'Sign Up Block (Newsletter)', 'ddrc-theme-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	edit: edit,
	save: save,
} );