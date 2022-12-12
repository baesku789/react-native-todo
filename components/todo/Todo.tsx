import {Pressable, Text, View} from 'react-native';
import {ITodo} from '../../index';
import React, {useEffect, useState} from 'react';
import CheckIcon from 'assets/images/task_alt_FILL0_wght400_GRAD0_opsz40.svg';
import DeleteIcon from 'assets/images/delete_FILL0_wght400_GRAD0_opsz40.svg';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const Todo = ({text, done, id}: ITodo) => {
  const [doc, setDoc] = useState<FirebaseFirestoreTypes.DocumentData | null>(
    null,
  );

  const getDoc = async () => {
    const res = await firestore().collection('Todos').doc(id);
    return res;
  };

  const handleDone = async () => {
    if (!doc) return;
    await doc.update({done: !done});
  };

  const deleteTodo = async () => {
    if (!doc) return;
    await doc.delete();
  };

  useEffect(() => {
    getDoc().then(res => setDoc(res));
  }, []);

  if (!doc) {
    return (
      <View>
        <Text>no firebase</Text>
      </View>
    );
  }

  return (
    <View
      className={
        'flex flex-row items-center justify-between border-1 border-gray1 rounded-10 mt-10 last:mt-0 p-5'
      }>
      <View className={'flex flex-row items-center gap-10'}>
        <Pressable onPress={handleDone}>
          {!done ? (
            <CheckIcon fill={'lightgrey'} />
          ) : (
            <CheckIcon fill={'#81f547'} />
          )}
        </Pressable>
        <View className={'flex-1'}>
          <Text className={'text-18 text-ellipsis whitespace-nowrap'}>
            {text}
          </Text>
        </View>
        <Pressable onPress={deleteTodo}>
          <DeleteIcon fill={'#ed7272'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;
