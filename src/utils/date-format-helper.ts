function dateFormat(date: Date | null): string | null {
    if (date) {
        if (typeof (date) === 'string') return date;
        let formatedDateString = '';
        const dateText = date.toLocaleDateString('es-MX').split('/', 3);

        const day = dateText[0].padStart(2, '0');;
        const month = dateText[1].padStart(2, '0');;
        const year = dateText[2];

        formatedDateString = year + '-' + month + '-' + day;

        return formatedDateString;

    }
    return null;
}

export default dateFormat;


export function parseLocalDateString(dateStr?: string): Date | null {
    if (!dateStr) return null;
  
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;
  
    const [year, month, day] = parts.map(Number);
  
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  
    return new Date(year, month - 1, day); // Mes base 0
  }

  export function formatDateSpanish(date: Date | undefined | null, showYear?: boolean): string {
    if (!date) {
      return "-";
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const shortMonth = date.toLocaleString('es-ES', { month: 'short' });
    const capitalizedMonth = shortMonth.charAt(0).toUpperCase() + shortMonth.slice(1).toLowerCase();
    const year = date.getFullYear();
  
    return `${day} ${capitalizedMonth} ${(showYear) ? "" : year}`;
  }