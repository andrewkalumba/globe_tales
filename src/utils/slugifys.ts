export const slugify = (text:string) => {
    return text.toLocaleLowerCase()
    .trim()
    .replace(/[^\w\s\-]/g, '')
    .replace(/[\s_]/g, '-')
    .replace(/-+/g, '-' )
}