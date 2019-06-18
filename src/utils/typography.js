import Typography from 'typography';
import TypeTheme from 'typography-theme-ocean-beach';

TypeTheme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      textShadow: 'none',
      backgroundImage: 'none',
      color: '#ba000d',
    },
  };
};

// delete TypeTheme.googleFonts;

const typography = new Typography(TypeTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
