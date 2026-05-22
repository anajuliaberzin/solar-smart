window.toggleSidebar = function() {
    document.getElementById('sidebar').classList.toggle('open');
};

function badgeSev(sev) {
    const map = {
        'Baixa': { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
        'Média': { bg: '#fef9c3', color: '#854d0e', border: '#fef08a' },
        'Alta':  { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
    };
    const s = map[sev] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    return `<span class="badge rounded-pill px-2 py-1" style="background:${s.bg};color:${s.color};border:1px solid ${s.border};font-size:.78rem;">${sev}</span>`;
}

function preencherDataAtual() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    // Formato: YYYY-MM-DDTHH:MM
    const local = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    document.getElementById('oc-datetime').value = local;
}

async function carregarTodasOcorrencias() {
    const tbody = document.getElementById('tabela-ocorrencias');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Carregando dados do servidor...</td></tr>';

    const { data: ocorrenciasBanco, error } = await window.db
        .from('ocorrencias')
        .select('*')
        .order('datetime', { ascending: false });

    if (error || !ocorrenciasBanco) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">Erro ao carregar dados.</td></tr>';
        return;
    }

    document.getElementById('badge-total').textContent = `${ocorrenciasBanco.length} registros`;

    if (ocorrenciasBanco.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Nenhuma ocorrência registrada.</td></tr>';
        return;
    }

    tbody.innerHTML = ocorrenciasBanco.map(oc => `
      <tr style="border-bottom:1px solid var(--ss-border);">
        <td style="padding:.75rem 1rem;white-space:nowrap;color:var(--ss-muted);">${new Date(oc.datetime).toLocaleString('pt-BR')}</td>
        <td style="padding:.75rem 1rem;font-weight:500;">${oc.painel}</td>
        <td style="padding:.75rem 1rem;">${oc.tipo}</td>
        <td style="padding:.75rem 1rem;">${badgeSev(oc.severidade)}</td>
        <td style="padding:.75rem 1rem;color:var(--ss-muted);max-width:260px;">${oc.descricao}</td>
        <td style="padding:.75rem 1rem;">
          <button class="btn btn-sm btn-outline-danger" onclick="excluirOcorrencia(${oc.id})">Excluir</button>
        </td>
      </tr>
    `).join('');
}

window.registrarOcorrencia = async function(e) {
    e.preventDefault();
    
    const novaOcorrencia = {
        datetime: document.getElementById('oc-datetime').value,
        painel: document.getElementById('oc-painel').value,
        tipo: document.getElementById('oc-tipo').value,
        severidade: document.getElementById('oc-severidade').value,
        descricao: document.getElementById('oc-descricao').value.trim()
    };

    const { error } = await window.db.from('ocorrencias').insert([novaOcorrencia]);

    if (error) {
        alert("Erro ao registrar no banco de dados.");
        console.error(error);
        return;
    }

    document.getElementById('formOcorrencia').reset();
    preencherDataAtual();
    carregarTodasOcorrencias();
}

window.excluirOcorrencia = async function(id) {
    if (!confirm("Tem a certeza que deseja excluir esta ocorrência?")) return;
    
    const { error } = await window.db.from('ocorrencias').delete().eq('id', id);
    
    if (!error) {
        carregarTodasOcorrencias();
    } else {
        alert("Erro ao excluir.");
    }
};

preencherDataAtual();
carregarTodasOcorrencias();