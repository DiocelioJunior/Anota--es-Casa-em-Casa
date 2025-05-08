const params = new URLSearchParams(window.location.search);
const index = params.get('id');

const reports = JSON.parse(localStorage.getItem('reports')) || [];

if (reports[index]) {
    const report = reports[index];
    const container = document.getElementById('details');
    const listContainer = document.getElementById('houseNumbersList');

    

    // Mostra os dados do relatório
    const houseNumbers = report.houseNumbers
        ? report.houseNumbers.split(/[, ]+/).map(n => n.trim()).filter(n => n !== '')
        : [];

    container.innerHTML = `
        <p id="territory-text"> ${report.territory}</p>
        <p id="street-text"> ${report.street}</p>
        <p>${new Date(report.date).toLocaleDateString('pt-BR')}</p>
        <span id="shareReport" class="material-symbols-outlined" style="cursor: pointer;">share</span>
    `;

    listContainer.innerHTML = `
        <div class="list">
            <div class="list-item">
                ${houseNumbers.length > 0
            ? houseNumbers.map(num => `
                        <div class="list-number">
                            <div class="list-item-line"></div>
                            <div>${num}</div>
                        </div>
                    `).join('')
            : '<p>Nenhum número registrado.</p>'}
                    <div class="add-number">
                        <input type="text" id="houseNumbersInput" placeholder="Ex: 101, 103B, 105">
                        <button id="saveHouseNumbers">Salvar</button>
                    </div>
            </div>
            
        </div>
    `;

    // Lógica para adicionar novos números sem sobrescrever os anteriores
    document.getElementById('saveHouseNumbers').addEventListener('click', () => {
        const newInput = document.getElementById('houseNumbersInput').value.trim();

        if (newInput === '') {
            alert('Por favor, insira os números das casas.');
            return;
        }

        const newNumbers = newInput.split(/[, ]+/).map(n => n.trim()).filter(n => n !== '');

        let existing = report.houseNumbers
            ? report.houseNumbers.split(/[, ]+/).map(n => n.trim())
            : [];

        const merged = [...new Set([...existing, ...newNumbers])];

        reports[index].houseNumbers = merged.join(', ');
        localStorage.setItem('reports', JSON.stringify(reports));

        alert('Números atualizados com sucesso!');
        location.reload();
    });

    document.getElementById('shareReport').addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const index = parseInt(params.get('id'));
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const report = reports[index];
    
        if (!report) {
            alert("Relatório não encontrado.");
            return;
        }
    
        const message = `
        *Relatório de Casas Atendidas:*
        *Par designado:* ${report.name}
        *Território:* ${report.territory}
        *Quadra:* ${report.street}
        *Data:* ${new Date(report.date).toLocaleDateString('pt-BR')}
        *Números:* ${report.houseNumbers || 'Nenhum número registrado.'}
        `.trim();
    
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

} else {
    document.getElementById('details').innerText = 'Relatório não encontrado.';
}

