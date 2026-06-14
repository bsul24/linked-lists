import LinkedList from "./LinkedList.js";

describe("LinkedList", () => {
  describe("empty list", () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
    });

    test("starts with size 0", () => {
      expect(list.size()).toBe(0);
    });

    test("head() returns undefined", () => {
      expect(list.head()).toBeUndefined();
    });

    test("tail() returns undefined", () => {
      expect(list.tail()).toBeUndefined();
    });

    test("at() returns undefined", () => {
      expect(list.at(0)).toBeUndefined();
    });

    test("pop() returns undefined", () => {
      expect(list.pop()).toBeUndefined();
    });

    test("contains() returns false", () => {
      expect(list.contains("dog")).toBe(false);
    });

    test("findIndex() returns -1", () => {
      expect(list.findIndex("dog")).toBe(-1);
    });

    test("toString() returns an empty string", () => {
      expect(list.toString()).toBe("");
    });
  });

  describe("append()", () => {
    test("adds values to the end of the list", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });
  });

  describe("prepend()", () => {
    test("adds a value to the start of the list", () => {
      const list = new LinkedList();

      list.append("cat");
      list.append("parrot");
      list.prepend("dog");

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("works on an empty list", () => {
      const list = new LinkedList();

      list.prepend("dog");

      expect(list.size()).toBe(1);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("dog");
      expect(list.toString()).toBe("( dog ) -> null");
    });
  });

  describe("at()", () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
      list.append("dog");
      list.append("cat");
      list.append("parrot");
      list.append("hamster");
    });

    test("returns the value at a valid index", () => {
      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBe("cat");
      expect(list.at(3)).toBe("hamster");
    });

    test("returns undefined for an out-of-bounds index", () => {
      expect(list.at(4)).toBeUndefined();
      expect(list.at(-1)).toBeUndefined();
    });
  });

  describe("contains()", () => {
    test("returns true if the value exists and false otherwise", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      expect(list.contains("dog")).toBe(true);
      expect(list.contains("cat")).toBe(true);
      expect(list.contains("parrot")).toBe(true);
      expect(list.contains("snake")).toBe(false);
    });
  });

  describe("findIndex()", () => {
    test("returns the index of the first matching value", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");
      list.append("cat");

      expect(list.findIndex("dog")).toBe(0);
      expect(list.findIndex("cat")).toBe(1);
      expect(list.findIndex("parrot")).toBe(2);
      expect(list.findIndex("snake")).toBe(-1);
    });
  });

  describe("pop()", () => {
    test("removes and returns the head value", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      expect(list.pop()).toBe("dog");
      expect(list.size()).toBe(2);
      expect(list.head()).toBe("cat");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( cat ) -> ( parrot ) -> null");
    });

    test("works until the list is empty", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(list.pop()).toBe("dog");
      expect(list.pop()).toBe("cat");
      expect(list.pop()).toBeUndefined();

      expect(list.size()).toBe(0);
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.toString()).toBe("");
    });
  });

  describe("insertAt()", () => {
    test("inserts into an empty list at index 0", () => {
      const list = new LinkedList();

      list.insertAt(0, "dog");

      expect(list.size()).toBe(1);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("dog");
      expect(list.toString()).toBe("( dog ) -> null");
    });

    test("inserts one value at the beginning", () => {
      const list = new LinkedList();

      list.append("cat");
      list.append("parrot");

      list.insertAt(0, "dog");

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("inserts one value in the middle", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("parrot");

      list.insertAt(1, "cat");

      expect(list.size()).toBe(3);
      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBe("cat");
      expect(list.at(2)).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("inserts one value at the end", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.insertAt(2, "parrot");

      expect(list.size()).toBe(3);
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("inserts multiple values in the middle in order", () => {
      const list = new LinkedList();

      list.append(1);
      list.append(2);
      list.append(3);

      list.insertAt(1, 10, 11);

      expect(list.size()).toBe(5);
      expect(list.at(0)).toBe(1);
      expect(list.at(1)).toBe(10);
      expect(list.at(2)).toBe(11);
      expect(list.at(3)).toBe(2);
      expect(list.at(4)).toBe(3);
      expect(list.toString()).toBe(
        "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
      );
    });

    test("inserts multiple values at the beginning in order", () => {
      const list = new LinkedList();

      list.append(3);
      list.append(4);

      list.insertAt(0, 1, 2);

      expect(list.size()).toBe(4);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(4);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
    });

    test("inserts multiple values at the end in order", () => {
      const list = new LinkedList();

      list.append(1);
      list.append(2);

      list.insertAt(2, 3, 4);

      expect(list.size()).toBe(4);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(4);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
    });

    test("does not change the list if no values are provided", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.insertAt(1);

      expect(list.size()).toBe(2);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("throws RangeError for a negative index", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.insertAt(-1, "parrot")).toThrow(RangeError);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("throws RangeError for an index greater than size", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.insertAt(3, "parrot")).toThrow(RangeError);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("throws RangeError when inserting into an empty list above index 0", () => {
      const list = new LinkedList();

      expect(() => list.insertAt(1, "dog")).toThrow(RangeError);
      expect(list.size()).toBe(0);
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.toString()).toBe("");
    });

    test("allows inserting multiple values into an empty list at index 0", () => {
      const list = new LinkedList();

      list.insertAt(0, "dog", "cat", "parrot");

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("throws RangeError for index greater than size, not just greater than last index", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      expect(() => list.insertAt(4, "hamster")).toThrow(RangeError);

      expect(list.size()).toBe(3);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("allows inserting at index equal to size", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.insertAt(3, "hamster");

      expect(list.size()).toBe(4);
      expect(list.tail()).toBe("hamster");
      expect(list.toString()).toBe(
        "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> null",
      );
    });

    test("inserting multiple values at index equal to size updates tail correctly", () => {
      const list = new LinkedList();

      list.append(1);
      list.append(2);

      list.insertAt(2, 3, 4, 5);

      expect(list.size()).toBe(5);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(5);
      expect(list.toString()).toBe(
        "( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> null",
      );
    });

    test("inserting multiple values at the beginning keeps them in the given order", () => {
      const list = new LinkedList();

      list.append(3);
      list.append(4);

      list.insertAt(0, 1, 2);

      expect(list.size()).toBe(4);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(4);
      expect(list.at(0)).toBe(1);
      expect(list.at(1)).toBe(2);
      expect(list.at(2)).toBe(3);
      expect(list.at(3)).toBe(4);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
    });

    test("inserting multiple values in the middle keeps the rest of the list connected", () => {
      const list = new LinkedList();

      list.append("a");
      list.append("b");
      list.append("e");
      list.append("f");

      list.insertAt(2, "c", "d");

      expect(list.size()).toBe(6);
      expect(list.head()).toBe("a");
      expect(list.tail()).toBe("f");
      expect(list.at(0)).toBe("a");
      expect(list.at(1)).toBe("b");
      expect(list.at(2)).toBe("c");
      expect(list.at(3)).toBe("d");
      expect(list.at(4)).toBe("e");
      expect(list.at(5)).toBe("f");
      expect(list.toString()).toBe(
        "( a ) -> ( b ) -> ( c ) -> ( d ) -> ( e ) -> ( f ) -> null",
      );
    });

    test("list still works after inserting at the beginning", () => {
      const list = new LinkedList();

      list.append("cat");
      list.append("parrot");

      list.insertAt(0, "dog");

      list.append("hamster");

      expect(list.size()).toBe(4);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("hamster");
      expect(list.toString()).toBe(
        "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> null",
      );
    });

    test("list still works after inserting at the end", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.insertAt(2, "parrot");

      list.append("hamster");

      expect(list.size()).toBe(4);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("hamster");
      expect(list.toString()).toBe(
        "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> null",
      );
    });

    test("pop works correctly after insertAt at the beginning", () => {
      const list = new LinkedList();

      list.append("cat");
      list.append("parrot");

      list.insertAt(0, "dog");

      expect(list.pop()).toBe("dog");
      expect(list.size()).toBe(2);
      expect(list.head()).toBe("cat");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( cat ) -> ( parrot ) -> null");
    });

    test("pop works correctly after insertAt in the middle", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("parrot");

      list.insertAt(1, "cat");

      expect(list.pop()).toBe("dog");
      expect(list.pop()).toBe("cat");
      expect(list.pop()).toBe("parrot");
      expect(list.pop()).toBeUndefined();
      expect(list.size()).toBe(0);
      expect(list.toString()).toBe("");
    });

    test("insertAt with no values does not modify a valid list", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.insertAt(1);

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("cat");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("insertAt with no values still throws if index is out of bounds", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.insertAt(3)).toThrow(RangeError);
      expect(() => list.insertAt(-1)).toThrow(RangeError);

      expect(list.size()).toBe(2);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("can insert falsy values", () => {
      const list = new LinkedList();

      list.append("start");
      list.append("end");

      list.insertAt(1, 0, false, "", null);

      expect(list.size()).toBe(6);
      expect(list.at(0)).toBe("start");
      expect(list.at(1)).toBe(0);
      expect(list.at(2)).toBe(false);
      expect(list.at(3)).toBe("");
      expect(list.at(4)).toBe(null);
      expect(list.at(5)).toBe("end");
      expect(list.tail()).toBe("end");
    });
  });

  describe("removeAt()", () => {
    test("throws RangeError when removing from an empty list", () => {
      const list = new LinkedList();

      expect(() => list.removeAt(0)).toThrow(RangeError);
      expect(list.size()).toBe(0);
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.toString()).toBe("");
    });

    test("throws RangeError for a negative index", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.removeAt(-1)).toThrow(RangeError);

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("cat");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("throws RangeError for index equal to size", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.removeAt(2)).toThrow(RangeError);

      expect(list.size()).toBe(2);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("throws RangeError for index greater than size", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      expect(() => list.removeAt(3)).toThrow(RangeError);

      expect(list.size()).toBe(2);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("removes the only node in a single-node list", () => {
      const list = new LinkedList();

      list.append("dog");

      list.removeAt(0);

      expect(list.size()).toBe(0);
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.at(0)).toBeUndefined();
      expect(list.contains("dog")).toBe(false);
      expect(list.findIndex("dog")).toBe(-1);
      expect(list.toString()).toBe("");
    });

    test("removes the head node from a multi-node list", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.removeAt(0);

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("cat");
      expect(list.tail()).toBe("parrot");
      expect(list.at(0)).toBe("cat");
      expect(list.at(1)).toBe("parrot");
      expect(list.at(2)).toBeUndefined();
      expect(list.toString()).toBe("( cat ) -> ( parrot ) -> null");
    });

    test("removes a middle node", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");
      list.append("hamster");

      list.removeAt(1);

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("hamster");
      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBe("parrot");
      expect(list.at(2)).toBe("hamster");
      expect(list.at(3)).toBeUndefined();
      expect(list.contains("cat")).toBe(false);
      expect(list.findIndex("cat")).toBe(-1);
      expect(list.toString()).toBe(
        "( dog ) -> ( parrot ) -> ( hamster ) -> null",
      );
    });

    test("removes the tail node", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.removeAt(2);

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("cat");
      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBe("cat");
      expect(list.at(2)).toBeUndefined();
      expect(list.contains("parrot")).toBe(false);
      expect(list.findIndex("parrot")).toBe(-1);
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("removes the second node from a two-node list", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.removeAt(1);

      expect(list.size()).toBe(1);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("dog");
      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBeUndefined();
      expect(list.toString()).toBe("( dog ) -> null");
    });

    test("removes the first node from a two-node list", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");

      list.removeAt(0);

      expect(list.size()).toBe(1);
      expect(list.head()).toBe("cat");
      expect(list.tail()).toBe("cat");
      expect(list.at(0)).toBe("cat");
      expect(list.at(1)).toBeUndefined();
      expect(list.toString()).toBe("( cat ) -> null");
    });

    test("can remove multiple nodes one after another", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");
      list.append("hamster");
      list.append("snake");

      list.removeAt(1); // removes cat
      list.removeAt(2); // removes hamster
      list.removeAt(0); // removes dog

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("parrot");
      expect(list.tail()).toBe("snake");
      expect(list.at(0)).toBe("parrot");
      expect(list.at(1)).toBe("snake");
      expect(list.toString()).toBe("( parrot ) -> ( snake ) -> null");
    });

    test("list still works after removing the head", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.removeAt(0);
      list.append("hamster");
      list.prepend("fish");

      expect(list.size()).toBe(4);
      expect(list.head()).toBe("fish");
      expect(list.tail()).toBe("hamster");
      expect(list.toString()).toBe(
        "( fish ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> null",
      );
    });

    test("list still works after removing the tail", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.removeAt(2);
      list.append("hamster");

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("hamster");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( hamster ) -> null");
    });

    test("list still works after removing a middle node", () => {
      const list = new LinkedList();

      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);

      list.removeAt(1);
      list.insertAt(1, 20);

      expect(list.size()).toBe(4);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(4);
      expect(list.toString()).toBe("( 1 ) -> ( 20 ) -> ( 3 ) -> ( 4 ) -> null");
    });

    test("removing from a list with duplicate values only removes the node at the given index", () => {
      const list = new LinkedList();

      list.append("cat");
      list.append("dog");
      list.append("cat");
      list.append("parrot");

      list.removeAt(2);

      expect(list.size()).toBe(3);
      expect(list.contains("cat")).toBe(true);
      expect(list.findIndex("cat")).toBe(0);
      expect(list.toString()).toBe("( cat ) -> ( dog ) -> ( parrot ) -> null");
    });

    test("can remove falsy values by index", () => {
      const list = new LinkedList();

      list.append("start");
      list.append(0);
      list.append(false);
      list.append("");
      list.append(null);
      list.append("end");

      list.removeAt(1); // removes 0
      list.removeAt(1); // removes false
      list.removeAt(1); // removes empty string
      list.removeAt(1); // removes null

      expect(list.size()).toBe(2);
      expect(list.head()).toBe("start");
      expect(list.tail()).toBe("end");
      expect(list.toString()).toBe("( start ) -> ( end ) -> null");
    });

    test("does not modify the list when removeAt throws", () => {
      const list = new LinkedList();

      list.append("dog");
      list.append("cat");
      list.append("parrot");

      expect(() => list.removeAt(99)).toThrow(RangeError);

      expect(list.size()).toBe(3);
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });
  });
});
