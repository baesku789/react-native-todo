import {Text, View} from 'react-native';
import {ITodo} from '../index';

const Todo = ({text, done}: ITodo) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default Todo;
