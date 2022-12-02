import {
  Image,
  Modal,
  ModalBaseProps,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {IModalContext, ModalContext} from './MakeTodoBtn';
import Button from '../button/Button';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../App';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const cancelIcon = require('../../assets/images/cancel_icon.png');

interface MakeTodoModalProp extends Partial<ModalBaseProps> {
  handlePress?: (text: string) => void;
}

const MakeTodoModal = (props: MakeTodoModalProp) => {
  const [text, onChangeText] = React.useState('');

  const {setShow} = useContext(ModalContext) as IModalContext;

  const user = useContext(AuthContext);
  const {email} = user as FirebaseAuthTypes.User;

  const closeModal = () => {
    setShow(false);
  };

  const submitTodo = (text: string) => {
    firestore()
      .collection('Todos')
      .add({
        text,
        done: false,
        email,
      })
      .then(() => setShow(false));
  };

  return (
    <Modal {...props}>
      <View className={'p-20'}>
        <TextInput
          className={'border-1 border-black pl-10'}
          value={text}
          onChangeText={onChangeText}
          placeholder={'할 일을 입력하세요.'}
        />
        <Button
          className={'rounded-full w-60 mt-20'}
          onPress={() => submitTodo(text)}>
          <Text>제출</Text>
        </Button>
        <Pressable className={'mx-auto mt-20'} onPress={closeModal}>
          <Image source={cancelIcon} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default MakeTodoModal;
