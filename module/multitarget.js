/**
 * Handle action to target the currently hovered token.
 * @param {KeyboardEventContext} context    The context data of the event
 * @private
 */
function _onTarget(context) {
	context.isShift = true;
	return old_onTarget(context);
}

let old_onTarget = null;

Hooks.once('init', () => {
	old_onTarget = ClientKeybindings._onTarget;
	ClientKeybindings._onTarget = _onTarget;
});
