import { API_CONFIG, apiRequest } from './api-config.js';

// login.js - Autenticação com integração com back-end
document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('loginForm');
  const demoBtn = document.getElementById('demoBtn');
  const errorMsg = document.querySelector('.error-message') || createErrorMessage();

  async function login(username, password) {
    try {
      const response = await apiRequest(API_CONFIG.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ 
          login: username, 
          senha: password 
        })
      });

      // Armazena o token de autenticação
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Armazena dados do usuário
      sessionStorage.setItem('user', JSON.stringify({
        id: response.id,
        username: response.username || username,
        perfil: response.perfil
      }));

      // Redireciona para o menu
      window.location.href = 'menu.html';
    } catch (error) {
      console.error('Login error:', error);
      showError('Usuário ou senha inválidos. Tente novamente.');
    }
  }

  function createErrorMessage() {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.style.display = 'none';
    div.style.padding = '10px';
    div.style.marginBottom = '15px';
    div.style.backgroundColor = '#f8d7da';
    div.style.color = '#721c24';
    div.style.borderRadius = '4px';
    form.parentElement.insertBefore(div, form);
    return div;
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }

  function hideError() {
    errorMsg.style.display = 'none';
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    hideError();

    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();

    if(!u || !p){
      showError('Preencha usuário e senha.');
      return;
    }

    await login(u, p);
  });

  // Demo button - testa conexão com a API
  demoBtn.addEventListener('click', async ()=>{
    hideError();
    
    try {
      // Testa conexão com a API
      const status = await apiRequest(API_CONFIG.STATUS);
      
      if(status.status === 'online') {
        // Faz login com usuário demo
        await login('admin', 'admin');
      }
    } catch (error) {
      showError('Erro ao conectar com o servidor. Verifique se a API está rodando em http://localhost:3000');
      console.error('Demo connection error:', error);
    }
  });
});

function createErrorMessage() {
  const div = document.createElement('div');
  div.className = 'error-message';
  div.style.display = 'none';
  div.style.padding = '10px';
  div.style.marginBottom = '15px';
  div.style.backgroundColor = '#f8d7da';
  div.style.color = '#721c24';
  div.style.borderRadius = '4px';
  return div;
}


