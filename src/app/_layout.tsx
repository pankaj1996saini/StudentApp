import { Stack } from 'expo-router';
import { StudentProvider } from '../store/studentStore';

export default function RootLayout() {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
        <Stack.Screen name="detail"  options={{ title: 'Student Detail', headerStyle: { backgroundColor: '#4f46e5' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      </Stack>
    </StudentProvider>
  );
}
