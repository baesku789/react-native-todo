import {Pressable, Text, View} from 'react-native';
import {ITodo} from '../index';
import React from 'react';
import CheckIcon from 'assets/images/task_alt_FILL0_wght400_GRAD0_opsz40.svg';
import DeleteIcon from 'assets/images/delete_FILL0_wght400_GRAD0_opsz40.svg';
import firestore from '@react-native-firebase/firestore';

const Todo = ({text, done, id}: ITodo) => {
  const handleDone = async () => {
    await firestore().collection('Todos').doc(id).update({done: !done});
  };

  const deleteTodo = async () => {
    await firestore().collection('Todos').doc(id).delete();
  };

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
        <Text className={'text-18'}>{text}</Text>
      </View>
      <Pressable onPress={deleteTodo}>
        <DeleteIcon fill={'#ed7272'} />
      </Pressable>
    </View>
  );
};

export default Todo;
