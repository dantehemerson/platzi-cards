import axios from 'axios';

export function imageToDataUrl(url: string): Promise<string> {
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const base64Image = Buffer.from(response.data, 'binary').toString(
        'base64',
      );
      return `data:image/png;base64,${base64Image}`;
    });
}
