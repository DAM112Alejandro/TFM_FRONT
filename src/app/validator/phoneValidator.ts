import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumber = control.value;
        const isValid = /^\d{9}$/.test(phoneNumber);

        return isValid ? null : { invalidPhone: true };
    };
}
