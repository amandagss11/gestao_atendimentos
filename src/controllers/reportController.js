// src/controllers/reportController.js
import { Parser } from 'json2csv';
import { Op } from 'sequelize';
import Attendance from '../models/attendance.js';
import AttendanceForm from '../models/attendanceForm.js';
import PublicType from '../models/publicType.js';
import AttendanceType from '../models/attendanceType.js';
import User from '../models/user.js';

// Função para buscar e exportar atendimentos com filtros
export const exportAttendancesToCSV = async (req, res) => {
    try {
        const { formId, publicTypeId, typeId, startDate, endDate } = req.query;

        // --- 1. CONSTRUÇÃO DA CONDIÇÃO WHERE ---
        const whereCondition = {};
        const attendanceTypeWhere = {};
        const publicTypeWhere = {};
        const attendanceFormWhere = {};

        // Filtro por Período (createdAt)
        if (startDate && endDate) {
            whereCondition.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Filtro por FKs
        if (formId) attendanceFormWhere.id_form = formId;
        if (publicTypeId) publicTypeWhere.id_public = publicTypeId;
        if (typeId) attendanceTypeWhere.id_attendance_type = typeId;


        // --- 2. BUSCA DE DADOS ---
        const attendances = await Attendance.findAll({
            where: whereCondition,
            include: [
                { model: AttendanceForm, as: 'attendanceForm', attributes: ['name'], where: attendanceFormWhere },
                { model: PublicType, as: 'publicType', attributes: ['name'], where: publicTypeWhere },
                { model: AttendanceType, as: 'attendanceType', attributes: ['name'], where: attendanceTypeWhere },
                { model: User, as: 'user', attributes: ['name'] },
            ],
            raw: true, // Retorna dados planos
            nest: true // Transforma objetos aninhados (ideal para CSV)
        });

        // --- 3. PREPARAR DADOS PARA CSV ---
        const dataToExport = attendances.map(att => {
            const baseData = {
                'ID Atendimento': att.id_attendance,
                'Data de Registro': att.createdAt,
                'Resumo': att.summary,
                'Resolvido': att.is_resolved ? 'Sim' : 'Não',
                'Registrado Por': att.user.name,
                'Forma Atendimento': att.attendanceForm.name,
                'Público': att.publicType.name,
                'Tipo Atendimento': att.attendanceType.name,
            };
            
            // Adiciona os campos dinâmicos ao objeto de exportação
            const dynamicFields = {};
            if (att.dynamic_data) {
                for (const key in att.dynamic_data) {
                    // Usa a chave do dynamic_data como nome da coluna
                    dynamicFields[`Campo_${key}`] = att.dynamic_data[key];
                }
            }

            return { ...baseData, ...dynamicFields };
        });

        // Se não houver dados, retorna um CSV vazio com cabeçalhos básicos
        if (dataToExport.length === 0) {
            return res.status(200).send("ID Atendimento,Data de Registro,Resumo\n");
        }

        // --- 4. GERAÇÃO DO CSV ---
        const fields = Object.keys(dataToExport[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dataToExport);

        // --- 5. RESPOSTA ---
        res.header('Content-Type', 'text/csv');
        res.attachment('relatorio_atendimentos.csv');
        return res.send(csv);

    } catch (error) {
        console.error('Erro ao gerar relatório CSV:', error);
        return res.status(500).json({ message: 'Erro ao processar o relatório.' });
    }
};