// close flash message

$('#hideFlash').click(function(){
    $('#flash').hide();
});


// form validation

$(document).ready(function(){
    $('#confirmPassword').keyup(passwordCheck);
    $('#email').keyup(validateEmail);
    $('#username').keyup(validateUsername);
    $('#password').keyup(validatePassword);
});

function passwordCheck(){
    
    var password        = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    
    if (password != confirmPassword){
        $('#confirmPasswordText').text('Passwords must match');
        $('#confirmPassword').addClass('invalid-form');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#confirmPasswordText').text('');
        $('#confirmPassword').removeClass('invalid-form');
        $('#sendButton').prop('disabled', false);
    }
}

function validateEmail(){
    
    var emailReg = /^[\S]+@[\S]+\.[\S]+$/;
    var email    = $('#email').val();
    
    if(!emailReg.test(email)){
        $('#emailText').text('Must be a valid email adress');
        $('#email').addClass('invalid-form');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#emailText').text('');
        $('#email').removeClass('invalid-form');
        $('#sendButton').prop('disabled', false);
    }
}

function validateUsername(){
    
    var usernameReg = /^[a-zA-Z0-9_-]{3,20}$/;
    var username    = $('#username').val();
    
    if(!usernameReg.test(username)){
        $('#usernameText').text('Username must be between 3 and 20 caracters, and must contain only letters, numbers, - and _ symbols');
        $('#username').addClass('invalid-form');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#usernameText').text('');
        $('#username').removeClass('invalid-form');
        $('#sendButton').prop('disabled', false);
    }
}

function validatePassword(){
    
    var passwordReg = /^.{3,20}$/;
    var password    = $("#password").val();
    
    if(!passwordReg.test(password)){
        $('#passwordText').text('Password must be between 3 and 20 caracters');
        $('#password').addClass('invalid-form');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#passwordText').text('');
        $('#password').removeClass('invalid-form');
        $('#sendButton').prop('disabled', false);
    }
}