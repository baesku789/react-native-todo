import MakeTodoBtn from './make-todo/MakeTodoBtn';
import {FlatList, StyleSheet, View} from 'react-native';
import Todo from './Todo';
import React, {useState} from 'react';

const TodoList = () => {
  return (
    <View className={'w-full flex justify-center'}>
      <FlatList
        contentContainerStyle={styles.container}
        data={[]}
        renderItem={() => <Todo />}
        keyExtractor={(_, index) => index + ''}
      />
      <MakeTodoBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: 'flex',
  },
});

export default TodoList;
