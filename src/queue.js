const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
	constructor() {
		this.list = null;
		this.listSize = 0;
	}
	getUnderlyingList() {
		return this.list;
	}

	enqueue(value) {
		if (!this.listSize) {
			this.list = new ListNode(value);
		} else {
			let currentItem = this.list;
			while (currentItem.next) {
				currentItem = currentItem.next;
			}
			currentItem.next = new ListNode(value);
		}
		this.listSize++;
	}

	dequeue() {
		if (!this.listSize) {
			return;
		}
		const value = this.list.value;
		this.list = this.list.next;
		this.listSize--;
		return value;
	}
}

module.exports = {
	Queue,
};
