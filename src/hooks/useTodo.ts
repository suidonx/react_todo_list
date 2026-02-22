import type { TodoItem } from "../types/todoitem";

export const useTodo = (
  todoList: TodoItem[],
  setTodoList: (todoList: TodoItem[]) => void,
  editedTodo: string,
  setEditedTodo: (editedTodo: string) => void,
  newTodoItem: string,
  setNewTodoItem: (newTodoItem: string) => void,
) => {
  // Todoに追加したタスクを条件ごとに集計する関数
  const countTask = () => {
    return {
      total: todoList.length,
      done: todoList.filter((todo) => todo.isDone).length,
      todo: todoList.filter((todo) => !todo.isDone).length,
    };
  };

  const addTodo = () => {
    // オブジェクトを生成してTodo Listに追加する
    const uuid = self.crypto.randomUUID();

    const addTodoItem = {
      id: uuid,
      name: newTodoItem,
      isDone: false,
      isEdit: false,
    };
    const copiedTodoList = [...todoList, addTodoItem];

    setTodoList(copiedTodoList);
    setNewTodoItem("");
  };

  // 編集完了後に保存ボタンをクリックしたとき、Todo Listを更新する
  const updateTodo = (id: string) => {
    const copiedTodoList = [...todoList];

    const newTodoList = copiedTodoList.map((todo: TodoItem) => {
      if (todo.id === id) {
        todo.name = editedTodo;
        todo.isEdit = false;
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  // チェックボックスをクリックした時、タスクが完了状態かどうかを判定する
  // 現在の状態と反対の状態に更新する
  const changeIsDoneTodo = (id: string) => {
    const copiedTodoList = [...todoList];
    const newTodoList = copiedTodoList.map((todo) => {
      if (todo.id === id) {
        const isDoneTodo = todo.isDone;
        todo.isDone = !isDoneTodo;
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  // 編集ボタンをクリックした時、そのTodoの編集フラグをtrueにする
  const editTodo = (id: string) => {
    const copiedTodoList = [...todoList];
    const newTodoList = copiedTodoList.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = true;
        setEditedTodo(todo.name); // 初期値をupdate用のstateに保存
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // 削除ボタンをクリックしたとき、該当のTodoを削除する
  const deleteTodo = (id: string) => {
    if (confirm("本当によろしいですか？")) {
      const copiedTodoList = [...todoList];
      const newTodoList = copiedTodoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    }
  };

  return {
    countTask,
    addTodo,
    updateTodo,
    changeIsDoneTodo,
    editTodo,
    deleteTodo,
  };
};
