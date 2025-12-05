// Estrutura inicial fake (banco simulado)
let camposPorPerfil = {
    "Empregador": [
        { id: 1, nome: "Nome da Empresa", tipo: "texto" },
        { id: 2, nome: "CNPJ", tipo: "numero" },
        { id: 3, nome: "Telefone", tipo: "numero" },
    ],
    "Trabalhador": [
        { id: 1, nome: "Nome Completo", tipo: "texto" },
        { id: 2, nome: "CPF", tipo: "numero" },
        { id: 3, nome: "Escolaridade", tipo: "texto" },
    ],
    "Setor FGTAS": [
        { id: 1, nome: "Unidade", tipo: "texto" },
        { id: 2, nome: "Responsável", tipo: "texto" },
    ]
};

let campoEditando = null;

// Carrega lista do perfil escolhido
function carregarCampos() {
    const perfil = document.getElementById("selectPerfil").value;
    const lista = document.getElementById("listaCampos");

    lista.innerHTML = "";

    if (!perfil) return;

    camposPorPerfil[perfil].forEach(c => {
        lista.innerHTML += `
            <li class="campo-item">
                <strong>${c.nome}</strong> <span class="tipo">${c.tipo}</span>
                <button class="btn btn-small" onclick="editarCampo('${perfil}', ${c.id})">✏️</button>
                <button class="btn btn-small btn-danger" onclick="excluirCampo('${perfil}', ${c.id})">🗑️</button>
            </li>
        `;
    });
}

// Modal
function abrirModalCampo() {
    campoEditando = null;

    document.getElementById("tituloCampoModal").innerText = "Adicionar Campo";
    document.getElementById("nomeCampo").value = "";
    document.getElementById("tipoCampo").value = "texto";

    document.getElementById("modalCampo").classList.remove("hidden");
}

function fecharModalCampo() {
    document.getElementById("modalCampo").classList.add("hidden");
}

function salvarCampo() {
    const perfil = document.getElementById("selectPerfil").value;
    const nome = document.getElementById("nomeCampo").value;
    const tipo = document.getElementById("tipoCampo").value;

    if (!perfil) {
        alert("Selecione um perfil!");
        return;
    }

    if (!nome) {
        alert("Digite o nome do campo!");
        return;
    }

    if (campoEditando) {
        // editar
        const campo = camposPorPerfil[perfil].find(c => c.id === campoEditando);
        campo.nome = nome;
        campo.tipo = tipo;
    } else {
        // adicionar
        camposPorPerfil[perfil].push({
            id: Date.now(),
            nome,
            tipo
        });
    }

    fecharModalCampo();
    carregarCampos();
}

function editarCampo(perfil, id) {
    campoEditando = id;

    const campo = camposPorPerfil[perfil].find(c => c.id === id);

    document.getElementById("tituloCampoModal").innerText = "Editar Campo";
    document.getElementById("nomeCampo").value = campo.nome;
    document.getElementById("tipoCampo").value = campo.tipo;

    document.getElementById("modalCampo").classList.remove("hidden");
}

function excluirCampo(perfil, id) {
    if (!confirm("Tem certeza que deseja excluir este campo?")) return;

    camposPorPerfil[perfil] = camposPorPerfil[perfil].filter(c => c.id !== id);

    carregarCampos();
}
