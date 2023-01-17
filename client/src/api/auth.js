export const setauthToken = user => {
    const currentUser = {
        email: user.email
    }


    //save user in db and get jwt token
    console.log(user?.email)
    fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        //save token in localstorage
        localStorage.setItem('air-cnc-token', data.token)
    })
}