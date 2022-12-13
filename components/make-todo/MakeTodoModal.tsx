import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
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
import CancelIcon from '../../assets/images/cancel_icon.svg';

interface MakeTodoModalProp extends Partial<ModalProps> {
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
        text: text.trim(),
        done: false,
        email,
      })
      .then(() => setShow(false));
  };

  return (
    <View className={'h-full'}>
      <Modal {...props}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className={'flex-1 mt-160 h-full bg-'}>
            <View
              className={
                'flex justify-center h-300 w-[80%] mx-auto rounded-50 border-1 border-black bg-[#ffffff]'
              }>
              <TextInput
                className={'border-1 border-black pl-10 h-40 mx-20 box-border'}
                value={text}
                onChangeText={onChangeText}
                placeholder={'할 일을 입력하세요.'}
                autoFocus={true}
                onSubmitEditing={() => submitTodo(text)}
              />
              <Button
                className={'rounded-full w-60 mt-20'}
                onPress={() => submitTodo(text)}>
                <Text>제출</Text>
              </Button>
              <Pressable className={'mx-auto mt-20'} onPress={closeModal}>
                <CancelIcon fill={'#212121'} />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default MakeTodoModal;
