import { createTheme } from '@mui/material/styles';

// assets
import colors from '../scss/_themes-var.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */
const color = colors;
const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,

};
export const theme = createTheme()
theme.components = componentStyleOverrides(themeOption);

export default theme;