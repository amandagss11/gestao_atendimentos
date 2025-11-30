import Profile from './profile.js';
import User from './user.js'; 
import AttendanceForm from './attendanceForm.js';
import PublicType from './publicType.js'; 
import AttendanceType from './attendanceType.js';
import AttendanceTypeField from './attendanceTypeField.js'; 
import Attendance from './attendance.js'; 

Profile.hasMany(User, { foreignKey: 'profile_id', as: 'users' });
User.belongsTo(Profile, { foreignKey: 'profile_id', as: 'profile' });

PublicType.hasMany(AttendanceType, { foreignKey: 'public_type_id', as: 'attendance_types' });
AttendanceType.belongsTo(PublicType, { foreignKey: 'public_type_id', as: 'publicType' });
AttendanceType.hasMany(AttendanceTypeField, { foreignKey: 'attendance_type_id', as: 'fields' });
AttendanceTypeField.belongsTo(AttendanceType, { foreignKey: 'attendance_type_id', as: 'attendanceType' });


User.hasMany(Attendance, { foreignKey: 'user_id', as: 'registered_attendances' });
Attendance.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

AttendanceForm.hasMany(Attendance, { foreignKey: 'attendance_form_id', as: 'attendances' });
Attendance.belongsTo(AttendanceForm, { foreignKey: 'attendance_form_id', as: 'attendanceForm' });

PublicType.hasMany(Attendance, { foreignKey: 'public_type_id', as: 'attendances' });
Attendance.belongsTo(PublicType, { foreignKey: 'public_type_id', as: 'publicType' });

AttendanceType.hasMany(Attendance, { foreignKey: 'attendance_type_id', as: 'attendances' });
Attendance.belongsTo(AttendanceType, { foreignKey: 'attendance_type_id', as: 'attendanceType' });


export { Profile, User, AttendanceForm, PublicType, AttendanceType, AttendanceTypeField, Attendance };