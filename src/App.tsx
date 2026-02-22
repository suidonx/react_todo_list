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
import { useTodo } from "./hooks/useTodo";

function App() {
  // state
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [editedTodo, setEditedTodo] = useState("");
  const [newTodoItem, setNewTodoItem] = useState("");

  const {
    countTask,
    addTodo,
    updateTodo,
    changeIsDoneTodo,
    editTodo,
    deleteTodo,
  } = useTodo(
    todoList,
    setTodoList,
    editedTodo,
    setEditedTodo,
    newTodoItem,
    setNewTodoItem,
  );

  const status = countTask();

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
            onClick={addTodo}
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
              onUpdateTodo={updateTodo}
              onChangeIsDoneTodo={changeIsDoneTodo}
              onEditTodo={editTodo}
              onDeleteTodo={deleteTodo}
              setEditedTodo={setEditedTodo}
            />
          ))}
        </List.Root>
      </Box>
    </>
  );
}
export default App;
