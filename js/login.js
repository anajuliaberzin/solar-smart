async function handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const senhaInput = document.getElementById('senha').value;

    console.log("Buscando e-mail:", emailInput);

    const { data: usuario, error } = await window.db
        .from('usuarios')
        .select('*')
        .eq('email', emailInput)
        .maybeSingle();

    if (error || !usuario) {
        console.warn("Utilizador não encontrado no banco.");
        alert("E-mail não cadastrado ou incorreto.");
        return;
    }

    console.log("Usuário encontrado:", usuario);

    if (usuario.senha_hash === senhaInput) {
        const usuarioParaGuardar = {
            id: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email
        };

        localStorage.setItem('usuario_logado', JSON.stringify(usuarioParaGuardar));
        
        console.log("Dados guardados com sucesso!");
        console.table(JSON.parse(localStorage.getItem('usuario_logado')));

        alert("Sucesso!");
        window.location.href = 'dashboard.html';
        
    } else {
        alert("A senha está incorreta.");
    }
}