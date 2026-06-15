import { View, Text, FlatList, TextInput, Image, TouchableOpacity, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { useStudents, Student } from '../../store/studentStore';

export default function StudentsScreen() {
  const { students, removeStudent } = useStudents();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  function handleDelete(id: string, name: string) {
    Alert.alert('Remove Student', `Remove ${name} from the list?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeStudent(id) },
    ]);
  }

  function renderCard({ item }: { item: Student }) {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardLeft}
          onPress={() => router.push({ pathname: '/detail', params: item })}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.branch} · {item.year} Year</Text>
            <Text style={styles.idText}>{item.id}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id, item.name)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search by name, branch or ID..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <Text style={styles.count}>{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ padding: 12, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4f46e5']} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f3f4f6' },
  searchWrap: { backgroundColor: '#4f46e5', paddingHorizontal: 16, paddingVertical: 12 },
  search:     {
    backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 14, color: '#111827',
  },
  count:      { fontSize: 13, color: '#6b7280', marginLeft: 16, marginTop: 10, marginBottom: 4 },

  card:       {
    backgroundColor: '#fff', borderRadius: 12, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    padding: 12, elevation: 2,
  },
  cardLeft:   { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar:     { width: 52, height: 52, borderRadius: 26, backgroundColor: '#e5e7eb' },
  info:       { marginLeft: 12, flex: 1 },
  name:       { fontSize: 15, fontWeight: '700', color: '#111827' },
  meta:       { fontSize: 13, color: '#6b7280', marginTop: 2 },
  idText:     { fontSize: 12, color: '#4f46e5', marginTop: 3, fontWeight: '600' },

  deleteBtn:  { padding: 8 },
  deleteText: { fontSize: 16, color: '#ef4444', fontWeight: 'bold' },

  empty:      { alignItems: 'center', marginTop: 60 },
  emptyText:  { fontSize: 15, color: '#9ca3af' },
});
