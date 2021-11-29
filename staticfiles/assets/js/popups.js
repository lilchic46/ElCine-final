$(document).ready(function () {

    let formsOverlay = $('.custom-tool-forms-overlay');
    let registerForm = $('#custom-tool-register-form');

    let isUserLoggedIn = function() {
        return $('#tool_is_logged_in_input').length > 0;
    };

    let closeForms = function() {
        registerForm.hide();
    };

    let showFormMessage = function (type, form, message) {
        let possibleTypes = [
            'error',
            'success'
        ];
        for (let i = 0; i < possibleTypes.length; i++) {
            let selector = '.custom-tool-form-message.custom-tool-form-' + possibleTypes[i];
            let elementsToHide = $(selector);
            elementsToHide.each(function() {
                $(this).hide(0);
            });
        }
        let errorEl = form.find('.custom-tool-form-message.custom-tool-form-' + type);
        if (errorEl.length > 0) {
            errorEl.html(message);
            errorEl.show();
        }
    };

    let showRegisterForm = function () {
        closeForms();
        let loginInStatus = isUserLoggedIn();
        if (loginInStatus) {
            window.location = '/app/projects';
        } else {
            formsOverlay.show();
            registerForm.show();
        }
    };

    // check #resiter in url
    let currUrl = window.location.href;
    if (currUrl.indexOf('/#register') !== -1) {
        showRegisterForm();
    }

    let registerMenuButton = $('.custom-tool-register');
    if (registerMenuButton.length > 0) {
        registerMenuButton.click(function (e) {
            e.preventDefault();
            showRegisterForm();
        })
    }

    let registerLinks = $('.register-link');
    registerLinks.each(function () {
        let curr = $(this);
        curr.click(function (e) {
            e.preventDefault();
            showRegisterForm();
        });
    });

    let okRegisterButton = registerForm.find('input[name="wp-submit"]');
    if (okRegisterButton.length > 0) {
        okRegisterButton.click(function (e) {
            e.preventDefault();

            let nameVal = registerForm.find('input[name="name"]').val();
            let emailVal = registerForm.find('input[name="email"]').val();
            let passVal = registerForm.find('input[name="password"]').val();
            let passRepeatVal = registerForm.find('input[name="password_repeat"]').val();

            let request = $.ajax({
                url: "/app/signup",
                method: "POST",
                data: {
                    protected: ((new Date()).getTime() - 3600) * 2 + 1000,
                    usr_nm: nameVal,
                    usr_em: emailVal,
                    usr_pd: passVal,
                    usr_pdr: passRepeatVal,
                    is_ajax: 1
                }
            });

            request.done(function (data) {
                let answer = $.parseJSON(data);
                if (answer.result === 1) {
                    let redirectForm = registerForm.find('#register_redirect_form');
                    redirectForm.find('input[name="user_registered_email"]').val(emailVal);
                    redirectForm.find('form').submit();
                } else {
                    showFormMessage('error', registerForm, answer.message);
                }
            });
        });
    }

    let registerCancelButton = registerForm.find('.custom-tool-reset-close');
    if (registerCancelButton.length > 0) {
        registerCancelButton.click(function (e) {
            e.preventDefault();
            registerForm.hide();
            formsOverlay.hide();
        });
    }

    let logoutLinks = $('.custom-tool-logout-link');
    logoutLinks.each(function() {
       let curr = $(this);
       console.log(curr);
       curr.click(function(e) {
           e.preventDefault();

           let request = $.ajax({
               url: "/app/logout",
               method: "POST",
               data: {
                   protected: ((new Date()).getTime() - 3600) * 2 + 1000,
                   is_ajax: '1'
               }
           });

           request.done(function (data) {
               let answer = $.parseJSON(data);
               if (answer.result === 1) {
                   window.location = '/';
               } else {
                   showFormMessage('error', loginForm, answer.message);
               }
           });
       });
    });
});