// script.js

// Путь к PDF-файлу
const pdfPath = 'maps/zakonbojiy.pdf';

let pdfDoc = null,
    pageNum = parseInt(localStorage.getItem('currentPage')) || 1,
    pageIsRendering = false,
    scale = 2.5, // Начальный масштаб
    canvas = document.getElementById('pdf-render'),
    ctx = canvas.getContext('2d');

// Загрузка PDF
pdfjsLib.getDocument(pdfPath).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    renderPage(pageNum); // Отображаем первую страницу
}).catch(err => {
    console.error("Ошибка загрузки PDF:", err.message);
});

// Рендеринг страницы с учетом текущего масштаба
function renderPage(num) {
    if (pageIsRendering) return; // Если страница уже рендерится, ждем окончания

    pageIsRendering = true;

    // Получение страницы
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
        });

        // Сохранение текущей страницы в локальное хранилище
        localStorage.setItem('currentPage', num);
    }).catch(err => {
        console.error("Ошибка рендеринга страницы:", err.message);
        pageIsRendering = false;
    });
}

// Перелистывание страниц
function nextPage() {
    if (pageNum < pdfDoc.numPages) {
        pageNum++;
        renderPage(pageNum);
    }
}

function prevPage() {
    if (pageNum > 1) {
        pageNum--;
        renderPage(pageNum);
    }
}
/*
// Увеличение масштаба
function zoomIn() {
    if (scale < 15.0) { // Максимальный масштаб 2.0
        scale += 0.5;
        console.log("Масштаб увеличен:", scale); // Отладка
        renderPage(pageNum); // Перерисовываем страницу с новым масштабом
    }
}

// Уменьшение масштаба
function zoomOut() {
    if (scale > 0.5) { // Минимальный масштаб 0.5
        scale -= 0.25;
        console.log("Масштаб уменьшен:", scale); // Отладка
        renderPage(pageNum); // Перерисовываем страницу с новым масштабом
    }
}
*/