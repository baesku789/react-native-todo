import {Pressable, Text} from 'react-native';
import React from 'react';

const MakeTodoBtn = () => {
  return (
    <Pressable
      className={
        'w-120 flex justify-center items-center bg-[#ed7272] rounded-full h-40'
      }>
      <Text className={'text-center'}>할일 추가</Text>
    </Pressable>
  );
};

export default MakeTodoBtn;
