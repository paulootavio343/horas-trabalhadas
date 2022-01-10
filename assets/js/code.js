(function () {
    const addButton = document.querySelector('.add-interval');
    const closeButton = document.querySelectorAll('#close-button');
    const calculateButton = document.getElementById('submit-button');

    addButton.addEventListener('click', () => {
        addJobInterval()
    });

    calculateButton.addEventListener('click', () => {
        calculator()
    });

    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            removeJobInterval(event.target.parentNode);
        });
    })

    function addJobInterval() {
        const interval = document.querySelector('.interval-box');

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

            <span class="material-icons-round" id="close-button">close</span>
        </div>`

        const closeButton = document.querySelectorAll('#close-button');

        closeButton.forEach(button => {
            button.addEventListener('click', () => {
                removeJobInterval(event.target.parentNode);
            });
        })
    }

    function removeJobInterval(e) {
        e.remove();
    }

    function calculator() {
        const startTime = document.getElementById('start').value.split(':');
        const endTime = document.getElementById('end').value.split(':');
        const result = document.getElementById('result');
        const intervals = document.querySelectorAll('.interval');

        let totalBreakHours = 0;
        let totalBreakMinutes = 0;

        intervals.forEach(interval => {
            const start = interval.childNodes[1].childNodes[3].value.split(':');
            const end = interval.childNodes[3].childNodes[3].value.split(':');

            let breakHours = parseInt(end[0]) - parseInt(start[0]);
            let breakMinutes = parseInt(end[1]) - parseInt(start[1]);

            if (breakMinutes < 0) {
                breakHours -= 1;
                breakMinutes += 60;
            }

            totalBreakHours += parseInt(breakHours);
            totalBreakMinutes += parseInt(breakMinutes);
        })

        if (totalBreakMinutes > 59) {
            totalBreakHours += 1;
            totalBreakMinutes -= 60;
        }

        let hours = parseInt(endTime[0]) - parseInt(startTime[0]);
        let minutes = parseInt(endTime[1]) - parseInt(startTime[1]);

        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }

        workedHours = hours - totalBreakHours;
        workedMinutes = minutes - totalBreakMinutes;

        if (workedMinutes < 0) {
            workedHours -= 1;
            workedMinutes += 60;
        }

        if (workedHours < 10) {
            workedHours = '0' + workedHours;
        }

        if (workedMinutes < 10) {
            workedMinutes = '0' + workedMinutes;
        }

        result.value = workedHours + ':' + workedMinutes;
    }
})()
