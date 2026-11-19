class Node {
  constructor(value) {
    this.value = value;
    this.left = null;  // Посилання на лівого нащадка
    this.right = null; // Посилання на правого нащадка
  }
}

class BinaryTree {
  constructor() {
    this.root = null; // Корінь дерева
  }

  // 1. Додавання елемента (< ліворуч, >= праворуч)
  add(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // 2. Перевірка наявності елемента (пошук)
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // 3. Видалення елемента
  remove(value) {
    const removeNode = (node, val) => {
      if (!node) return null;
      if (val < node.value) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.value) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        // Без нащадків або з одним нащадком
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Два нащадки: беремо найбільш лівий вузол із правого піддерева
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.value = minRight.value;
        node.right = removeNode(node.right, minRight.value);
        return node;
      }
    };
    this.root = removeNode(this.root, value);
  }

  // 4. Виведення всіх елементів (від меншого до більшого)
  print() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    traverse(this.root);
    console.log(result.join(' -> '));
  }

  // 5. Виведення найбільшого елемента
  findMax() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }

  // 6. Виведення найменшого елемента
  findMin() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.value;
  }

  // 7. Виведення кількості елементів
  count(node = this.root) {
    if (!node) return 0;
    return 1 + this.count(node.left) + this.count(node.right);
  }
}

// Тестування (на прикладі дерева з методички):
const tree = new BinaryTree();
[3, 1, 9, 7, 10, 6, 8].forEach(num => tree.add(num));

tree.print();                        // 1 -> 3 -> 6 -> 7 -> 8 -> 9 -> 10
console.log('Пошук 7:', tree.find(7));   // true
console.log('Мінімум:', tree.findMin()); // 1
console.log('Максимум:', tree.findMax());// 10
console.log('Кількість:', tree.count()); // 7

tree.remove(3);                      // Видаляємо корінь 3 (заміниться на 6)
tree.print();                        // 1 -> 6 -> 7 -> 8 -> 9 -> 10
