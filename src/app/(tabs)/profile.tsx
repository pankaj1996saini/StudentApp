import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useStudents } from '../../store/studentStore';

export default function ProfileScreen() {
  const { students } = useStudents();

  const branches = [...new Set(students.map(s => s.branch))];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=50' }}
          style={styles.collegeAvatar}
        />
        <Text style={styles.collegeName}>NAAI College</Text>
        <Text style={styles.collegeTagline}>Excellence in Education</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>Est. 2000</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Accredited</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>AICTE</Text></View>
        </View>
      </View>

      <View style={styles.numRow}>
        <View style={styles.numCard}>
          <Text style={styles.numVal}>{students.length}</Text>
          <Text style={styles.numLabel}>Students</Text>
        </View>
        <View style={styles.numCard}>
          <Text style={styles.numVal}>{branches.length}</Text>
          <Text style={styles.numLabel}>Branches</Text>
        </View>
        <View style={styles.numCard}>
          <Text style={styles.numVal}>4</Text>
          <Text style={styles.numLabel}>Years</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.aboutText}>
          This Student Management App is built using React Native and Expo Router.
          It allows faculty to manage student records, view branch-wise statistics,
          add new students and search through the list in real time.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Branches Offered</Text>
        {branches.map(b => (
          <View key={b} style={styles.branchRow}>
            <View style={styles.dot} />
            <Text style={styles.branchText}>{b}</Text>
            <Text style={styles.branchCount}>
              {students.filter(s => s.branch === b).length} students
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        {[
          { label: 'Developer',  value: 'Pankaj Saini'          },
          { label: 'Version',    value: '1.0.0'                  },
          { label: 'Framework',  value: 'React Native + Expo'    },
          { label: 'Navigation', value: 'Expo Router'            },
          { label: 'Language',   value: 'TypeScript'             },
        ].map(row => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f3f4f6' },

  hero:           { backgroundColor: '#4f46e5', alignItems: 'center', paddingVertical: 32, paddingHorizontal: 16 },
  collegeAvatar:  { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', marginBottom: 12 },
  collegeName:    { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  collegeTagline: { fontSize: 13, color: '#c7d2fe', marginTop: 4 },
  badgeRow:       { flexDirection: 'row', gap: 8, marginTop: 16 },
  badge:          { backgroundColor: '#6366f1', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText:      { color: '#e0e7ff', fontSize: 12, fontWeight: '600' },

  numRow:         { flexDirection: 'row', margin: 16, gap: 10 },
  numCard:        { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', elevation: 2 },
  numVal:         { fontSize: 26, fontWeight: 'bold', color: '#4f46e5' },
  numLabel:       { fontSize: 12, color: '#6b7280', marginTop: 4 },

  section:        { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 12, borderRadius: 12, padding: 16, elevation: 2 },
  sectionTitle:   { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  aboutText:      { fontSize: 13, color: '#4b5563', lineHeight: 22 },

  branchRow:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  dot:            { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4f46e5', marginRight: 10 },
  branchText:     { flex: 1, fontSize: 14, color: '#374151' },
  branchCount:    { fontSize: 12, color: '#9ca3af' },

  infoRow:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoLabel:      { fontSize: 13, color: '#6b7280' },
  infoValue:      { fontSize: 13, color: '#111827', fontWeight: '600' },
});
