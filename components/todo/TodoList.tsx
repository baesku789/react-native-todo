import MakeTodoBtn from '../make-todo/MakeTodoBtn';
import {FlatList, StyleSheet} from 'react-native';
import Todo from './Todo';
import React from 'react';
import {ITodo} from '../../index';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

interface TodoListProps {
  todos: FirebaseFirestoreTypes.DocumentData[];
}

const TodoList = ({todos}: TodoListProps) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={todos}
      keyExtractor={item => item.id}
      renderItem={(item: ITodo) => <Todo {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    display: 'flex',
    gap: '10px',
  },
});

export default TodoList;
