import { TouchableOpacity, StyleSheet } from 'react-native';
import { Headline, Body, Footnote } from 'react-native-ios-kit';

const Note = ({ item: { item: data }, navigation }) => {
  const editeNote = () => {
    navigation.push('editeNote', {
      item: data,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.noteBox, styles.shadowProp]}
      onPress={editeNote}>
      <Headline style={styles.noteBoxTitle}>{data.title}</Headline>
      <Body style={styles.noteBoxBody}>{data.body}</Body>
      <Footnote style={styles.footnote}>{data.date}</Footnote>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteBox: {
    width: 358,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 18,
    marginTop: 3,
  },
  noteBoxTitle: {
    fontSize: 17,
    color: '#242426',
    lineHeight: 22,
    marginBottom: 12,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  noteBoxBody: {
    fontSize: 14,
    color: '#636366',
    lineHeight: 18,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 10,
  },
  footnote: {
    fontSize: 12,
    color: 'rgba(174, 174, 178, 1)',
    fontFamily: 'Roboto-Regular',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Note;
