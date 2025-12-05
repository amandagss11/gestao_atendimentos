import { API_CONFIG, apiRequest } from './api-config.js';

// Estado local dos usuários
let usuarios = [];
let usuarioEditandoId = null;

// Inicializa a página e carrega usuários
document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
});

// Carrega lista de usuários da API
async function carregarUsuarios() {
    try {
        const response = await apiRequest(API_CONFIG.USERS.LIST);
        usuarios = response || [];
        atualizarTabela();
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar lista de usuários');
        // Fallback para dados vazios
        usuarios = [];
        atualizarTabela();
    }
}

function atualizarTabela() {
    const tabela = document.getElementById("listaUsuarios");
    tabela.innerHTML = "";

    if (usuarios.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">Nenhum usuário encontrado</td></tr>';
        return;
    }

    usuarios.forEach(u => {
        tabela.innerHTML += `
            <tr>
                <td>${u.nome || u.username || 'N/A'}</td>
                <td>${u.login || u.username || 'N/A'}</td>
                <td>${u.perfil || 'Operador'}</td>
                <td>
                    <button class="btn btn-small" onclick="editarUsuario(${u.id})">✏️</button>
                    <button class="btn btn-small btn-danger" onclick="excluirUsuario(${u.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// Modal
function abrirModal() {
    usuarioEditandoId = null;
    document.getElementById("modalUsuario").classList.remove("hidden");
    document.getElementById("tituloModal").innerText = "Adicionar Usuário";

    document.getElementById("idUsuario").value = "";
    document.getElementById("nomeUsuario").value = "";
    document.getElementById("loginUsuario").value = "";
    document.getElementById("perfilUsuario").value = "Operador";
}

function fecharModal() {
    document.getElementById("modalUsuario").classList.add("hidden");
    usuarioEditandoId = null;
}

async function salvarUsuario() {
    const id = document.getElementById("idUsuario").value;
    const nome = document.getElementById("nomeUsuario").value;
    const login = document.getElementById("loginUsuario").value;
    const perfil = document.getElementById("perfilUsuario").value;

    if (!nome || !login) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        let response;
        const dadosUsuario = {
            nome,
            login,
            perfil
        };

        if (id) {
            // Atualizar usuário existente
            response = await apiRequest(API_CONFIG.USERS.UPDATE(id), {
                method: 'PUT',
                body: JSON.stringify(dadosUsuario)
            });
        } else {
            // Criar novo usuário
            response = await apiRequest(API_CONFIG.USERS.CREATE, {
                method: 'POST',
                body: JSON.stringify(dadosUsuario)
            });
        }

        alert(id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
        fecharModal();
        await carregarUsuarios();
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro ao salvar usuário. Tente novamente.');
    }
}

function editarUsuario(id) {
    const user = usuarios.find(u => u.id === id);
    
    if (!user) return;

    usuarioEditandoId = id;
    document.getElementById("idUsuario").value = user.id;
    document.getElementById("nomeUsuario").value = user.nome || user.username || '';
    document.getElementById("loginUsuario").value = user.login || user.username || '';
    document.getElementById("perfilUsuario").value = user.perfil || 'Operador';

    document.getElementById("tituloModal").innerText = "Editar Usuário";
    document.getElementById("modalUsuario").classList.remove("hidden");
}

async function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
        await apiRequest(API_CONFIG.USERS.DELETE(id), {
            method: 'DELETE'
        });

        alert('Usuário excluído com sucesso!');
        await carregarUsuarios();
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Tente novamente.');
    }
}

// Expõe funções globais para uso em onclick
window.editarUsuario = editarUsuario;
window.excluirUsuario = excluirUsuario;
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.salvarUsuario = salvarUsuario;
