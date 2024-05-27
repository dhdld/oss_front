const host = 'http://127.0.0.1:4000'; // http://54.196.26.53:4000

const commentsContainer = document.querySelector('.comments_container');

function getComments() {
    axios.get(`${host}/comments`)
        .then((response) => {
            console.log(response.data);
            renderComments(response.data.comments);
        })
        .catch((error) => {
            console.log('err get: ', error);
        });
}

function renderComments(comments) {
    commentsContainer.innerHTML = '';
    comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const name_div = document.createElement('div');
        name_div.classList.add('name_div');

        const writer = document.createElement('p');
        writer.classList.add('writer');
        writer.innerText = '작성자: ';

        const comment_name = document.createElement('p');
        comment_name.classList.add('comment_name');
        comment_name.innerText = comment.name;

        name_div.appendChild(writer);
        name_div.appendChild(comment_name);

        const comment_contents = document.createElement('p');
        comment_contents.classList.add('comment_contents');
        comment_contents.innerText = comment.contents;

        const comment_date = document.createElement('p');
        comment_date.classList.add('comment_date');
        comment_date.innerText = comment.date;

        commentDiv.appendChild(name_div);
        commentDiv.appendChild(comment_contents);
        commentDiv.appendChild(comment_date);
        commentsContainer.appendChild(commentDiv);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_btn');
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteComment(comment.id);
        });
        commentDiv.appendChild(deleteBtn);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    getComments();
});

const nameInput = document.querySelector('.input_name');
const commentInput = document.querySelector('.input_contents');
const submitBtn = document.querySelector('.comment_submit');
submitBtn.addEventListener('click', addComment);

function addComment(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const contents = commentInput.value.trim();
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let comment = {
        id: 0,
        name: name,
        contents: contents,
        date: `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    };
    if (name == '' || contents == '') return;

    axios.post(`${host}/comments`, comment)
        .then((response) => {
            console.log(response.data);
            getComments();
            nameInput.value = '';
            commentInput.value = '';
        })
        .catch((error) => {
            console.log('err post: ', error);
        });
}


function deleteComment(id) {
    axios.delete(`${host}/comments/${id}`)
        .then((response) => {
            console.log(response.data);
            getComments();
        })
        .catch((error) => {
            console.log('err delete: ', error);
        });
}