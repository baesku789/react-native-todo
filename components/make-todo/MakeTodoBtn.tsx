import {Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import MakeTodoModal from './MakeTodoModal';
import {twButton} from '../../tailwindStyle';

const MakeTodoBtn = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const submitTodo = (text: string) => {
    setShow(false);
  };

  return (
    <>
      <Pressable className={`w-120 ${twButton}`} onPress={showModal}>
        <Text className={'text-center'}>할일 추가</Text>
      </Pressable>
      <MakeTodoModal
        animationType={'slide'}
        visible={show}
        onRequestClose={() => setShow(false)}
        handlePress={submitTodo}
      />
    </>
  );
};

export default MakeTodoBtn;
