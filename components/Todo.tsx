import {Text, View} from 'react-native';
import {ITodo} from '../index';
import React from 'react';
import CheckIcon from '../assets/images/task_alt_FILL0_wght400_GRAD0_opsz40.svg';

const Todo = ({text, done}: ITodo) => {
  return (
    <View className={'flex flex-row items-center gap-10 '}>
      {!done ? (
        <CheckIcon fill={'lightgrey'} />
      ) : (
        <CheckIcon fill={'#81f547'} />
      )}
      <Text className={'text-18'}>{text}</Text>
    </View>
  );
};

export default Todo;
