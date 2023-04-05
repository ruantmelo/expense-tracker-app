export function getFormattedDate(date){
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
}