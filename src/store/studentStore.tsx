import { createContext, useContext, useState, ReactNode } from 'react';

export type Student = {
  id: string;
  name: string;
  branch: string;
  year: string;
  mobile: string;
  email: string;
  avatar: string;
};

const seedStudents: Student[] = [
  { id: 'S001', name: 'Aarav Sharma',    branch: 'Computer Science', year: '3rd', mobile: '9876543210', email: 'aarav@college.edu',    avatar: 'https://i.pravatar.cc/100?img=1'  },
  { id: 'S002', name: 'Priya Verma',     branch: 'Electronics',      year: '2nd', mobile: '9812345678', email: 'priya@college.edu',    avatar: 'https://i.pravatar.cc/100?img=2'  },
  { id: 'S003', name: 'Rohit Nair',      branch: 'Mechanical',       year: '4th', mobile: '9823456789', email: 'rohit@college.edu',    avatar: 'https://i.pravatar.cc/100?img=3'  },
  { id: 'S004', name: 'Sneha Iyer',      branch: 'Civil',            year: '1st', mobile: '9834567890', email: 'sneha@college.edu',    avatar: 'https://i.pravatar.cc/100?img=4'  },
  { id: 'S005', name: 'Karan Mehta',     branch: 'Computer Science', year: '2nd', mobile: '9845678901', email: 'karan@college.edu',    avatar: 'https://i.pravatar.cc/100?img=5'  },
  { id: 'S006', name: 'Anjali Singh',    branch: 'Electronics',      year: '3rd', mobile: '9856789012', email: 'anjali@college.edu',   avatar: 'https://i.pravatar.cc/100?img=6'  },
  { id: 'S007', name: 'Vikram Patel',    branch: 'Mechanical',       year: '2nd', mobile: '9867890123', email: 'vikram@college.edu',   avatar: 'https://i.pravatar.cc/100?img=7'  },
  { id: 'S008', name: 'Divya Reddy',     branch: 'Civil',            year: '4th', mobile: '9878901234', email: 'divya@college.edu',    avatar: 'https://i.pravatar.cc/100?img=8'  },
  { id: 'S009', name: 'Arjun Bose',      branch: 'Computer Science', year: '1st', mobile: '9889012345', email: 'arjun@college.edu',    avatar: 'https://i.pravatar.cc/100?img=9'  },
  { id: 'S010', name: 'Meera Pillai',    branch: 'Electronics',      year: '4th', mobile: '9890123456', email: 'meera@college.edu',    avatar: 'https://i.pravatar.cc/100?img=10' },
  { id: 'S011', name: 'Nikhil Joshi',    branch: 'Mechanical',       year: '3rd', mobile: '9901234567', email: 'nikhil@college.edu',   avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: 'S012', name: 'Pooja Desai',     branch: 'Computer Science', year: '2nd', mobile: '9912345678', email: 'pooja@college.edu',    avatar: 'https://i.pravatar.cc/100?img=12' },
];

type StoreType = {
  students: Student[];
  addStudent: (s: Omit<Student, 'id' | 'avatar'>) => void;
  removeStudent: (id: string) => void;
};

const StudentContext = createContext<StoreType | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(seedStudents);

  function addStudent(s: Omit<Student, 'id' | 'avatar'>) {
    const id = 'S' + String(students.length + 1).padStart(3, '0');
    const avatar = `https://i.pravatar.cc/100?img=${students.length + 1}`;
    setStudents(prev => [{ ...s, id, avatar }, ...prev]);
  }

  function removeStudent(id: string) {
    setStudents(prev => prev.filter(s => s.id !== id));
  }

  return (
    <StudentContext.Provider value={{ students, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudents must be inside StudentProvider');
  return ctx;
}
