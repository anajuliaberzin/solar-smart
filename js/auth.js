// --- AUTH TEMPORARIAMENTE DESATIVADO ---
// const usuarioLogado = localStorage.getItem('usuario_logado');

// if (!usuarioLogado) {
//     window.location.href = 'login.html';
// } else {
//     const dadosUsuario = JSON.parse(usuarioLogado);
//     
//     document.addEventListener('DOMContentLoaded', () => {
//         const nameDisplay = document.getElementById('user-name-display');
//         const avatarDisplay = document.getElementById('user-avatar-display');
//         
//         if (nameDisplay && avatarDisplay) {
//             const primeiroNome = dadosUsuario.nome.split(' ')[0];
//             
//             nameDisplay.textContent = `Olá, ${primeiroNome}`;
//             
//             avatarDisplay.textContent = primeiroNome.charAt(0).toUpperCase();
//         }
//     });
// }

// function fazerLogout() {
//     localStorage.removeItem('usuario_logado');
//     window.location.href = 'index.html';
// }
// --- FIM AUTH DESATIVADO ---