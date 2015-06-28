# splay
An implementation of the splay-tree data structure written in JavaScript. A splay-tree is a self-adjusting binary search tree, it uses a heuristic to re-adjust itself after each operation and there is no need to store extra information at the nodes to restore the balance (saves some bits of space).

Splay-trees are cache-friendly in the sense that data items that are accessed recently live near the root of the tree, so next accesses to them will be fast. In fact, a sequence of `m` splay-tree operations (starting with an empty sequence) takes  `O(m lg m)` time.

# API

`var S = new Set(comparator);`

Creates a new set where the items are compared using the comparison function `comparator`.

`S.insert(key, value);`

Inserts a new data item `(key, value)` into the set S if the key does not exist already.

`S.remove(key);`

Removes the data item whose key is `key` if it exists.

`S.min();`

Returns the node with the smallest key in the set.

`S.max();`

Returns the node with the largest key in the set.

`S.prev(node);`

Returns the node whose key is the largest key that is less than `node`'s key.

`S.next(node);`

Returns the node whose key is the smallest key that is less than `node`'s key.

# Example

A sorting function for integers.
<pre>
var Sort = function(L) {
	var S = new Set(function(x, y) { return x < y; });
	for(var i = 0; i < L.length; i++) {
		S.insert(L[i]);
	}
	var sorted = [];
	var x = S.min();
	do {
		sorted.push(x.k);
		x = S.next(x);
	} while(x);
	return sorted;
};

var L = [5, 4, 7, 1, 9, 8];
L = Sort(L);
document.write(L);
</pre>
