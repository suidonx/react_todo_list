import "./App.css";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  List,
  Text,
} from "@chakra-ui/react";

import { type TodoItem } from "./types/todoitem";
import { TodoListItem } from "./components/todo/TodoItem";

function App() {
  // state
  const [newTodoItem, setNewTodoItem] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [updateTodo, setUpdateTodo] = useState("");

  // Todoに追加したタスクを条件ごとに集計する関数
  const countTask = () => {
    return {
      total: todoList.length,
      done: todoList.filter((todo) => todo.isDone).length,
      todo: todoList.filter((todo) => !todo.isDone).length,
    };
  };
  const status = countTask();

  // Create
  // オブジェクトを生成してTodo Listに追加する
  const onClickAdd = () => {
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

  // Read
  // チェックボックスをクリックした時、タスクが完了状態かどうかを判定する
  // 現在の状態と反対の状態に更新する
  const onCheckedChangeIsDone = (id: string) => {
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

  // Update
  // 編集完了後に保存ボタンをクリックしたとき、Todo Listを更新する
  const onClickUpdate = (id: string) => {
    const copiedTodoList = [...todoList];
    const newTodoList = copiedTodoList.map((todo) => {
      if (todo.id === id) {
        todo.name = updateTodo;
        todo.isEdit = false;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // 編集ボタンをクリックした時、そのTodoの編集フラグをtrueにする
  const onClickEdit = (id: string) => {
    const copiedTodoList = [...todoList];
    const newTodoList = copiedTodoList.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = true;
        setUpdateTodo(todo.name); // 初期値をupdate用のstateに保存
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // Delete
  // 削除ボタンをクリックしたとき、該当のTodoを削除する
  const onClickDelete = (id: string) => {
    if (confirm("本当によろしいですか？")) {
      const copiedTodoList = [...todoList];
      const newTodoList = copiedTodoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    }
  };

  return (
    <>
      <Box mb={3}>
        <Heading size="2xl">Todo List</Heading>
        <Text fontSize="md">タスクを管理することができます。</Text>
      </Box>

      <Box mb={3}>
        <Heading size="lg">タスク集計</Heading>
        <Text>全てのタスク: {status.total}</Text>
        <Text>完了済み: {status.done}</Text>
        <Text>未完了: {status.todo}</Text>
      </Box>

      <Box mb={3}>
        <Heading size="lg" mb="2">
          新規タスクを追加する
        </Heading>
        <Flex>
          <Input
            value={newTodoItem}
            onChange={(e) => setNewTodoItem(e.target.value)}
            mr={5}
          />
          <Button
            onClick={onClickAdd}
            disabled={newTodoItem === ""}
            colorPalette="cyan"
          >
            保存
          </Button>
        </Flex>
      </Box>

      <Box>
        <Heading size="lg">ToDo一覧</Heading>
        <List.Root listStyle="none">
          {todoList.map((item) => (
            <TodoListItem
              item={item}
              onClickUpdate={onClickUpdate}
              onCheckedChangeIsDone={onCheckedChangeIsDone}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              setUpdateTodo={setUpdateTodo}
            />
          ))}
        </List.Root>
      </Box>
    </>
  );
}
export default App;
