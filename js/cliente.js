let painelSelecionado = null;
let problemaSelecionado = null;

window.selectPainel = function(btn, valor) {
    painelSelecionado = valor;
    document.querySelectorAll('#paineis-btns .ss-step-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Libera o Passo 2
    const step2 = document.getElementById('step2');
    step2.style.opacity = '1';
    step2.style.pointerEvents = 'auto';
    checkEnviar();
}

window.selectProblema = function(btn, valor) {
    problemaSelecionado = valor;
    document.querySelectorAll('#problemas-btns .ss-step-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    checkEnviar();
}

function checkEnviar() {
    const btnEnviar = document.getElementById('btn-enviar');
    if (painelSelecionado && problemaSelecionado) {
        btnEnviar.style.opacity = '1';
        btnEnviar.style.pointerEvents = 'auto';
    }
}

window.enviarChamado = async function() {

    const agora = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dataHoraAtual = `${agora.getFullYear()}-${pad(agora.getMonth()+1)}-${pad(agora.getDate())} ${pad(agora.getHours())}:${pad(agora.getMinutes())}:00`;

    let severidadeAuto = 'Média';
    if (problemaSelecionado === 'Dano físico' || problemaSelecionado === 'Falha técnica') severidadeAuto = 'Alta';
    if (problemaSelecionado === 'Sombreamento' || problemaSelecionado === 'Animal') severidadeAuto = 'Baixa';

    const novaOcorrencia = {
        datetime: dataHoraAtual,
        painel: painelSelecionado,
        tipo: problemaSelecionado,
        severidade: severidadeAuto,
        descricao: 'Chamado aberto pelo cliente através do aplicativo.'
    };

    const { error } = await window.db.from('ocorrencias').insert([novaOcorrencia]);

    if (error) {
        console.error("Erro ao registrar ocorrência:", error);
        alert("Erro ao enviar o chamado.");
        return;
    }

    const toastEl = document.getElementById('toastChamado');
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    resetFormulario();

    carregarLinhaDoTempo();

    atualizarStatusPaineis();
}

function resetFormulario() {
    painelSelecionado = null;
    problemaSelecionado = null;
    document.querySelectorAll('.ss-step-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('step2').style.opacity = '.4';
    document.getElementById('step2').style.pointerEvents = 'none';
    document.getElementById('btn-enviar').style.opacity = '.4';
    document.getElementById('btn-enviar').style.pointerEvents = 'none';
}

async function carregarLinhaDoTempo() {
    const container = document.querySelector('.ss-timeline');
    container.innerHTML = '<p class="text-center py-3">Carregando eventos...</p>';

    const { data: ocorrencias, error } = await window.db
        .from('ocorrencias')
        .select('*')
        .order('datetime', { ascending: false });

    if (error || !ocorrencias || ocorrencias.length === 0) {
        container.innerHTML = '<p class="text-center py-3" style="color:var(--ss-muted);">Nenhum evento registrado no momento.</p>';
        return;
    }

    const coresBg = { 'Baixa': '#dcfce7', 'Média': '#fef9c3', 'Alta': '#fee2e2' };
    const coresBorda = { 'Baixa': '#166534', 'Média': '#854d0e', 'Alta': '#991b1b' };

    container.innerHTML = ocorrencias.map((oc, index) => {
        const d = new Date(oc.datetime);
        const dataFormatada = d.toLocaleDateString('pt-BR') + ' · ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const bg = coresBg[oc.severidade] || '#dbeafe';
        const borda = coresBorda[oc.severidade] || 'var(--ss-blue-brand)';

        return `
            <div class="ss-timeline-item">
                <div class="ss-timeline-dot" style="background:${bg}; border-color:${borda};"></div>
                ${index < ocorrencias.length - 1 ? '<div class="ss-timeline-line"></div>' : ''}
                <div class="ss-timeline-date">${dataFormatada}</div>
                <div class="ss-timeline-title">${oc.tipo} no ${oc.painel}</div>
                <div class="ss-timeline-desc">${oc.descricao}</div>
            </div>
        `;
    }).join('');
}

async function atualizarStatusPaineis() {
    const { data: ocorrencias, error } = await window.db.from('ocorrencias').select('*');
    if (error || !ocorrencias) return;

    const statusPaineis = {
        'Painel A': 'Normal',
        'Painel B': 'Normal',
        'Painel C': 'Normal',
        'Painel D': 'Normal'
    };

    ocorrencias.forEach(oc => {
        const paineisAfetados = oc.painel === 'Todos' ? ['Painel A', 'Painel B', 'Painel C', 'Painel D'] : [oc.painel];
        
        paineisAfetados.forEach(painel => {
            if (!statusPaineis[painel]) return;
            
            if (statusPaineis[painel] === 'Perigo') return;

            if (oc.severidade === 'Alta') {
                statusPaineis[painel] = 'Perigo';
            } else if (oc.severidade === 'Média' || oc.severidade === 'Baixa') {
                statusPaineis[painel] = 'Atenção';
            }
        });
    });

    const estilos = {
        'Normal':  { bg: '#dcfce7', text: '#166534', border: '#22c55e' }, // Verde
        'Atenção': { bg: '#fef9c3', text: '#854d0e', border: '#eab308' }, // Amarelo
        'Perigo':  { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' }  // Vermelho
    };

    ['a', 'b', 'c', 'd'].forEach(letra => {
        const nomePainel = `Painel ${letra.toUpperCase()}`;
        const status = statusPaineis[nomePainel];
        const estilo = estilos[status];

        const cardEl = document.getElementById(`card-painel-${letra}`);
        const badgeEl = document.getElementById(`badge-painel-${letra}`);

        if (cardEl && badgeEl) {
            cardEl.style.borderBottom = `4px solid ${estilo.border}`;
            
            badgeEl.textContent = status;
            badgeEl.style.backgroundColor = estilo.bg;
            badgeEl.style.color = estilo.text;
        }
    });

}

carregarLinhaDoTempo();
atualizarStatusPaineis();