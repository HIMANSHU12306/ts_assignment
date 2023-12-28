interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

class SignUpValidator {
    static async validateUsername(username: string): Promise<ValidationResult> {
        // Simulate asynchronous validation
        return new Promise<ValidationResult>((resolve) => {
            setTimeout(() => {
                const isValid = /^[a-zA-Z0-9_]+$/.test(username);
                resolve({
                    isValid,
                    errorMessage: isValid ? undefined : 'Invalid characters in username',
                });
            }, 1000);
        });
    }

    static async validateEmail(email: string): Promise<ValidationResult> {
        // Simulate asynchronous validation
        return new Promise<ValidationResult>((resolve) => {
            setTimeout(() => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                resolve({
                    isValid,
                    errorMessage: isValid ? undefined : 'Invalid email address',
                });
            }, 1000);
        });
    }

    static async validatePassword(password: string): Promise<ValidationResult> {
        // Simulate asynchronous validation
        return new Promise<ValidationResult>((resolve) => {
            setTimeout(() => {
                const isValid = password.length >= 6;
                resolve({
                    isValid,
                    errorMessage: isValid ? undefined : 'Password must be at least 6 characters long',
                });
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm') as HTMLFormElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    const loader = document.getElementById('loader') as HTMLDivElement;
    const errorMessageDiv = document.getElementById('error-message') as HTMLDivElement;

    submitBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            // Display loader while validating
            loader.style.display = 'block';

            // Validate username, email, and password asynchronously
            const usernameValidation = await SignUpValidator.validateUsername(username);
            const emailValidation = await SignUpValidator.validateEmail(email);
            const passwordValidation = await SignUpValidator.validatePassword(password);

            // Hide loader after validation
            loader.style.display = 'none';

            // Check if all validations pass
            if (usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
                // Add your form submission logic here
                console.log('Form is valid. Submitting...');
            } else {
                // Display error messages
                errorMessageDiv.textContent = `${usernameValidation.errorMessage || ''}\n${emailValidation.errorMessage || ''}\n${passwordValidation.errorMessage || ''}`;
            }
        } catch (error) {
            // Handle unexpected errors
            console.error('An error occurred during validation:', error);
            errorMessageDiv.textContent = 'An error occurred during validation.';
        }
    });
});
