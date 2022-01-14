(function () {
    const addButton = document.querySelector('.add-interval');
    const closeButton = document.querySelectorAll('#close-button');
    const calculateButton = document.getElementById('submit-button');
    const notification = document.querySelector('.notifications');
    const notificationCloseButton = document.querySelector('.notifications');

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

    notificationCloseButton.addEventListener('click', () => {
        notification.classList.remove('show')
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

            <img src="assets/icons/close_black_24dp.svg" alt="Icone de um X." id="close-button">
        </div>
        `

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
        const intervals = document.querySelectorAll('.interval');

        let totalBreakTime = 0;

        intervals.forEach(interval => {
            const start = interval.childNodes[1].childNodes[3].value.split(':');
            const end = interval.childNodes[3].childNodes[3].value.split(':');

            function format_in_seconds(h, min) {
                return (h * 3600) + (min * 60);
            }

            let time1 = format_in_seconds(end[0], end[1]);
            let time2 = format_in_seconds(start[0], start[1]);

            let difference = time1 - time2;

            /*
            totalBreakHours += Math.floor(diferenca / 3600);
            totalBreakMinutes += Math.floor((diferenca - (totalBreakHours * 3600)) / 60);
            */

            totalBreakTime += difference;
        })

        const startTime = document.getElementById('start').value.split(':');
        const endTime = document.getElementById('end').value.split(':');
        const result = document.getElementById('result');

        function format_in_seconds_two(h, min) {
            return (h * 3600) + (min * 60);
        }

        let time1 = format_in_seconds_two(endTime[0], endTime[1]);
        let time2 = format_in_seconds_two(startTime[0], startTime[1]);

        let difference = time1 - time2;

        if (startTime > endTime) {
            difference = (time1 - 0) + (86400 - time2);
        }

        workedTime = difference - totalBreakTime;

        let finalHours = Math.floor(workedTime / 3600);
        let finalMinutes = Math.floor((workedTime - (finalHours * 3600)) / 60);

        if (finalHours < 10) {
            finalHours = '0' + finalHours;
        }

        if (finalMinutes < 10) {
            finalMinutes = '0' + finalMinutes;
        }

        /* Show the result */
        if (isNaN(finalHours) === true || isNaN(finalMinutes) === true) {
            notification.classList.add('show');
            result.value = '00:00';
        } else {
            result.value = finalHours + ':' + finalMinutes;
        }
    }
})()
