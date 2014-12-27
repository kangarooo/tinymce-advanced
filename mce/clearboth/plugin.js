/**
 * plugin.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('clearboth', function(editor) {
	var setting = editor.getParam('clearboth_force_tab');

	editor.addCommand('mceclearboth', function() {
		editor.insertContent(
			(editor.plugins.visualchars && editor.plugins.visualchars.state) ?
			'<div style="clear:both;"></div>' : '<div style="clear:both;"></div>'
		);

		editor.dom.setAttrib(editor.dom.select('span.mce-clearboth'), 'data-mce-bogus', '1');
	});

	editor.addButton('clearboth', {
		title: 'clearboth space',
		cmd: 'mceclearboth'
	});

	editor.addMenuItem('clearboth', {
		text: 'clearboth space',
		cmd: 'mceclearboth',
		context: 'insert'
	});

	if (setting) {
		var spaces = +setting > 1 ? +setting : 3;  // defaults to 3 spaces if setting is true (or 1)

		editor.on('keydown', function(e) {
			if (e.keyCode == 9) {

				if (e.shiftKey) {
					return;
				}

				e.preventDefault();
				for (var i = 0; i < spaces; i++) {
					editor.execCommand('mceclearboth');
				}
			}
		});
	}
});
