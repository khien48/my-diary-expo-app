import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface EntryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  editEntry?: { id: string; title: string; content: string } | null;
}

export function EntryModal({ visible, onClose, onSave, editEntry }: EntryModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editEntry) {
      setTitle(editEntry.title);
      setContent(editEntry.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editEntry]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content);
      setTitle('');
      setContent('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ChevronLeft size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MY DIARY</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Dear Diary..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 8,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 17,
    color: '#000000',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 17,
    color: '#007AFF',
  },
  titleInput: {
    fontFamily: 'InterSemiBold',
    fontSize: 22,
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentInput: {
    flex: 1,
    fontFamily: 'InterRegular',
    fontSize: 17,
    color: '#000000',
    padding: 16,
    textAlignVertical: 'top',
  },
});