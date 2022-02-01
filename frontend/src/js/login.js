const url = 'http://localhost:3001';

const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', login)

function login(e) { 
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email === '') return alert('Error: o campo de email não pode ser nulo');
    if (password === '') return alert('Error: o campo de senha não pode ser nulo');

    axios.post(`${url}/login`,{
        email: email,
        password: password
    }).then((res) => {
        if(res.data.auth){
            const token = res.data.token
            window.localStorage.setItem('authToken', token);
            window.location.href = "index.html"

        }else {
            alert(res.data.message);
        }
    }).catch((error => {console.log(error)}));   
}