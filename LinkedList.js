class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.length = 0;
    this.headNode = null;
    this.tailNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    } else {
      this.tailNode.nextNode = newNode;
      this.tailNode = newNode;
    }
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    } else {
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
    }
    this.length++;
  }

  size() {
    return this.length;
  }

  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  tail() {
    return this.tailNode ? this.tailNode.value : undefined;
  }

  at(index) {
    if (!this.headNode || index < 0) {
      return undefined;
    }
    let cur = this.headNode;
    while (index > 0 && cur) {
      cur = cur.nextNode;
      index--;
    }
    return cur ? cur.value : undefined;
  }

  pop() {
    if (!this.headNode) {
      return undefined;
    }
    const value = this.headNode.value;
    if (this.headNode === this.tailNode) {
      this.headNode = null;
      this.tailNode = null;
    } else {
      this.headNode = this.headNode.nextNode;
    }
    this.length--;
    return value;
  }

  contains(value) {
    let cur = this.headNode;
    while (cur) {
      if (cur.value === value) {
        return true;
      }
      cur = cur.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let index = 0;
    let cur = this.headNode;
    while (cur) {
      if (cur.value === value) {
        return index;
      }
      index++;
      cur = cur.nextNode;
    }
    return -1;
  }

  toString() {
    if (!this.headNode) {
      return "";
    }
    let returnString = "";
    let cur = this.headNode;
    while (cur) {
      returnString += `( ${cur.value} ) -> `;
      cur = cur.nextNode;
    }
    returnString += "null";
    return returnString;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.length) {
      throw new RangeError("Index is out of bounds");
    }

    if (values.length === 0) {
      return;
    }

    if (index === this.length) {
      for (const val of values) {
        this.append(val);
      }
      return;
    }

    if (index === 0) {
      this.prepend(values[0]);

      let cur = this.headNode;

      for (let i = 1; i < values.length; i++) {
        const newNode = new Node(values[i]);
        newNode.nextNode = cur.nextNode;
        cur.nextNode = newNode;
        cur = newNode;
        this.length++;
      }
      return;
    }

    let cur = this.headNode;

    while (index > 1) {
      cur = cur.nextNode;
      index--;
    }

    for (const val of values) {
      const newNode = new Node(val);
      newNode.nextNode = cur.nextNode;
      cur.nextNode = newNode;
      cur = newNode;
      this.length++;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError("Index is out of bounds");
    }

    if (index === 0) {
      this.pop();
      return;
    }

    let cur = this.headNode;
    let prev = null;

    while (index > 0) {
      prev = cur;
      cur = cur.nextNode;
      index--;
    }

    prev.nextNode = cur.nextNode;
    this.length--;
    if (this.tailNode === cur) {
      this.tailNode = prev;
    }
  }
}
