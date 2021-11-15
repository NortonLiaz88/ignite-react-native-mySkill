import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface EditableTaskData {
  id: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExist = tasks.find((task) => task.title === newTaskTitle);
    if (taskAlreadyExist) {
      Alert.alert("Você não pode cadastrar uma task com o mesmo nome.");
      return;
    }
    const data: Task = Object.assign(
      {},
      { title: newTaskTitle, id: new Date().getTime(), done: false }
    );
    setTasks((oldState) => [...oldState, data]);
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks];

    const task = updatedTasks.find((task: Task) => task.id === id);
    if (!task) {
      return;
    }
    task.done = !task.done;
    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {return},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
          },
        },
      ]
    );

    //TODO - remove task from state
  }

  function handleEditTask({id, taskNewTitle} : EditableTaskData) {
    const updatedTasks = [...tasks];

    const task = updatedTasks.find((task: Task) => task.id === id);
    if (!task) {
      return;
    }
    task.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
