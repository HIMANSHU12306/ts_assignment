var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SignUpValidator {
    static validateUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate asynchronous validation
            return new Promise((resolve) => {
                setTimeout(() => {
                    const isValid = /^[a-zA-Z0-9_]+$/.test(username);
                    resolve({
                        isValid,
                        errorMessage: isValid ? undefined : 'Invalid characters in username',
                    });
                }, 1000);
            });
        });
    }
    static validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate asynchronous validation
            return new Promise((resolve) => {
                setTimeout(() => {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                    resolve({
                        isValid,
                        errorMessage: isValid ? undefined : 'Invalid email address',
                    });
                }, 1000);
            });
        });
    }
    static validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate asynchronous validation
            return new Promise((resolve) => {
                setTimeout(() => {
                    const isValid = password.length >= 6;
                    resolve({
                        isValid,
                        errorMessage: isValid ? undefined : 'Password must be at least 6 characters long',
                    });
                }, 1000);
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const errorMessageDiv = document.getElementById('error-message');
    submitBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        try {
            // Display loader while validating
            loader.style.display = 'block';
            // Validate username, email, and password asynchronously
            const usernameValidation = yield SignUpValidator.validateUsername(username);
            const emailValidation = yield SignUpValidator.validateEmail(email);
            const passwordValidation = yield SignUpValidator.validatePassword(password);
            // Hide loader after validation
            loader.style.display = 'none';
            // Check if all validations pass
            if (usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
                // Add your form submission logic here
                console.log('Form is valid. Submitting...');
            }
            else {
                // Display error messages
                errorMessageDiv.textContent = `${usernameValidation.errorMessage || ''}\n${emailValidation.errorMessage || ''}\n${passwordValidation.errorMessage || ''}`;
            }
        }
        catch (error) {
            // Handle unexpected errors
            console.error('An error occurred during validation:', error);
            errorMessageDiv.textContent = 'An error occurred during validation.';
        }
    }));
});
