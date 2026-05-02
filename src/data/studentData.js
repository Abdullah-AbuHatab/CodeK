// بيانات الطلاب الأساسية (يمكن تحديثها تلقائيًا عند Sign In / Quiz)
export const getStudents = () => {
  const data = localStorage.getItem("students");
  return data ? JSON.parse(data) : [];
};

export const saveStudent = (student) => {
  const students = getStudents();
  const existingIndex = students.findIndex((s) => s.id === student.id);
  if (existingIndex !== -1) {
    students[existingIndex] = student; // تحديث الطالب الموجود
  } else {
    students.push(student); // إضافة طالب جديد
  }
  localStorage.setItem("students", JSON.stringify(students));
};
