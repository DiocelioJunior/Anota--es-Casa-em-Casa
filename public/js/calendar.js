const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const calendarContainer = document.getElementById('calendar');

const today = new Date();
const todayDay = today.getDay();
const todayDate = today.getDate();

// Define o início da semana (domingo)
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - todayDay);

for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    const dayName = weekDays[currentDate.getDay()];
    const dayNumber = currentDate.getDate();

    const dayElement = document.createElement('div');
    const isToday = currentDate.toDateString() === today.toDateString();

    dayElement.innerHTML = `
        <div class="day${isToday ? ' active' : ''}">
            <p>${dayName}</p>
            <p>${dayNumber}</p>
        </div>
    `;

    if (isToday) {
        dayElement.querySelector('.day').style.backgroundColor = '#FFFFFF'; // Blue background
        dayElement.querySelector('.day').style.color = '#000000'; // White text
    }

    calendarContainer.appendChild(dayElement);
}