/**
 * Handle action to target the currently hovered token.
 * @param {KeyboardEventContext} context    The context data of the event
 * @private
 */
function _onTarget(context) {
	if (!canvas.ready) return false;
	const layer = canvas.activeLayer;
	if (!(layer instanceof TokenLayer)) return false;
	const hovered = layer.hover;
	if (!hovered) {
		const user = game.user;
		if (user.targets.size === 0) return false;

		[...user.targets].forEach((t) => {
			user.targets.delete(t);
			t.targeted.delete(user);

			// Refresh Token display
			t.renderFlags.set({ refreshTarget: true });

			// Refresh the Token HUD
			if (t.hasActiveHUD) layer.hud.render();
		});

		user.broadcastActivity({ targets: [] });
		return true;
	}
	hovered.setTarget(!hovered.isTargeted, { releaseOthers: false });
	return true;
}

Hooks.once('init', () => {
	ClientKeybindings._onTarget = _onTarget;
});
