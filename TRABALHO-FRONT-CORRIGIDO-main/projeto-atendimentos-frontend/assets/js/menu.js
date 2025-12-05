// menu.js — carrega o nome do usuário e controla logout

document.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");

  // pega usuário salvo no login
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // exibe o nome
  userBox.textContent = `👤 ${user.username}`;

  // botão de logout
  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
});
