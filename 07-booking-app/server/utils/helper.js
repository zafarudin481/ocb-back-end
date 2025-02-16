export function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail;
};