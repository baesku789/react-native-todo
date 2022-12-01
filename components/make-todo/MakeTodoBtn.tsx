import {Pressable, Text} from 'react-native';
import React, {createContext, useState} from 'react';
import MakeTodoModal from './MakeTodoModal';
import Button from '../button/Button';

export interface IModalContext {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModalContext | null>(null);

const MakeTodoBtn = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const submitTodo = (text: string) => {
    setShow(false);
  };

  return (
    <ModalContext.Provider value={{show, setShow}}>
      <Button className={'w-120'} onPress={showModal}>
        <Text className={'text-center'}>할일 추가</Text>
      </Button>
      <MakeTodoModal
        animationType={'slide'}
        visible={show}
        onRequestClose={() => setShow(false)}
        handlePress={submitTodo}
      />
    </ModalContext.Provider>
  );
};

export default MakeTodoBtn;
