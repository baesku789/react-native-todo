import {Pressable, StyleSheet, Text} from 'react-native';

const MakeTodoBtn = () => {
  return (
    <Pressable style={styles.button}>
      <Text>할일 추가</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: 'gray',
    width: 80,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MakeTodoBtn;
