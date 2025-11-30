import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; 
import AttendanceForm from './attendanceForm.js'; 
import PublicType from './publicType.js'; 
import AttendanceType from './attendanceType.js'; 

const Attendance = sequelize.define('Attendance', {
    id_attendance: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_attendance'
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id_user' }
    },
    attendance_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: AttendanceForm, key: 'id_form' }
    },
    public_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: PublicType, key: 'id_public' }
    },
    attendance_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: AttendanceType, key: 'id_attendance_type' }
    },
    
    dynamic_data: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    summary: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_resolved: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'attendances',
    timestamps: true 
});

export default Attendance;