document.addEventListener('DOMContentLoaded', () => {
    class Login {
        constructor(form, fields){
            this.form = form;
            this.fields = fields;
            this.validateOnSubmit();
        }

        validateOnSubmit(){
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                let error = 0;
                
                this.fields.forEach((field) => {
                    const input = document.querySelector(`#${field}`);
                    if (this.validateFields(input) === false) {
                        error++;
                    }
                });
                
                if (error === 0) {
                    //todo: login api here
                    localStorage.setItem('auth', 1);
                    this.form.submit();
                }
            });
        }

        validateFields(field){
            if (field.value.trim() === '') {
                this.setStatus(
                    field,
                    `${field.previousElementSibling.innerText} cannot be blank`,
                    'error'
                );
                return false;
            } else {
                if(field.type == 'password'){
                    if(field.value.length < 8){
                        this.setStatus(
                            field,
                            `${field.previousElementSibling.innerText} must be at least 8 fucking characters`,
                            'error'
                        );
                        return false;
                    } else{
                        this.setStatus(field, null, 'success');
                        return true;
                    }
                }else{
                    this.setStatus(field, null, 'success');
                    return true;
                }
            }
        }

        setStatus(field, message, status){
            const errorMessage = field.parentElement.querySelector('.error-message');

            if (status === 'error') {
                errorMessage.innerText = message;
                field.classList.add('input-error');
            } else if (status === 'success') {
                errorMessage.innerText = '';
                field.classList.remove('input-error');
            }
        }
    }

    const form = document.querySelector('.loginForm');
    if (form) {
        const fields = ['username', 'password'];
        new Login(form, fields);
    }
});