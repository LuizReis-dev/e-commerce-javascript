const url = 'http://localhost:3001';

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', signup);

function signup(e) { 
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if (email === '') return alert('Error: o campo de email não pode ser nulo');
    if (name === '') return alert('Error: o campo de nome não pode ser nulo');
    if (password === '') return alert('Error: o campo de senha não pode ser nulo');
    if (confirmPassword === '') return alert('Error: o campo de confirmação de senha não pode ser nulo');

    axios.post(`${url}/signup`,{
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword
    }).then((res) => {
        console.log(res.data)
        if(res.data.auth){
            const token = res.data.token
            window.localStorage.setItem('authToken', token);
            window.location.href = "index.html"

        }else {
            alert(res.data.message);
        }
    }).catch((error => {console.log(error)}));   
}