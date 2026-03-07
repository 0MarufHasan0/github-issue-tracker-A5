console.log('hello world')

document.getElementById('login-btn')
.addEventListener('click', function(){

    // userName value
    const UserInput = document.getElementById('input-username');
    const UserValue = UserInput.value ;
    console.log(UserValue)

    // password value


    const userPass= document.getElementById("input-password") ;
    const passValue = userPass.value
    console.log(passValue)

// condition

if(UserValue ==="admin" && passValue === "admin123" ){
    alert('login success')

   window.location.assign('./home.html')
}

else{
    alert('login fail')
    return
}

})