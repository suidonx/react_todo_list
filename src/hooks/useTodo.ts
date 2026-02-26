import { useState } from "react";
import type { TodoItem } from "../types/todoitem";

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = useState("");

  // Todoに追加したタスクを条件ごとに集計する関数
  const countTask = () => {
    return {
      total: todoList.length,
      done: todoList.filter((todo) => todo.isDone).length,
      todo: todoList.filter((todo) => !todo.isDone).length,
    };
  };

  // オブジェクトを生成してTodo Listに追加する
  const addTodo = () => {
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

  // Todoの名前をvalueに更新する
  const updateTodo = (id: string, value: string) => {
    const copiedTodoList = [...todoList];

    const newTodoList = copiedTodoList.map((todo: TodoItem) => {
      if (todo.id === id) {
        todo.name = value;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // 編集フラグを切り替える処理
  const changeIsEditTodo = (id: string) => {
    const copiedTodoList = [...todoList];

    const newTodoList = copiedTodoList.map((todo: TodoItem) => {
      if (todo.id === id) {
        todo.isEdit = !todo.isEdit;
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

  // 削除ボタンをクリックしたとき、該当のTodoを削除する
  const deleteTodo = (id: string) => {
    if (confirm("本当によろしいですか？")) {
      const copiedTodoList = [...todoList];
      const newTodoList = copiedTodoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    }
  };

  return {
    todoList,
    setTodoList,
    newTodoItem,
    setNewTodoItem,
    countTask,
    addTodo,
    updateTodo,
    changeIsEditTodo,
    changeIsDoneTodo,
    deleteTodo,
  };
};
