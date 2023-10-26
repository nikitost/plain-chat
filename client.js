let socket;

function connect() {
    if (socket?.readyState !== 1) {
        socket = new WebSocket("ws://localhost:3000");

        socket.onopen = function() {
            console.info("Соединение установлено.");
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.info('Соединение закрыто');
            } else {
                console.error('Обрыв соединения');
            }
            console.info('Код: ' + event.code + ' причина закрытия: ' + event.reason);
        };

        socket.onmessage = function(event) {
            console.info("Получены данные " + event.data);
        };

        socket.onerror = function(error) {
            console.error("Ошибка " + error.message);
        };
    }
}

function disconnect() {
    if (socket?.readyState === 1) {
        socket.close();
    }
}

function sendMessage() {
    const text = $('textarea#msgTextArea').val().trim();
    if (text !== '') {
        socket.send(text);
    }
}
