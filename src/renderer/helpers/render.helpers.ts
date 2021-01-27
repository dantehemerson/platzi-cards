// https://stackoverflow.com/a/48073476/10629172
export function encodeHTML(html: string) {
  return html
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return '&#' + i.charCodeAt(0) + ';';
    })
    .replace(/\u0008/gim, '');
}

/**
 * @description
 * Auto layout utility, allows us to layout things
 * vertically or horizontally with proper gaping
 */
export function FlexLayout({
  items,
  gap,
  direction,
}: {
  items: any[];
  gap: number;
  direction?: 'column';
}) {
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    let transform = `translate(${gap * i}, 0)`;
    if (direction === 'column') {
      transform = `translate(0, ${gap * i})`;
    }
    return `<g transform="${transform}">${item}</g>`;
  });
}
