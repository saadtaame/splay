var Node = function(key, value) {
	this.k = key;
	this.v = value;
	
	this.p = null;
	this.l = null;
	this.r = null;
};

Node.prototype.rotl = function() {
	var x = this;
	var y = x.p;
	var z = y.p;

	y.r = x.l;
	if(x.l != null) x.l.p = y;
	x.l = y;
	y.p = x;

	x.p = z;
	if(z != null) {
		if(y == z.l) z.l = x;
		else z.r = x;
	}
};

Node.prototype.rotr = function() {
	var x = this;
	var y = x.p;
	var z = y.p;

	y.l = x.r;
	if(x.r != null) x.r.p = y;
	x.r = y;
	y.p = x;

	x.p = z;
	if(z != null) {
		if(y == z.l) z.l = x;
		else z.r = x;
	}
};

Node.prototype.splay = function() {
	while(this.p != null) {
		var y = this.p;
		if(y.p == null) {
			if(this == y.l) this.rotr();
			else this.rotl();
		}
		else {
			var z = y.p;
			if(y == z.l) {
				if(this == y.l) {
					y.rotr();
					this.rotr();
				}
				else {
					this.rotl();
					this.rotr();
				}
			}
			else {
				if(this == y.r) {
					y.rotl();
					this.rotl();
				}
				else {
					this.rotr();
					this.rotl();
				}
			}
		}
	}
};

Node.prototype.min = function() {
	var x = this;
	while(x.l != null) {
		x = x.l;
	}
	return x;
};

Node.prototype.max = function() {
	var x = this;
	while(x.r != null) {
		x = x.r;
	}
	return x;
};

Node.prototype.next = function() {
	if(this.r != null) return this.r.min();
	var x = this;
	var y = x.p;
	while((y != null) && (y.r == x)) {
		x = y;
		y = y.p;
	}
	return y;
};

Node.prototype.prev = function() {
	if(this.l != null) return this.l.max();
	var x = this;
	var y = x.p;
	while((y != null) && (y.l == x)) {
		x = y;
		y = y.p;
	}
	return y;
};

var Set = function(cmp) {
	this.root = null;
	this.cmp = cmp;
};

Set.prototype.isEmpty = function() {
	return (this.root == null);
};

Set.prototype.insert = function(x, y) {
	if(this.isEmpty()) {
		this.root = new Node(x, y);
	}
	else {
		var cur = this.root;
		var curP = null;
		
		while(cur != null) {
			if(x == cur.k) {
				cur.splay();
				this.root = cur;
				return;
			}
			curP = cur;
			if(this.cmp(x, cur.k)) cur = cur.l;
			else cur = cur.r;
		}

		var n = new Node(x, y);
		n.p = curP;
		if(this.cmp(x, curP.k)) curP.l = n;
		else curP.r = n;
		n.splay();
		this.root = n;
	}
};

Set.prototype.min = function() {
	var x = this.root.min();
	x.splay();
	this.root = x;
	return this.root;
};

Set.prototype.max = function() {
	var x = this.root.max();
	x.splay();
	this.root = x;
	return this.root;
};

Set.prototype.next = function(x) {
	var y = x.next();
	if(y != null) {
		y.splay()
		this.root = y;
		return this.root;
	}
	x.splay();
	this.root = x;
	return null;
};

Set.prototype.prev = function(x) {
	var y = x.prev();
	if(y != null) {
		y.splay()
		this.root = y;
		return this.root;
	}
	x.splay();
	this.root = x;
	return null;
};

Set.prototype.printRec = function(node) {
	if(node != null)
	{	this.printRec(node.l);
		document.write(node.k + ' ');
		this.printRec(node.r);
	}
};

Set.prototype.print = function() {
	this.printRec(this.root);
	document.write('<br />');
};
