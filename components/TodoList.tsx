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
      .onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              todosRef.push({...change.doc.data(), id: change.doc.id});
              setTodos(todosRef);
            }
            if (change.type === 'modified') {
              const index = todosRef.findIndex(
                todo => todo.id === change.doc.id,
              );
              todosRef[index] = {...todosRef[index], ...change.doc.data()};
              setTodos(todosRef);
            }
            if (change.type === 'removed') {
              setTodos(
                todosRef.filter(
                  todo => todo.id !== firestore.FieldPath.documentId(),
                ),
              );
            }
          });
        },
        error => console.log(error),
      );

    return () => subscriber;
  }, [email]);

  return (
    <View className={'w-full flex justify-center mt-20'}>
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
    gap: '10px',
  },
});

export default TodoList;
