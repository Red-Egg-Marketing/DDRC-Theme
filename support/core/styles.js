wp.domReady( () => {

	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'solid-white',
		label: 'Solid White',
		isDefault: false,
	});


	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'solid-yellow',
		label: 'Solid Yellow',
		isDefault: false,
	});


	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'solid-green',
		label: 'Solid Green',
		isDefault: true,
	});
	


});
