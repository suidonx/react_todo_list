import { Button, Checkbox, Flex, Input, List } from "@chakra-ui/react";
import { type TodoItem } from "../../types/todoitem";

type Props = {
  item: TodoItem;
  onUpdateTodo: (id: string) => void;
  onChangeIsDoneTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  setEditedTodo: (editedTodo: string) => void;
};

export const TodoListItem = (props: Props) => {
  const {
    item,
    onUpdateTodo,
    onChangeIsDoneTodo,
    onEditTodo,
    onDeleteTodo,
    setEditedTodo,
  } = props;

  // 編集フラグがtrueの時は編集用のフォームを表示
  return item.isEdit ? (
    <List.Item key={item.id} mb={5}>
      <Flex alignItems="center">
        <Input
          defaultValue={item.name}
          onChange={(e) => setEditedTodo(e.target.value)}
          mr={5}
        />
        <Button onClick={() => onUpdateTodo(item.id)} colorPalette="teal">
          保存
        </Button>
      </Flex>
    </List.Item>
  ) : (
    // 編集フラグがfalseの時は通常のTodoを表示
    <List.Item key={item.id} mb={3}>
      <Flex alignItems="center" gap={4}>
        <Checkbox.Root onCheckedChange={() => onChangeIsDoneTodo(item.id)}>
          <Checkbox.Control />
          <Checkbox.HiddenInput />
          <Checkbox.Label>{item.name}</Checkbox.Label>
        </Checkbox.Root>
        <Button onClick={() => onEditTodo(item.id)} colorPalette="yellow">
          編集
        </Button>
        <Button onClick={() => onDeleteTodo(item.id)} colorPalette="red">
          削除
        </Button>
      </Flex>
    </List.Item>
  );
};
