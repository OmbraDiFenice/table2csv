// see https://github.com/jsdom/jsdom/issues/1048#issuecomment-401599392
window.Element.prototype.getClientRects = function() {
	var node = this;
	while(node) {
		if(node === document) {
			break;
		}
		// don't know why but style is sometimes undefined
		if (!node.style || node.style.display === 'none' || node.style.visibility === 'hidden') {
			return [];
		}
		node = node.parentNode;
	}
	var self = $(this);
	return [{width: self.width(), height: self.height()}];
};