export const MONOCHROMATIC_DEFAULT_COLORSET = '#2b83ba';
export const MULTICHROMATIC_DEFAULT_COLORSET =
    '#d7191c #fdae61 #ffffbf #abdda4 #2b83ba';
export const MULTICHROMATIC_DEFAULT_COLORSET_STREAMGRAPH =
    '#E6194B #3CB44B #FFE119 #4363D8 #F58231 #911EB4 #46F0F0 #F032E6 #BCF60C #FABEBE #008080 #E6BEFF #9A6324 #FFFAC8 #800000 #AAFFC3 #808000 #FFD8B1 #000075 #808080 #FFFFFF #000000';

export function isValidColor(colorInput) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorInput) ? true : false;
}