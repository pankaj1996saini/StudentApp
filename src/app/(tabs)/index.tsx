import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStudents } from '../../store/studentStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { students } = useStudents();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // stats derived from data
  const branches = [...new Set(students.map(s => s.branch))];
  const branchCounts = branches.map(b => ({
    name: b,
    count: students.filter(s => s.branch === b).length,
  }));
  const yearCounts = ['1st', '2nd', '3rd', '4th'].map(y => ({
    year: y,
    count: students.filter(s => s.year === y).length,
  }));

  const recentStudents = students.slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4f46e5']} />}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Student Management</Text>
        <Text style={styles.heroSub}>NAAI College · {new Date().getFullYear()}</Text>
        <Text style={styles.heroCount}>{students.length} Students Enrolled</Text>
      </View>

      <View style={styles.statsRow}>
        {[
          { label: 'Total',      value: students.length,                                   color: '#4f46e5' },
          { label: 'Branches',   value: branches.length,                                   color: '#0891b2' },
          { label: '3rd & 4th',  value: students.filter(s => ['3rd','4th'].includes(s.year)).length, color: '#059669' },
          { label: '1st & 2nd',  value: students.filter(s => ['1st','2nd'].includes(s.year)).length, color: '#d97706' },
        ].map(stat => (
          <View key={stat.label} style={[styles.statCard, { borderTopColor: stat.color }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Students by Branch</Text>
      <View style={styles.card}>
        {branchCounts.map(b => (
          <View key={b.name} style={styles.barRow}>
            <Text style={styles.barLabel}>{b.name}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${(b.count / students.length) * 100}%` }]} />
            </View>
            <Text style={styles.barCount}>{b.count}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Students by Year</Text>
      <View style={styles.yearRow}>
        {yearCounts.map(y => (
          <View key={y.year} style={styles.yearCard}>
            <Text style={styles.yearValue}>{y.count}</Text>
            <Text style={styles.yearLabel}>{y.year} Year</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recently Added</Text>
      {recentStudents.map(s => (
        <TouchableOpacity
          key={s.id}
          style={styles.recentRow}
          onPress={() => router.push({ pathname: '/detail', params: s })}
        >
          <Image source={{ uri: s.avatar }} style={styles.avatar} />
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>{s.name}</Text>
            <Text style={styles.recentMeta}>{s.branch} · {s.year} Year</Text>
          </View>
          <Text style={styles.recentId}>{s.id}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f3f4f6' },

  hero:         { backgroundColor: '#4f46e5', padding: 24, paddingTop: 32, paddingBottom: 32 },
  heroTitle:    { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  heroSub:      { fontSize: 13, color: '#c7d2fe', marginTop: 4 },
  heroCount:    { fontSize: 16, color: '#e0e7ff', marginTop: 12, fontWeight: '600' },

  statsRow:     { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8 },
  statCard:     {
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    alignItems: 'center', width: (width - 56) / 2,
    borderTopWidth: 3, elevation: 2,
  },
  statValue:    { fontSize: 28, fontWeight: 'bold' },
  statLabel:    { fontSize: 12, color: '#6b7280', marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginHorizontal: 16, marginTop: 8, marginBottom: 8 },

  card:         { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, padding: 16, marginBottom: 8, elevation: 2 },
  barRow:       { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  barLabel:     { fontSize: 12, color: '#374151', width: 90 },
  barBg:        { flex: 1, backgroundColor: '#e5e7eb', borderRadius: 4, height: 8, marginHorizontal: 8 },
  barFill:      { backgroundColor: '#4f46e5', borderRadius: 4, height: 8 },
  barCount:     { fontSize: 12, color: '#6b7280', width: 20, textAlign: 'right' },

  yearRow:      { flexDirection: 'row', marginHorizontal: 12, gap: 8, marginBottom: 8 },
  yearCard:     { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 12, alignItems: 'center', elevation: 2 },
  yearValue:    { fontSize: 22, fontWeight: 'bold', color: '#4f46e5' },
  yearLabel:    { fontSize: 11, color: '#6b7280', marginTop: 4 },

  recentRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 8, padding: 12, borderRadius: 10, elevation: 1 },
  avatar:       { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e5e7eb' },
  recentInfo:   { flex: 1, marginLeft: 12 },
  recentName:   { fontSize: 14, fontWeight: '600', color: '#111827' },
  recentMeta:   { fontSize: 12, color: '#6b7280', marginTop: 2 },
  recentId:     { fontSize: 12, color: '#9ca3af' },
});
