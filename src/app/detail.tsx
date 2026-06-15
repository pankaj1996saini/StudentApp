import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStudents } from '../store/studentStore';

export default function DetailScreen() {
  const params = useLocalSearchParams<{
    id: string; name: string; branch: string;
    year: string; mobile: string; email: string; avatar: string;
  }>();
  const router = useRouter();
  const { removeStudent } = useStudents();

  function handleCall() {
    Linking.openURL(`tel:${params.mobile}`);
  }

  function handleEmail() {
    Linking.openURL(`mailto:${params.email}`);
  }

  function handleDelete() {
    Alert.alert('Remove Student', `Remove ${params.name} from records?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: () => { removeStudent(params.id); router.back(); },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Image source={{ uri: params.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{params.name}</Text>
        <Text style={styles.idText}>{params.id}</Text>
        <View style={styles.yearBadge}>
          <Text style={styles.yearBadgeText}>{params.year} Year · {params.branch}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#059669' }]} onPress={handleCall}>
          <Text style={styles.actionText}>📞  Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#0891b2' }]} onPress={handleEmail}>
          <Text style={styles.actionText}>✉️  Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Information</Text>
        {[
          { label: 'Student ID',    value: params.id      },
          { label: 'Full Name',     value: params.name    },
          { label: 'Branch',        value: params.branch  },
          { label: 'Year',          value: params.year + ' Year' },
          { label: 'Mobile',        value: params.mobile  },
          { label: 'Email',         value: params.email   },
        ].map(row => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* Remove button */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteBtnText}>Remove Student</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#f3f4f6' },

  header:          { backgroundColor: '#4f46e5', alignItems: 'center', paddingVertical: 32 },
  avatar:          { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#fff', marginBottom: 12 },
  name:            { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  idText:          { fontSize: 13, color: '#c7d2fe', marginTop: 4 },
  yearBadge:       { backgroundColor: '#6366f1', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginTop: 10 },
  yearBadgeText:   { color: '#e0e7ff', fontSize: 13, fontWeight: '600' },

  actionRow:       { flexDirection: 'row', margin: 16, gap: 12 },
  actionBtn:       { flex: 1, borderRadius: 10, padding: 14, alignItems: 'center' },
  actionText:      { color: '#fff', fontSize: 15, fontWeight: '600' },

  card:            { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, padding: 16, elevation: 2 },
  cardTitle:       { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  infoRow:         { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoLabel:       { fontSize: 13, color: '#6b7280' },
  infoValue:       { fontSize: 13, color: '#111827', fontWeight: '600', flexShrink: 1, textAlign: 'right', marginLeft: 12 },

  deleteBtn:       { margin: 16, backgroundColor: '#fee2e2', borderRadius: 10, padding: 14, alignItems: 'center' },
  deleteBtnText:   { color: '#ef4444', fontSize: 15, fontWeight: '700' },
});
