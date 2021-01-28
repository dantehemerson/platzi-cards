export const getStyles = ({ titleColor, textColor, iconColor, show_icons }) => {
  return `
    .stat {
      font: 600 14px Sans-Serif; fill: ${textColor};
    }
    .stagger {
      opacity: 1;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; 
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? 'block' : 'none'};
    }
  `;
};
