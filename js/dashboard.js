function fmtDatetime(dt) {
    const d = new Date(dt);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function badgeSev(sev) {
    const map = {
        'Baixa': { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
        'Média': { bg: '#fef9c3', color: '#854d0e', border: '#fef08a' },
        'Alta':  { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
    };
    const s = map[sev] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    return `<span class="badge rounded-pill px-2 py-1" style="background:${s.bg};color:${s.color};border:1px solid ${s.border};font-size:.78rem;">${sev}</span>`;
}

async function carregarOcorrenciasRecentes() {
    const tbody = document.getElementById('tabela-dashboard');
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4" style="color:var(--ss-muted);">Carregando ocorrências...</td></tr>`;

    const { data: ocorrencias, error } = await window.db
        .from('ocorrencias')
        .select('*')
        .order('datetime', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Erro ao buscar ocorrências:", error);
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4" style="color:red;">Erro ao carregar os dados.</td></tr>`;
        return;
    }

    if (ocorrencias.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4" style="color:var(--ss-muted);">Nenhuma ocorrência recente.</td></tr>`;
        return;
    }

    tbody.innerHTML = ocorrencias.map(oc => `
        <tr style="border-bottom:1px solid var(--ss-border);">
            <td style="padding:.65rem 1rem;color:var(--ss-muted);white-space:nowrap;">${fmtDatetime(oc.datetime)}</td>
            <td style="padding:.65rem 1rem;font-weight:500;">${oc.painel}</td>
            <td style="padding:.65rem 1rem;">${oc.tipo}</td>
            <td style="padding:.65rem 1rem;">${badgeSev(oc.severidade)}</td>
            <td style="padding:.65rem 1rem;color:var(--ss-muted);">${oc.descricao}</td>
        </tr>
    `).join('');
}

async function carregarEstatisticas() {
    const { data: ocorrencias, error } = await window.db
        .from('ocorrencias')
        .select('*')
        .order('datetime', { ascending: false });

    if (error || !ocorrencias) return;

    document.getElementById('stat-total').textContent = ocorrencias.length;

    const agora = new Date();
    const mesAtual = agora.getMonth(); 
    const anoAtual = agora.getFullYear();
    
    const ocorrenciasMes = ocorrencias.filter(oc => {
        const d = new Date(oc.datetime);
        return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
    });
    
    document.getElementById('stat-mes').textContent = ocorrenciasMes.length;
    
    const nomeMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    document.getElementById('stat-mes-sub').textContent = `${nomeMeses[mesAtual]} / ${anoAtual}`;

    if (ocorrencias.length > 0) {
        const ultima = ocorrencias[0];
        const d = new Date(ultima.datetime);
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const hora = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        
        document.getElementById('stat-ultimo').textContent = `${dia}/${mes}`;
        document.getElementById('stat-ultimo-sub').textContent = `${hora}:${min} — ${ultima.painel}`;
    }
}

carregarEstatisticas();

carregarOcorrenciasRecentes();