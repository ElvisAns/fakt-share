export const useUsernameExtractor = (email) => {
    return useState('email', () => {
        const [name] = email.split('@');
        return `@${name}`;
    })
}