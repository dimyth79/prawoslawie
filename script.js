// Функция для перехода на страницу
function openPage() {
    window.location.href = 'zakonbojiy.html';
}

// Функция для подтверждения и начала скачивания
function confirmDownload() {
    const userConfirmed = confirm("Вы уверены, что хотите скачать файл?");
    if (userConfirmed) {
        window.location.href = 'maps/zakonbojiy.pdf';  // Замените на путь к вашему файлу
    }
}