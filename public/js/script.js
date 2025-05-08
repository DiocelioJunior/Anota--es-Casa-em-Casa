

document.getElementById('add-note-btn').addEventListener('click', toggleCardForm);

function toggleCardForm(event) {
    event.stopPropagation(); // evita o clique "vazar" pro document

    const cardForm = document.getElementById('cardForm');
    if (cardForm) {
        const isVisible = cardForm.style.display === 'flex';
        cardForm.style.display = isVisible ? 'none' : 'flex';

        if (!isVisible) {
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 0); // evita conflito imediato com o clique do botão
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
    }
}


function handleOutsideClick(event) {
    const cardForm = document.getElementById('cardForm');
    const toggleBtn = document.getElementById('add-note-btn');

    if (
        cardForm &&
        !cardForm.contains(event.target) &&
        !toggleBtn.contains(event.target)
    ) {
        cardForm.style.display = 'none';
        document.removeEventListener('click', handleOutsideClick);
    }
}

