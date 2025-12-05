// Dados simulados (no futuro vocês trocam pela API)
const atendimentosFake = [
    { data: "2025-11-01", forma: "Presencial", publico: "Empregador", tipo: "Abertura de Vaga" },
    { data: "2025-11-02", forma: "Whatsapp", publico: "Trabalhador", tipo: "Seguro-Desemprego" },
    { data: "2025-11-03", forma: "Email", publico: "Setor FGTAS", tipo: "Solicitação Interna" },
];

// Mostrar registros na tabela
function preencherTabela(lista) {
    const corpo = document.getElementById("corpoTabela");
    corpo.innerHTML = "";

    lista.forEach(item => {
        corpo.innerHTML += `
            <tr>
                <td>${item.data}</td>
                <td>${item.forma}</td>
                <td>${item.publico}</td>
                <td>${item.tipo}</td>
            </tr>
        `;
    });
}

// Filtro
function filtrar() {
    const forma = document.getElementById("filtroForma").value;
    const publico = document.getElementById("filtroPublico").value;
    const tipo = document.getElementById("filtroTipo").value;
    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    let filtrados = atendimentosFake;

    if (forma) filtrados = filtrados.filter(a => a.forma === forma);
    if (publico) filtrados = filtrados.filter(a => a.publico === publico);
    if (tipo) filtrados = filtrados.filter(a => a.tipo === tipo);

    if (inicio) filtrados = filtrados.filter(a => a.data >= inicio);
    if (fim) filtrados = filtrados.filter(a => a.data <= fim);

    preencherTabela(filtrados);
}

// Exportar CSV
function exportarCSV() {
    let csv = "data,forma,publico,tipo\n";

    const linhas = document.querySelectorAll("#corpoTabela tr");

    if (linhas.length === 0) {
        alert("Nenhum dado para exportar!");
        return;
    }

    linhas.forEach(tr => {
        const tds = tr.querySelectorAll("td");
        csv += `${tds[0].innerText},${tds[1].innerText},${tds[2].innerText},${tds[3].innerText}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_fgtas.csv";
    a.click();
}

preencherTabela(atendimentosFake);
