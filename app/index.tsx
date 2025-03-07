import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Plus, Search, Star } from 'lucide-react-native';
import { DiaryEntry } from '../components/DiaryEntry';
import { EntryModal } from '../components/EntryModal';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  location?: string;
  isStarred?: boolean;
}

export default function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editEntry, setEditEntry] = useState<DiaryEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddEntry = (title: string, content: string) => {
    if (editEntry) {
      setEntries(entries.map(entry =>
        entry.id === editEntry.id
          ? { ...entry, title, content }
          : entry
      ));
      setEditEntry(null);
    } else {
      const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        }),
        location: 'Camaligan, Camarines Sur',
        isStarred: false
      };
      setEntries([newEntry, ...entries]);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEditEntry = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setEditEntry(entry);
      setModalVisible(true);
    }
  };

  const toggleStar = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id
        ? { ...entry, isStarred: !entry.isStarred }
        : entry
    ));
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY DIARY</Text>
        <Text style={styles.subtitle}>by MMONEN KHIEN AGDORO</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredEntries.map(entry => (
          <DiaryEntry
            key={entry.id}
            {...entry}
            onDelete={handleDeleteEntry}
            onEdit={handleEditEntry}
            onToggleStar={toggleStar}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      <EntryModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditEntry(null);
        }}
        onSave={handleAddEntry}
        editEntry={editEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'SFProSemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'SFProRegular',
    fontSize: 14,
    color: '#666666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: 'SFProRegular',
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});