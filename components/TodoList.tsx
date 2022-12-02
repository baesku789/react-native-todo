import MakeTodoBtn from './make-todo/MakeTodoBtn';
import {FlatList, StyleSheet, View} from 'react-native';
import Todo from './Todo';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../App';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const TodoList = () => {
  const user = useContext(AuthContext);
  const {email} = user as FirebaseAuthTypes.User;

  const [todos, setTodos] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const todosRef: FirebaseFirestoreTypes.DocumentData[] = [];

  useEffect(() => {
    const subscriber = firestore()
      .collection('Todos')
      .where('email', '==', email)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            todosRef.push(change.doc.data());
          }
        });
        setTodos(todosRef);
      });

    return () => subscriber;
  }, [email]);

  return (
    <View className={'w-full flex justify-center'}>
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
    justifyContent: 'center',
    display: 'flex',
  },
});

export default TodoList;
