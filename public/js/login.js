// TODO: handle remember me
// TODO: encapsulate the storage

function login() {
    var secret = prompt("Know the secret baba?");

    if (secret === 'kama') {
        sessionStorage.isAdmin = true;
    }
}

// TODO: Handle logout
function logout() {

}