import {Pressable, Text, View} from 'react-native';
import {ITodo} from '../index';
import React from 'react';
import CheckIcon from '../assets/images/task_alt_FILL0_wght400_GRAD0_opsz40.svg';
import firestore from '@react-native-firebase/firestore';

const Todo = ({text, done, id}: ITodo) => {
  const handleDone = async () => {
    await firestore().collection('Todos').doc(id).update({done: !done});
  };

  return (
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
  );
};

export default Todo;
