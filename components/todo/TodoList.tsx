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
  const renderItem = ({item}: ITodo) => {
    return <Todo {...item} />;
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
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
