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
        const startTime = document.getElementById('start');
        console.log(startTime.value);
    }
})()
