import { API_CONFIG, apiRequest } from './api-config.js';

// formulario.js — controla campos dinâmicos, logout e submissão com integração ao back-end

document.addEventListener("DOMContentLoaded", () => {
  const publico = document.getElementById("publico");
  const camposBox = document.getElementById("camposDinamicos");
  const tipo = document.getElementById("tipo");
  const logoutBtn = document.getElementById("logoutBtn");
  const formAtendimento = document.getElementById("formAtendimento");

  // Verifica se usuário está logado
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  // Atualiza campos dinâmicos conforme público
  publico.addEventListener("change", () => {
    const value = publico.value;
    camposBox.innerHTML = "";
    tipo.innerHTML = `<option value="">Selecione...</option>`;

    if (value === "empregador") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🏢 Nome do Empregador</label>
          <input type="text" id="nomeEmpregador" required>
        </div>

        <div class="dynamic-field field">
          <label>🔢 CNPJ</label>
          <input type="text" id="cnpj" required>
        </div>

        <div class="dynamic-field field">
          <label>📞 Telefone</label>
          <input type="text" id="telefone" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="vaga">Abertura de Vaga</option>
        <option value="documentacao">Documentação</option>
        <option value="informacoes">Informações Gerais</option>
      `;
    }

    if (value === "trabalhador") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🧑 Nome do Trabalhador</label>
          <input type="text" id="nomeTrabalhador" required>
        </div>

        <div class="dynamic-field field">
          <label>🔢 CPF</label>
          <input type="text" id="cpf" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="seguro_desemprego">Seguro-desemprego</option>
        <option value="intermediacao">Intermediação de Emprego</option>
        <option value="carteira">Carteira de Trabalho</option>
      `;
    }

    if (value === "setor_fgtas") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🏛️ Nome do Setor</label>
          <input type="text" id="nomeSetor" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="sistema">Problemas no Sistema</option>
        <option value="solicitacao">Solicitação Interna</option>
        <option value="outro">Outro</option>
      `;
    }
  });

  // Submissão do formulário
  formAtendimento.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const dadosAtendimento = {
        tipoPublico: publico.value,
        tipoAtendimento: tipo.value,
        descricao: document.getElementById("descricao").value,
        dataAtendimento: new Date().toISOString()
      };

      // Adiciona campos específicos conforme o tipo de público
      if (publico.value === "empregador") {
        dadosAtendimento.nomeEmpregador = document.getElementById("nomeEmpregador")?.value;
        dadosAtendimento.cnpj = document.getElementById("cnpj")?.value;
        dadosAtendimento.telefone = document.getElementById("telefone")?.value;
      } else if (publico.value === "trabalhador") {
        dadosAtendimento.nomeTrabalhador = document.getElementById("nomeTrabalhador")?.value;
        dadosAtendimento.cpf = document.getElementById("cpf")?.value;
      } else if (publico.value === "setor_fgtas") {
        dadosAtendimento.nomeSetor = document.getElementById("nomeSetor")?.value;
      }

      // Envia dados para a API
      const response = await apiRequest(API_CONFIG.ATTENDANCE.CREATE, {
        method: 'POST',
        body: JSON.stringify(dadosAtendimento)
      });

      alert("Atendimento registrado com sucesso! 🎉");
      window.location.href = "menu.html";
    } catch (error) {
      console.error('Erro ao registrar atendimento:', error);
      alert('Erro ao registrar atendimento. Tente novamente.');
    }
  });
});
