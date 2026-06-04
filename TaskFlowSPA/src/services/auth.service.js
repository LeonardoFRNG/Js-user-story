export function getUser () {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function hasRole (role) {
    const user = getUser();
    return user ? user.roles.includes(role) : false;
}

export function logout () {
    localStorage.removeItem('user'); //borra al user del ls
    history.pushState({}, "", "/login"); //cambia la vista al login sin recargar
    window.dispatchEvent(new Event('popState')); //dispara el router manualmente
}
