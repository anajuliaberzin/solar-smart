async function gerarRelatorio() {
    const { data: ocorrencias } = await window.db.from('ocorrencias').select('*');
    if (!ocorrencias) return;

    const contagemTipos = {};
    ocorrencias.forEach(oc => contagemTipos[oc.tipo] = (contagemTipos[oc.tipo] || 0) + 1);
    const tipoMaisFrequente = Object.keys(contagemTipos).reduce((a, b) => contagemTipos[a] > contagemTipos[b] ? a : b);

    document.getElementById('rel-tipo-frequente').textContent = tipoMaisFrequente;
    
    renderizarTabelaRelatorio(ocorrencias);
}

function renderizarTabelaRelatorio(dados) {
    const tbody = document.getElementById('tabela-historico-relatorio');
    tbody.innerHTML = dados.map(oc => `
        <tr>
            <td>${new Date(oc.datetime).toLocaleDateString('pt-BR')}</td>
            <td>${oc.painel}</td>
            <td>${oc.tipo}</td>
            <td>${oc.severidade}</td>
            <td>${oc.descricao}</td>
        </tr>
    `).join('');
}

gerarRelatorio();