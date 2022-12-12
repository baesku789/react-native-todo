import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../App';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {WritableDraft} from 'immer/dist/internal';
import produce from 'immer';
import TodoList from './TodoList';

const TodoContainer = () => {
  const user = useContext(AuthContext);
  const {email} = user as FirebaseAuthTypes.User;

  const [todos, setTodos] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

  const addTodo = (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setTodos(todos => [...todos, {...change.doc.data(), id: change.doc.id}]);
  };

  const modifyTodo = (change: {
    doc: {
      id: any;
      data: () => WritableDraft<FirebaseFirestoreTypes.DocumentData>;
    };
  }) => {
    setTodos(todos => {
      const index = todos.findIndex(todo => todo.id === change.doc.id);
      return produce(todos, draft => {
        draft[index] = {...todos[index], ...change.doc.data()};
      });
    });
  };

  const removeTodo = (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setTodos(todos => todos.filter(todo => todo.id !== change.doc.id));
  };

  useEffect(() => {
    // firebase 연동 시 미리 데이터 받아오기
    const query = firestore().collection('Todos').where('email', '==', email);

    const subscriber = query.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            addTodo(change);
          }
          if (change.type === 'modified') {
            modifyTodo(change);
          }
          if (change.type === 'removed') {
            removeTodo(change);
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
      <TodoList todos={todos} />
    </View>
  );
};

export default TodoContainer;
