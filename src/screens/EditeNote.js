import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-ios-kit';

import Icon from 'react-native-vector-icons/Feather';
import NotesApi from '../apis/NotesApi';

const EditeNote = ({ navigation, route }) => {
  const { item } = route.params || {};
  const [noteTitle, setNoteTitle] = useState(item?.title || '');
  const [noteBody, setNoteBody] = useState(item?.body || '');

  const notesApi = new NotesApi();

  const goBack = () => {
    navigation.replace('Home');
  };

  const saveNote = async () => {
    const note = {
      title: noteTitle,
      body: noteBody,
    };

    try {
      if (item) {
        const res = await notesApi.updateNote(note, item.id);
        if (res.success) navigation.replace('Home');
        else throw new Error(res.message);
      } else {
        const res = await notesApi.storeNote(note);
        if (res.success) navigation.replace('Home');
        else throw new Error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    try {
      const res = await notesApi.deleteNote(item.id);
      if (res.success) navigation.replace('Home');
      else throw new Error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const myIcon = (
    <Icon name="chevron-left" size={30} color="rgba(0, 122, 255, 1)" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerNavBtn} onPress={goBack}>
          <View>{myIcon}</View>
          <Text style={styles.headerNavBtnText}>Home</Text>
        </TouchableOpacity>
        <View>
          <Button
            style={styles.headerNavSave}
            onPress={saveNote}
            disabled={!noteTitle || !noteBody}>
            Save
          </Button>
        </View>
      </View>
      <View style={styles.textArea}>
        <TextInput
          placeholder="Note Title"
          value={noteTitle}
          onChangeText={text => setNoteTitle(text)}
          placeholderTextColor="rgba(60, 60, 67, 0.3)"
          style={styles.NoteTitle}
          textAlignVertical="center"
          underlineColorAndroid="rgba(255,255,255,0)"
        />
        <TextInput
          placeholder="Start Typing"
          value={noteBody}
          onChangeText={text => setNoteBody(text)}
          placeholderTextColor="rgba(60, 60, 67, 0.3)"
          style={styles.noteTextBody}
          multiline
        />
      </View>
      {item && (
        <Button
          style={styles.deleteBtn}
          onPress={deleteNote}
          innerStyle={{
            fontFamily: 'SF-Pro-Text-Medium',
            fontSize: 17,
          }}>
          Delete Note
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  header: {
    paddingHorizontal: 15,
    paddingTop: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerNavBtnText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: ' rgba(0, 122, 255, 1)',
  },
  headerNavSave: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: 'rgba(209, 209, 214, 1)',
  },
  textArea: {
    marginTop: 28,
    paddingHorizontal: 15,
  },

  NoteTitle: {
    fontSize: 22,
    color: ' rgba(36, 36, 38, 1)',
    fontFamily: 'SF-Pro-Text-Bold',
    lineHeight: 1,
    margin: 0,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  noteTextBody: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    color: 'rgba(124, 124, 128, 1)',
  },
  deleteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    color: 'rgba(10, 132, 255, 1)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default EditeNote;
