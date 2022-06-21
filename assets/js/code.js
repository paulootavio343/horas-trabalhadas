(function () {
    const addButton = document.querySelector('.add-interval');
    const calculateButton = document.getElementById('submit-button');
    const notification = document.querySelector('.notifications');
    const notificationCloseButton = document.querySelector('.notifications img');
    const interval = document.querySelector('.interval-box');

    addButton.addEventListener('click', () => {
        addJobInterval()
    });

    closeButtonEventListener();

    calculateButton.addEventListener('click', () => {
        calculator()
    });

    notificationCloseButton.addEventListener('click', () => {
        notification.classList.remove('show')
    })

    function addJobInterval() {
        interval.innerHTML += `
        <div class="interval">
            <div>
                <label for="start-interval">Início do intervalo:</label>
                <input type="time" class="start-interval" id="start-interval">
            </div>

            <div>
                <label for="end-interval">Fim do intervalo:</label>
                <input type="time" class="end-interval" id="end-interval">
            </div>

            <img src="assets/icons/close_black_24dp.svg" alt="Icone de um X." id="close-button"
                loading="lazy" decoding="async" title="Excluir intervalo">
        </div>
        `

        closeButtonEventListener();
    }

    function calculator() {
        const intervals = document.querySelectorAll('.interval');
        const startTime = document.getElementById('start').value.split(':');
        const endTime = document.getElementById('end').value.split(':');
        const result = document.getElementById('result');

        let totalBreakTime = 0;

        intervals.forEach(interval => {
            const start = interval.childNodes[1].childNodes[3].value.split(':');
            const end = interval.childNodes[3].childNodes[3].value.split(':');

            let time1 = timeInSeconds(end[0], end[1]);
            let time2 = timeInSeconds(start[0], start[1]);
            let difference = time1 - time2;

            totalBreakTime += difference;
        })

        let time1 = timeInSeconds(endTime[0], endTime[1]);
        let time2 = timeInSeconds(startTime[0], startTime[1]);

        if (time2 > time1) {
            difference = time1 + (86400 - time2);
        } else {
            difference = time1 - time2;
        }

        workedTime = difference - totalBreakTime;

        let finalHours = Math.floor(workedTime / 3600); // Hours
        let finalMinutes = Math.floor((workedTime - (finalHours * 3600)) / 60); // Minutes

        // If the result is less than 10, add a 0 before the number
        finalHours = finalHours < 10 ? `0${finalHours}` : finalHours;
        finalMinutes = finalMinutes < 10 ? `0${finalMinutes}` : finalMinutes;

        // Show the result
        if (isNaN(finalHours) === true || isNaN(finalMinutes) === true) {
            notification.classList.add('show');
            result.value = '00:00';
        } else {
            result.value = finalHours + ':' + finalMinutes;
        }
    }

    function timeInSeconds(hours, minutes) {
        return (hours * 3600) + (minutes * 60);
    }

    function closeButtonEventListener() {
        const closeButton = document.querySelectorAll('#close-button');

        closeButton.forEach(button => {
            button.addEventListener('click', event => {
                event.target.parentNode.remove();
            });
        })
    }
})()
