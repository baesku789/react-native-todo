import {Pressable, Text, TextInput, View} from 'react-native';
import {ITodo} from '../../index';
import React, {useEffect, useState} from 'react';
import CheckIcon from 'assets/images/task_alt_FILL0_wght400_GRAD0_opsz40.svg';
import DeleteIcon from 'assets/images/delete_FILL0_wght400_GRAD0_opsz40.svg';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import CancelIcon from 'assets/images/cancel_icon.svg';

const Todo = ({text, done, id}: ITodo) => {
  const [doc, setDoc] = useState<FirebaseFirestoreTypes.DocumentData | null>(
    null,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [editText, onChangeText] = useState('');

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

  const editTodo = async () => {
    if (!doc) return;
    await doc.update({
      text: editText,
    });
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
          <Pressable onLongPress={() => setIsEdit(true)}>
            {isEdit ? (
              <View className={'flex justify-between flex-row'}>
                <TextInput
                  className={'box-border flex-1 text-18'}
                  value={editText || text}
                  onChangeText={onChangeText}
                  focusable={true}
                  onSubmitEditing={editTodo}
                />
                <Pressable onPress={() => setIsEdit(false)}>
                  <CancelIcon fill={'#212121'} />
                </Pressable>
              </View>
            ) : (
              <Text className={'text-18 text-ellipsis whitespace-nowrap'}>
                {editText || text}
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable onPress={deleteTodo}>
          <DeleteIcon fill={'#ed7272'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;
