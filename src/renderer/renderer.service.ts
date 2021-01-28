import { Injectable } from '@nestjs/common';
import { User } from '../platzi-api/interfaces/user.interface';
import { Card } from './components/card';
import { imageToDataUrl } from './helpers/image-to-data-url.helper';
import { themes } from './themes/themes';
import { FlexLayout } from './helpers/render.helpers';
import { getStyles } from './helpers/styles.helper';
import { images } from './data/images';

@Injectable()
export class RendererService {
  async render(user: User) {
    const avatarBase64 = await imageToDataUrl(user.avatar);

    const theme = themes['platzi'];

    const nodes = [
      {
        id: '1',
        label: 'Puntos',
        value: user.points,
      },
      {
        id: 'questions',
        label: 'Preguntas',
        value: user.questions,
      },
      {
        id: 'answers',
        label: 'Respuestas',
        value: user.answers,
      },
      {
        id: 'courses_completed',
        label: 'Cursos Completados',
        value: (user.courses.length + user.deprecated.length).toString(),
      },
      {
        id: 'careers_completed',
        label: 'Carreras Completadas',
        value: user.careers.length.toString(),
      },
    ];

    const stats = nodes.map((node, index) => {
      return this.createTextNode({
        ...node,
        index,
        shiftValuePos: 40,
      });
    });

    const cssStyles = getStyles({
      titleColor: theme.textColor,
      textColor: theme.textColor,
      iconColor: theme.textColor,
      show_icons: false,
    });

    const card = new Card({
      customTitle: `${user.name}'s Platzi Stats`,
      titlePrefixIcon: 's',
      colors: {
        titleColor: theme.textColor,
        textColor: theme.textColor,
        iconColor: theme.textHighColor,
      },
      width: 400,
      height: 200,
    });

    card.setCSS(cssStyles);

    card.setHideTitle(true);

    const res = FlexLayout({
      items: stats,
      gap: 20,
      direction: 'column',
    }).join('');

    return card.render(
      `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" version="1.2" height="140">
      <g transform="translate(0, 0)">

          <g fill="#00000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
            <image x="22" y="0" width="25" height="25" preserveAspectRatio="xMidYMid slice" xlink:href="${images.logo}"/>
          </g>
          <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
            <text fill="${theme.textColor}" fill-opacity="1" stroke="none" xml:space="preserve" x="45" y="19" font-family="Arial" font-size="18" font-weight="700" font-style="normal">Stats</text>
          </g>
          
          <g fill="#00000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
            <image x="10" y="32" width="100" height="100" preserveAspectRatio="xMidYMid slice" xlink:href="${avatarBase64}"/>
          </g>

          <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
            <text fill="${theme.textColor}" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="19" font-family="Arial" font-size="18" font-weight="700" font-style="normal">${user.name}</text>
          </g>

          <svg x="10" y="37">
          ${res}
          </svg>
      </g>
    </svg>
    `,
    );
  }

  createTextNode({
    icon,
    label,
    value,
    id,
    index,
    showIcons,
    shiftValuePos,
  }: {
    icon?: string;
    showIcons?: boolean;
    label: string;
    value: string;
    id: string;
    index: number;
    shiftValuePos: number;
  }) {
    // const staggerDelay = (index + 3) * 150;

    const labelOffset = showIcons ? `x="25"` : '';
    const iconSvg = showIcons
      ? `
      <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
        ${icon}
      </svg>
    `
      : '';

    const y = '12.5';
    return `
      <g class="stagger" transform="translate(115, 0)">
        ${iconSvg}
        <text class="stat bold" ${labelOffset} y="${y}">${label}:</text>
        <text 
          class="stat" 
          x="${(showIcons ? 140 : 120) + shiftValuePos}" 
          y="${y}" 
          data-testid="${id}"
        >${value}</text>
      </g>
    `;
  }
}
