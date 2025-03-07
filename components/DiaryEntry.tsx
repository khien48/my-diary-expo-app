import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil, Trash2, Star } from 'lucide-react-native';

interface DiaryEntryProps {
  id: string;
  title: string;
  content: string;
  date: string;
  location?: string;
  isStarred?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export function DiaryEntry({
  id,
  title,
  content,
  date,
  location,
  isStarred,
  onDelete,
  onEdit,
  onToggleStar,
}: DiaryEntryProps) {
  const previewContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.starContainer}>
          <TouchableOpacity onPress={() => onToggleStar(id)}>
            <Star
              size={16}
              color={isStarred ? '#007AFF' : '#666'}
              fill={isStarred ? '#007AFF' : 'none'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.preview}>{previewContent}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(id)} style={styles.actionButton}>
          <Pencil size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.actionButton}>
          <Trash2 size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#000000',
  },
  date: {
    fontFamily: 'InterRegular',
    fontSize: 12,
    color: '#666666',
  },
  preview: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});