const btns = document.querySelectorAll('.dogBtns li');
const Imgs = document.querySelectorAll('.Imgs div');

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', (e) => {
        activation(i, btns);
        activation(i, Imgs);
    });
}

function activation(index, list) {
    for (let el of list) {
        el.classList.remove('on');
    }
    list[index].classList.add('on');
}