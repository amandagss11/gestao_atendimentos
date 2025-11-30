// src/models/associations.js (ATUALIZADO)
import Profile from './profile.js';
import User from './user.js'; 
import AttendanceForm from './attendanceForm.js';
import PublicType from './publicType.js'; 
import AttendanceType from './attendanceType.js';
import AttendanceTypeField from './attendanceTypeField.js'; 
import Attendance from './attendance.js'; // <-- NOVO: Importa o modelo Attendance

// --- RELAÇÕES DE SEGURANÇA (Profile <-> User) ---
Profile.hasMany(User, { foreignKey: 'profile_id', as: 'users' });
User.belongsTo(Profile, { foreignKey: 'profile_id', as: 'profile' });

// --- RELAÇÕES DE SUPORTE (PublicType <-> AttendanceType <-> AttendanceTypeField) ---
PublicType.hasMany(AttendanceType, { foreignKey: 'public_type_id', as: 'attendance_types' });
AttendanceType.belongsTo(PublicType, { foreignKey: 'public_type_id', as: 'publicType' });
AttendanceType.hasMany(AttendanceTypeField, { foreignKey: 'attendance_type_id', as: 'fields' });
AttendanceTypeField.belongsTo(AttendanceType, { foreignKey: 'attendance_type_id', as: 'attendanceType' });

// --- NOVAS RELAÇÕES PARA ATTENDANCE (Atendimentos) ---

// 1. Atendimento pertence a um Usuário
User.hasMany(Attendance, { foreignKey: 'user_id', as: 'registered_attendances' });
Attendance.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 2. Atendimento pertence a uma Forma
AttendanceForm.hasMany(Attendance, { foreignKey: 'attendance_form_id', as: 'attendances' });
Attendance.belongsTo(AttendanceForm, { foreignKey: 'attendance_form_id', as: 'attendanceForm' });

// 3. Atendimento pertence a um Público
PublicType.hasMany(Attendance, { foreignKey: 'public_type_id', as: 'attendances' });
Attendance.belongsTo(PublicType, { foreignKey: 'public_type_id', as: 'publicType' });

// 4. Atendimento pertence a um Tipo de Atendimento
AttendanceType.hasMany(Attendance, { foreignKey: 'attendance_type_id', as: 'attendances' });
Attendance.belongsTo(AttendanceType, { foreignKey: 'attendance_type_id', as: 'attendanceType' });


export { Profile, User, AttendanceForm, PublicType, AttendanceType, AttendanceTypeField, Attendance };