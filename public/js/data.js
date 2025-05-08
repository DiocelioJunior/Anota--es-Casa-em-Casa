document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // evita reload da página

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const territory = document.getElementById('territory').value;
    const street = document.getElementById('street').value;

    const report = {
        name,
        date,
        territory,
        street
    };

    // Busca dados existentes
    const existingReports = JSON.parse(localStorage.getItem('reports')) || [];

    // Adiciona o novo
    existingReports.push(report);

    // Salva no localStorage
    localStorage.setItem('reports', JSON.stringify(existingReports));

    // (Opcional) Limpa o formulário
    event.target.reset();

    showReports(); // Atualiza a lista de relatórios

    alert('Relatório salvo com sucesso!');
});


function showReports() {
    const reportsContainer = document.getElementById('reportsContainer');
    reportsContainer.innerHTML = ''; // limpa antes de mostrar

    const reports = JSON.parse(localStorage.getItem('reports')) || [];

    reports.forEach((report, index) => {
        const card = document.createElement('div');
        card.classList.add('report-card');

        const formattedDate = new Date(report.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        card.innerHTML = `
            <div class="line_card"></div>
            <div class="card_note">
                <p><strong>Território:</strong> ${report.territory}</p>
                <p><strong>Data:</strong> ${formattedDate}</p>
                <p><strong>Rua:</strong> ${report.street}</p>
            </div>
            <div class="delete">
                <button class="delete-button" style="margin-top: 10px;"><span class="material-symbols-outlined">delete</span></button>
            </div>
               
        `;

        // Redireciona ao clicar no card, exceto no botão
        card.querySelector('.card_note').addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-button')) return;
            window.location.href = `./detalhes.html?id=${index}`;
        });

        // Botão de excluir
        const deleteButton = card.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // impede que o clique no botão redirecione
            if (confirm('Tem certeza que deseja excluir este relatório?')) {
                reports.splice(index, 1); // remove do array
                localStorage.setItem('reports', JSON.stringify(reports)); // salva
                showReports(); // atualiza lista
            }
        });

        reportsContainer.appendChild(card);
    });
}


window.addEventListener('load', showReports);

