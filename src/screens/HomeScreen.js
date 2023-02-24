import { Title1, Title3, withTheme, Button } from 'react-native-ios-kit';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';

import Skeleton from '../components/Skeleton';

import useNotesQuery from '../hooks/useNotesQuery';

import Note from '../components/Note';

const HomeScreen = ({ navigation }) => {
  const { notesListLoading, notesList } = useNotesQuery();

  const onButtonPress = () => {
    navigation.push('editeNote');
  };

  const loadingStatus = (
    <View
      style={{
        flex: 1,
        gap: 10,
      }}>
      {[1, 2, 3].map((el, i) => (
        <Skeleton key={i} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title1 style={styles.title}>Notes</Title1>

      {notesListLoading && loadingStatus}

      {!notesListLoading && (
        <FlatList
          data={notesList}
          renderItem={item => <Note item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}

      {notesList.length < 1 && !notesListLoading && (
        <View style={styles.onEmpyContainer}>
          <Title3 style={{ textAlign: 'center' }}>No Notes Found</Title3>
        </View>
      )}

      <View style={styles.addNoteContainer}>
        <Button
          style={styles.addNoteButton}
          rounded
          inverted
          onPress={onButtonPress}
          innerStyle={{
            fontFamily: 'SF-Pro-Text-Bold',
            fontSize: 17,
          }}>
          Add Note
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: 'SF-Pro-Text-Bold',
    marginRight: 'auto',
    paddingLeft: 18,
    paddingTop: 25,
    paddingBottom: 23,
    width: '100%',
    verticalAlign: 'top',
  },
  list: { width: '100%' },
  addNoteContainer: {
    height: 62,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  addNoteButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 30,
    marginTop: -25,
  },
  onEmpyContainer: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
  },
});

export default withTheme(HomeScreen);
