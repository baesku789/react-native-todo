import {useCallback, useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {ITodo} from '../index';

interface FirebaseTodo extends ITodo {
  email: string;
}

export const useTodos = (email: string) => {
  const [todos, setTodos] = useState<FirebaseTodo[]>([]);

  const onResult = useCallback(
    (
      querySnapShot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
    ) => {
      let list: FirebaseTodo[] | [] = [];

      querySnapShot.docChanges().forEach(change => {
        list.push(change.doc.data());
      });

      setTodos(list);
    },
    [],
  );

  const onError = (e: Error) => {
    console.error(e);
  };

  useEffect(() => {
    const todosCollection = firestore()
      .collection('Todos')
      .where('email', '==', email);

    const subscriber = todosCollection.onSnapshot(onResult, onError);

    return () => subscriber;
  }, [email]);

  return [todos, setTodos];
};
