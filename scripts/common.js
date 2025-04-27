function checkUserData(){
    const url = new URL(location.href);
    const name = url.searchParams.get('name');
    const surname = url.searchParams.get('surname');
    const email = url.searchParams.get('email');

    if( !name || !surname || !email){
        location.href = 'index.html';
    }
}