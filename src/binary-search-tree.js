const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.treeRoot = null;
	}
	root() {
		return this.treeRoot ?? null;
	}
	add(data) {
		function addNode(node, data) {
			if (!node) {
				return new Node(data);
			}
			if (node.data === data) {
				return node;
			}
			if (node.data > data) {
				node.left = addNode(node.left, data);
			} else {
				node.right = addNode(node.right, data);
			}
			return node;
		}
		this.treeRoot = addNode(this.treeRoot, data);
	}
	has(data) {
		let result = false;
		function isHasNode(node, data) {
			if (!node) {
				return false;
			}
			if (node.data === data) {
				result = true;
			}
			if (node.left) {
				result = isHasNode(node.left, data);
				if (node.right) {
					result = isHasNode(node.right, data);
				}
			} else {
				if (node.right) {
					result = isHasNode(node.right, data);
				}
			}
			return result;
		}
		return isHasNode(this.treeRoot, data);
	}

	find(data) {
		let result = null;
		function findNode(node, data) {
			if (!node) {
				return null;
			}
			if (node.data === data) {
				result = node;
			}
			if (node.left) {
				result = findNode(node.left, data);
				if (node.right) {
					result = findNode(node.right, data);
				}
			} else {
				if (node.right) {
					result = findNode(node.right, data);
				}
			}
			return result;
		}
		return findNode(this.treeRoot, data);
	}

	remove(data) {
		function removeNode(node, data) {
			if (!node) {
				return null;
			}
			if (node.data > data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				if (node.data < data) {
					node.right = removeNode(node.right, data);
					return node;
				} else {
					if (!node.left && !node.right) {
						return null;
					}
				}
			}
			if (!node.left) {
				node = node.right;
				return node;
			}
			if (!node.right) {
				node = node.left;
				return node;
			}
			let minFromRight = node.right;
			while (minFromRight.left) {
				minFromRight = minFromRight.left;
			}
			node.data = minFromRight.data;
			node.right = removeNode(node.right, minFromRight.data);
			return node;
		}
		this.treeRoot = removeNode(this.treeRoot, data);
	}

	min() {
		let min = this.treeRoot?.data;
		function nodesBypass(node, min) {
			if (!node) {
				return null;
			}
			if (node.data < min) {
				min = node.data;
			}
			if (node.left) {
				min = nodesBypass(node.left, min);
				if (node.right) {
					min = nodesBypass(node.right, min);
				}
			} else {
				if (node.right) {
					min = nodesBypass(node.right, min);
				}
			}
			return min;
		}
		return nodesBypass(this.treeRoot, min);
	}

	max() {
		let max = this.treeRoot?.data;
		function nodesBypass(node, max) {
			if (!node) {
				return null;
			}
			if (node.data > max) {
				max = node.data;
			}
			if (node.left) {
				max = nodesBypass(node.left, max);
				if (node.right) {
					max = nodesBypass(node.right, max);
				}
			} else {
				if (node.right) {
					max = nodesBypass(node.right, max);
				}
			}
			return max;
		}
		return nodesBypass(this.treeRoot, max);
	}
}

const binaryTree = new BinarySearchTree();
const desired = 12;
binaryTree.add(5);
console.log(binaryTree.root());
binaryTree.add(8);
binaryTree.add(2);
binaryTree.add(12);
binaryTree.add(42);
binaryTree.add(1);
binaryTree.add(10);
binaryTree.add(6);
binaryTree.add(3);
console.log(binaryTree.has(desired));
console.log(binaryTree.find(desired));
console.log(binaryTree.min());
console.log(binaryTree.max());

module.exports = {
	BinarySearchTree,
};
