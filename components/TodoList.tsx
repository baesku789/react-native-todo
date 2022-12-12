import MakeTodoBtn from './make-todo/MakeTodoBtn';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Todo from './Todo';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../App';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import produce from 'immer';

const TodoList = () => {
  const user = useContext(AuthContext);
  const {email} = user as FirebaseAuthTypes.User;

  const [todos, setTodos] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

  useEffect(() => {
    // firebase 연동 시 미리 데이터 받아오기
    const query = firestore().collection('Todos').where('email', '==', email);

    const subscriber = query.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            setTodos(todos => [
              ...todos,
              {...change.doc.data(), id: change.doc.id},
            ]);
          }
          if (change.type === 'modified') {
            setTodos(todos => {
              const index = todos.findIndex(todo => todo.id === change.doc.id);
              return produce(todos, draft => {
                draft[index] = {...todos[index], ...change.doc.data()};
              });
            });
          }
          if (change.type === 'removed') {
            setTodos(todos => todos.filter(todo => todo.id !== change.doc.id));
          }
        });
      },
      error => console.log(error),
    );

    return () => subscriber;
  }, [email]);

  return (
    <View className={'w-full flex justify-center mt-20'}>
      <Text>{todos.length}개의 할 일이 있습니다.</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={todos}
        renderItem={({item}) => <Todo {...item} />}
        keyExtractor={(_, index) => index + ''}
      />
      <MakeTodoBtn />
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
