export function generatePassword(name: string) : string {
    const firstTwoLetters = name.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    return `${process.env.NEXT_PUBLIC_KEY_PASS ?? ""}${year}${firstTwoLetters}`;
}
