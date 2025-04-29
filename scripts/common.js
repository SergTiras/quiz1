function checkUserData(){
    const name = sessionStorage.getItem('name');
    const surname = sessionStorage.getItem('surname');
    const email = sessionStorage.getItem('email');

    if( !name || !surname || !email){
        location.href = 'index.html';
    }
}