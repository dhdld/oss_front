const hideImg = document.querySelector('.hideImg');
const showImg = document.querySelector('.showImg');

const img = document.querySelectorAll('.dog');

hideImg.addEventListener('click', () => {
    for (let i = 0; i < img.length; i++) {
        img[i].style.display = 'none';
    }
});

showImg.addEventListener('click', () => {
    for (let i = 0; i < img.length; i++) {
        img[i].style.display = 'block';
    }
});