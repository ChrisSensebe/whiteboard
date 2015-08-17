// close flash message

$('#hideFlash').click(function(){
    $('#flash').hide();
});


// Checks password match in forms

$(document).ready(function(){
    $('#confirmPassword').keyup(checkPasswordMatch);
});

function checkPasswordMatch(){
    
    var password        = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (password != confirmPassword){
        $('#passwordMatch').text('Passwords must match');
        $('#confirmPassword').css('background-color', '#f2dede');
        $('#confirmPassword').css('border-color', '#a94442');
        $('#sendButton').prop('disabled', true);
    }
    else{
        $('#passwordMatch').text('');
        $('#confirmPassword').css('background-color', '#ffffff');
        $('#confirmPassword').css('border-color', '#66afe9');
        $('#sendButton').prop('disabled', false);
    }
}