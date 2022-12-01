import {
  Modal,
  ModalBaseProps,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {twButton, twInputPadding} from '../../tailwindStyle';

interface MakeTodoModalProp extends Partial<ModalBaseProps> {
  handlePress: (text: string) => void;
}

const MakeTodoModal = (props: MakeTodoModalProp) => {
  const [text, onChangeText] = React.useState('');

  return (
    <Modal {...props}>
      <View className={'p-20'}>
        <TextInput
          className={`border-1 border-black ${twInputPadding}`}
          value={text}
          onChangeText={onChangeText}
          placeholder={'할 일을 입력하세요.'}
        />
        <Pressable
          className={`rounded-full w-60 ${twButton} mt-20`}
          onPress={() => props.handlePress(text)}>
          <Text>제출</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default MakeTodoModal;
