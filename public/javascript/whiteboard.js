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
        $('#confirmPassword').css('background-color', '#f2dede');
        $('#confirmPassword').css('border-color', '#a94442');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#confirmPasswordText').text('');
        $('#confirmPassword').css('background-color', '#ffffff');
        $('#confirmPassword').css('border-color', '#66afe9');
        $('#sendButton').prop('disabled', false);
    }
}

function validateEmail(){
    
    var emailReg = /^[\S]+@[\S]+\.[\S]+$/;
    var email    = $('#email').val();
    
    if(!emailReg.test(email)){
        $('#emailText').text('Must be a valid email adress');
        $('#email').css('background-color', '#f2dede');
        $('#email').css('border-color', '#a94442');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#emailText').text('');
        $('#email').css('background-color', '#ffffff');
        $('#email').css('border-color', '#66afe9');
        $('#sendButton').prop('disabled', false);
    }
}

function validateUsername(){
    
    var usernameReg = /^[a-zA-Z0-9_-]{3,20}$/;
    var username    = $('#username').val();
    
    if(!usernameReg.test(username)){
        $('#usernameText').text('Username must be between 3 and 20 caracters, and must contain only letters, numbers, - and _ symbols');
        $('#username').css('background-color', '#f2dede');
        $('#username').css('border-color', '#a94442');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#usernameText').text('');
        $('#username').css('background-color', '#ffffff');
        $('#username').css('border-color', '#66afe9');
        $('#sendButton').prop('disabled', false);
    }
}

function validatePassword(){
    
    var passwordReg = /^.{3,20}$/;
    var password    = $("#password").val();
    
    if(!passwordReg.test(password)){
        $('#passwordText').text('Password must be between 3 and 20 caracters');
        $('#password').css('background-color', '#f2dede');
        $('#password').css('border-color', '#a94442');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#passwordText').text('');
        $('#password').css('background-color', '#ffffff');
        $('#password').css('border-color', '#66afe9');
        $('#sendButton').prop('disabled', false);
    }
}