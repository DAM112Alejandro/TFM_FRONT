import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function licensePlateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const licensePlate = control.value;
        // Formato: 1234 ABC
        const isValid = /^\d{4}[A-Z]{3}$/.test(licensePlate);

        return isValid ? null : { invalidLicensePlate: true };
    };
}
