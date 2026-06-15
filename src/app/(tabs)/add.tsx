import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStudents } from '../../store/studentStore';

type Field = 'name' | 'branch' | 'year' | 'mobile' | 'email';

const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];
const BRANCH_OPTIONS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'];

export default function AddStudentScreen() {
  const { addStudent } = useStudents();

  const [form, setForm] = useState({ name: '', branch: '', year: '', mobile: '', email: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function set(field: Field, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<Field, string>> = {};
    if (!form.name.trim())                          newErrors.name   = 'Name is required';
    if (!form.branch)                               newErrors.branch = 'Select a branch';
    if (!form.year)                                 newErrors.year   = 'Select a year';
    if (!/^[6-9]\d{9}$/.test(form.mobile))         newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    addStudent(form);
    Alert.alert('Success', `${form.name} has been added successfully!`);
    setForm({ name: '', branch: '', year: '', mobile: '', email: '' });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Student</Text>
        <Text style={styles.headerSub}>Fill in all fields to register a student</Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Full Name <Text style={styles.req}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="e.g. Rahul Kumar"
          value={form.name}
          onChangeText={v => set('name', v)}
        />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

        <Text style={styles.label}>Branch <Text style={styles.req}>*</Text></Text>
        <View style={styles.chipRow}>
          {BRANCH_OPTIONS.map(b => (
            <TouchableOpacity
              key={b}
              style={[styles.chip, form.branch === b && styles.chipActive]}
              onPress={() => set('branch', b)}
            >
              <Text style={[styles.chipText, form.branch === b && styles.chipTextActive]}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.branch ? <Text style={styles.error}>{errors.branch}</Text> : null}

        <Text style={styles.label}>Year <Text style={styles.req}>*</Text></Text>
        <View style={styles.yearRow}>
          {YEAR_OPTIONS.map(y => (
            <TouchableOpacity
              key={y}
              style={[styles.yearBtn, form.year === y && styles.yearBtnActive]}
              onPress={() => set('year', y)}
            >
              <Text style={[styles.yearText, form.year === y && styles.yearTextActive]}>{y}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.year ? <Text style={styles.error}>{errors.year}</Text> : null}

        <Text style={styles.label}>Mobile Number <Text style={styles.req}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.mobile && styles.inputError]}
          placeholder="10-digit mobile number"
          value={form.mobile}
          onChangeText={v => set('mobile', v)}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {errors.mobile ? <Text style={styles.error}>{errors.mobile}</Text> : null}

        {/* Email */}
        <Text style={styles.label}>Email ID <Text style={styles.req}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="student@college.edu"
          value={form.email}
          onChangeText={v => set('email', v)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Add Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => { setForm({ name: '', branch: '', year: '', mobile: '', email: '' }); setErrors({}); }}
        >
          <Text style={styles.clearText}>Clear Form</Text>
        </TouchableOpacity>

      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#f3f4f6' },

  header:          { backgroundColor: '#4f46e5', padding: 24 },
  headerTitle:     { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub:       { fontSize: 13, color: '#c7d2fe', marginTop: 4 },

  form:            { margin: 16, backgroundColor: '#fff', borderRadius: 14, padding: 20, elevation: 2 },

  label:           { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 14 },
  req:             { color: '#ef4444' },
  input:           {
    borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10,
    padding: 12, fontSize: 15, backgroundColor: '#f9fafb', color: '#111827',
  },
  inputError:      { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
  error:           { fontSize: 12, color: '#ef4444', marginTop: 4 },

  chipRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip:            { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipActive:      { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  chipText:        { fontSize: 13, color: '#374151' },
  chipTextActive:  { color: '#fff', fontWeight: '600' },

  yearRow:         { flexDirection: 'row', gap: 10 },
  yearBtn:         { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 10, alignItems: 'center' },
  yearBtnActive:   { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  yearText:        { fontSize: 14, color: '#374151' },
  yearTextActive:  { color: '#fff', fontWeight: '600' },

  saveBtn:         { backgroundColor: '#4f46e5', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 24 },
  saveBtnText:     { color: '#fff', fontSize: 16, fontWeight: '700' },
  clearBtn:        { padding: 14, alignItems: 'center', marginTop: 6 },
  clearText:       { color: '#9ca3af', fontSize: 14 },
});
