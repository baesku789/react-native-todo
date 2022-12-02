import MakeTodoBtn from './make-todo/MakeTodoBtn';
import {FlatList, StyleSheet, View} from 'react-native';
import Todo from './Todo';
import React, {useContext} from 'react';
import {AuthContext} from '../App';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useTodos} from '../hooks/firebase';

const TodoList = () => {
  const user = useContext(AuthContext);
  const {email} = user as FirebaseAuthTypes.User;

  const [todos, setTodos] = useTodos(email);

  console.log(todos);

  return (
    <View className={'w-full flex justify-center'}>
      <FlatList
        contentContainerStyle={styles.container}
        data={todos}
        renderItem={({item}) => <Todo {...item} />}
        keyExtractor={(_, index) => index + ''}
      />
      <MakeTodoBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: 'flex',
  },
});

export default TodoList;
