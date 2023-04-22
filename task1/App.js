class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  isLeaf() {
    return this.children.length === 0;
  }

  getMaxDepth() {
    if (this.isLeaf()) {
      return 0;
    }

    let maxDepth = 0;
    for (const child of this.children) {
      maxDepth = Math.max(maxDepth, child.getMaxDepth());
    }

    return maxDepth + 1;
  }

  isEquivalent(otherNode) {
    if (
      this.value !== otherNode.value ||
      this.children.length !== otherNode.children.length
    ) {
      return false;
    }

    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].isEquivalent(otherNode.children[i])) {
        return false;
      }
    }

    return true;
  }

  getLeafCount() {
    if (this.isLeaf()) {
      return 1;
    }

    let count = 0;
    for (const child of this.children) {
      count += child.getLeafCount();
    }

    return count;
  }
}

// Create the tree structure
const root = new TreeNode(5);
const node3 = new TreeNode(3);
const node7 = new TreeNode(7);
const node2 = new TreeNode(2);
const node1 = new TreeNode(1);
const node0 = new TreeNode(0);
const node8 = new TreeNode(8);
const node5a = new TreeNode(5);
const node5b = new TreeNode(5);

root.addChild(node3);
root.addChild(node7);
node3.addChild(node2);
node7.addChild(node1);
node7.addChild(node0);
node0.addChild(node2);
node0.addChild(node8);
node8.addChild(node5a);
node7.addChild(node5b);

// Calculate the number of nodes that do not have any children
const leafCount = root.getLeafCount();
console.log("Leaf count:", leafCount); // Output: 5

// Calculate the largest number of edges in a path from the root to a leaf node
const maxDepth = root.getMaxDepth();
console.log("Max depth:", maxDepth); // Output: 4

// Checking if two instances of the tree are equivalent to each other
const root2 = new TreeNode(5);
const node3_2 = new TreeNode(3);
const node7_2 = new TreeNode(7);
const node2_2 = new TreeNode(2);
const node1_2 = new TreeNode(1);
const node0_2 = new TreeNode(0);
const node8_2 = new TreeNode(8);
const node5a_2 = new TreeNode(5);
const node5b_2 = new TreeNode(5);

root2.addChild(node3_2);
root2.addChild(node7_2);
node3_2.addChild(node2_2);
node7_2.addChild(node1_2);
node7_2.addChild(node0_2);
node0_2.addChild(node2_2);
node0_2.addChild(node8_2);
node8_2.addChild(node5a_2);
node7_2.addChild(node5b_2);

const isEquivalent = root.isEquivalent(root2);
console.log("Is equivalent:", isEquivalent); // Output: true
