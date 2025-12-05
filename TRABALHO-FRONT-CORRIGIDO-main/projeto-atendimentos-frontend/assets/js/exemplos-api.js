// Exemplos de Uso - API Client

// ============================================
// IMPORTAR O MÓDULO DE CONFIGURAÇÃO
// ============================================

import { API_CONFIG, apiRequest } from './api-config.js';

// ============================================
// 1. AUTENTICAÇÃO
// ============================================

// Login
async function fazerLogin(username, senha) {
    try {
        const response = await apiRequest(API_CONFIG.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ login: username, senha })
        });
        
        localStorage.setItem('token', response.token);
        console.log('Login realizado:', response);
        return response;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

// Verificar autenticação
async function verificarAutenticacao() {
    try {
        const response = await apiRequest(API_CONFIG.AUTH.VERIFY);
        console.log('Autenticação válida:', response);
        return response;
    } catch (error) {
        console.error('Token inválido:', error);
    }
}

// Logout
async function fazerLogout() {
    try {
        await apiRequest(API_CONFIG.AUTH.LOGOUT, {
            method: 'POST'
        });
        localStorage.removeItem('token');
        console.log('Logout realizado');
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// ============================================
// 2. GERENCIAMENTO DE USUÁRIOS
// ============================================

// Listar todos os usuários
async function listarUsuarios() {
    try {
        const usuarios = await apiRequest(API_CONFIG.USERS.LIST);
        console.log('Usuários:', usuarios);
        return usuarios;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
}

// Obter usuário específico
async function obterUsuario(id) {
    try {
        const usuario = await apiRequest(API_CONFIG.USERS.GET(id));
        console.log('Usuário:', usuario);
        return usuario;
    } catch (error) {
        console.error(`Erro ao obter usuário ${id}:`, error);
    }
}

// Criar novo usuário
async function criarUsuario(dados) {
    try {
        const novoUsuario = await apiRequest(API_CONFIG.USERS.CREATE, {
            method: 'POST',
            body: JSON.stringify({
                nome: dados.nome,
                login: dados.login,
                perfil: dados.perfil || 'Operador'
            })
        });
        console.log('Usuário criado:', novoUsuario);
        return novoUsuario;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
}

// Atualizar usuário
async function atualizarUsuario(id, dados) {
    try {
        const usuarioAtualizado = await apiRequest(API_CONFIG.USERS.UPDATE(id), {
            method: 'PUT',
            body: JSON.stringify({
                nome: dados.nome,
                login: dados.login,
                perfil: dados.perfil
            })
        });
        console.log('Usuário atualizado:', usuarioAtualizado);
        return usuarioAtualizado;
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:`, error);
    }
}

// Deletar usuário
async function deletarUsuario(id) {
    try {
        await apiRequest(API_CONFIG.USERS.DELETE(id), {
            method: 'DELETE'
        });
        console.log(`Usuário ${id} deletado`);
    } catch (error) {
        console.error(`Erro ao deletar usuário ${id}:`, error);
    }
}

// ============================================
// 3. GERENCIAMENTO DE PERFIS
// ============================================

// Obter perfil do usuário logado
async function obterPerfil() {
    try {
        const perfil = await apiRequest(API_CONFIG.PROFILE.GET);
        console.log('Perfil:', perfil);
        return perfil;
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
    }
}

// Atualizar perfil
async function atualizarPerfil(dados) {
    try {
        const perfilAtualizado = await apiRequest(API_CONFIG.PROFILE.UPDATE, {
            method: 'PUT',
            body: JSON.stringify(dados)
        });
        console.log('Perfil atualizado:', perfilAtualizado);
        return perfilAtualizado;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
    }
}

// ============================================
// 4. GERENCIAMENTO DE ATENDIMENTOS
// ============================================

// Listar atendimentos
async function listarAtendimentos() {
    try {
        const atendimentos = await apiRequest(API_CONFIG.ATTENDANCE.LIST);
        console.log('Atendimentos:', atendimentos);
        return atendimentos;
    } catch (error) {
        console.error('Erro ao listar atendimentos:', error);
    }
}

// Obter atendimento específico
async function obterAtendimento(id) {
    try {
        const atendimento = await apiRequest(API_CONFIG.ATTENDANCE.GET(id));
        console.log('Atendimento:', atendimento);
        return atendimento;
    } catch (error) {
        console.error(`Erro ao obter atendimento ${id}:`, error);
    }
}

// Criar atendimento
async function criarAtendimento(dados) {
    try {
        const novoAtendimento = await apiRequest(API_CONFIG.ATTENDANCE.CREATE, {
            method: 'POST',
            body: JSON.stringify({
                tipoPublico: dados.tipoPublico,
                tipoAtendimento: dados.tipoAtendimento,
                descricao: dados.descricao,
                nomeEmpregador: dados.nomeEmpregador || null,
                cnpj: dados.cnpj || null,
                nomeTrabalhador: dados.nomeTrabalhador || null,
                cpf: dados.cpf || null,
                dataAtendimento: new Date().toISOString()
            })
        });
        console.log('Atendimento criado:', novoAtendimento);
        return novoAtendimento;
    } catch (error) {
        console.error('Erro ao criar atendimento:', error);
    }
}

// Atualizar atendimento
async function atualizarAtendimento(id, dados) {
    try {
        const atendimentoAtualizado = await apiRequest(API_CONFIG.ATTENDANCE.UPDATE(id), {
            method: 'PUT',
            body: JSON.stringify(dados)
        });
        console.log('Atendimento atualizado:', atendimentoAtualizado);
        return atendimentoAtualizado;
    } catch (error) {
        console.error(`Erro ao atualizar atendimento ${id}:`, error);
    }
}

// Deletar atendimento
async function deletarAtendimento(id) {
    try {
        await apiRequest(API_CONFIG.ATTENDANCE.DELETE(id), {
            method: 'DELETE'
        });
        console.log(`Atendimento ${id} deletado`);
    } catch (error) {
        console.error(`Erro ao deletar atendimento ${id}:`, error);
    }
}

// ============================================
// 5. GERENCIAMENTO DE TIPOS DE ATENDIMENTO
// ============================================

// Listar tipos de atendimento
async function listarTiposAtendimento() {
    try {
        const tipos = await apiRequest(API_CONFIG.ATTENDANCE_TYPES.LIST);
        console.log('Tipos de atendimento:', tipos);
        return tipos;
    } catch (error) {
        console.error('Erro ao listar tipos:', error);
    }
}

// Criar tipo de atendimento
async function criarTipoAtendimento(dados) {
    try {
        const novoTipo = await apiRequest(API_CONFIG.ATTENDANCE_TYPES.CREATE, {
            method: 'POST',
            body: JSON.stringify({
                nome: dados.nome,
                descricao: dados.descricao
            })
        });
        console.log('Tipo criado:', novoTipo);
        return novoTipo;
    } catch (error) {
        console.error('Erro ao criar tipo:', error);
    }
}

// ============================================
// 6. GERENCIAMENTO DE TIPOS PÚBLICOS
// ============================================

// Listar tipos de público
async function listarTiposPublicos() {
    try {
        const tipos = await apiRequest(API_CONFIG.PUBLIC_TYPES.LIST);
        console.log('Tipos de público:', tipos);
        return tipos;
    } catch (error) {
        console.error('Erro ao listar tipos públicos:', error);
    }
}

// ============================================
// 7. RELATÓRIOS
// ============================================

// Listar relatórios
async function listarRelatorios() {
    try {
        const relatorios = await apiRequest(API_CONFIG.REPORTS.LIST);
        console.log('Relatórios:', relatorios);
        return relatorios;
    } catch (error) {
        console.error('Erro ao listar relatórios:', error);
    }
}

// Gerar relatório
async function gerarRelatorio(filtros) {
    try {
        const relatorio = await apiRequest(API_CONFIG.REPORTS.GENERATE, {
            method: 'POST',
            body: JSON.stringify({
                dataInicio: filtros.dataInicio,
                dataFim: filtros.dataFim,
                tipoPublico: filtros.tipoPublico || null,
                tipoAtendimento: filtros.tipoAtendimento || null
            })
        });
        console.log('Relatório gerado:', relatorio);
        return relatorio;
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
    }
}

// Exportar relatório
async function exportarRelatorio(relatorioId) {
    try {
        const response = await fetch(`${API_CONFIG.REPORTS.EXPORT}/${relatorioId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        });
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${relatorioId}.csv`;
        a.click();
        
        console.log('Relatório exportado');
    } catch (error) {
        console.error('Erro ao exportar relatório:', error);
    }
}

// ============================================
// 8. STATUS DA API
// ============================================

// Verificar saúde da API
async function verificarStatus() {
    try {
        const status = await apiRequest(API_CONFIG.STATUS);
        console.log('Status da API:', status);
        return status;
    } catch (error) {
        console.error('API indisponível:', error);
    }
}

// ============================================
// EXEMPLOS DE USO (COPIE PARA SEU CONSOLE)
// ============================================

/*

// 1. Fazer login
await fazerLogin('admin', 'admin');

// 2. Listar usuários
const usuarios = await listarUsuarios();

// 3. Criar novo usuário
const novoUsuario = await criarUsuario({
    nome: 'João Silva',
    login: 'joao.silva',
    perfil: 'Operador'
});

// 4. Criar atendimento
const novoAtendimento = await criarAtendimento({
    tipoPublico: 'trabalhador',
    tipoAtendimento: 'seguro_desemprego',
    descricao: 'Solicitação de seguro-desemprego',
    nomeTrabalhador: 'Maria Santos',
    cpf: '123.456.789-00'
});

// 5. Gerar relatório
const relatorio = await gerarRelatorio({
    dataInicio: '2025-01-01',
    dataFim: '2025-12-31',
    tipoPublico: 'trabalhador'
});

// 6. Verificar status
await verificarStatus();

*/

// Exportar funções para uso global
export {
    fazerLogin,
    verificarAutenticacao,
    fazerLogout,
    listarUsuarios,
    obterUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    obterPerfil,
    atualizarPerfil,
    listarAtendimentos,
    obterAtendimento,
    criarAtendimento,
    atualizarAtendimento,
    deletarAtendimento,
    listarTiposAtendimento,
    criarTipoAtendimento,
    listarTiposPublicos,
    listarRelatorios,
    gerarRelatorio,
    exportarRelatorio,
    verificarStatus
};
