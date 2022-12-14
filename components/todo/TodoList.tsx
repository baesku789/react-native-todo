import {FlatList, StyleSheet, View} from 'react-native';
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
    <View className={'max-h-[65vh]'}>
      <FlatList
        contentContainerStyle={styles.container}
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
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
