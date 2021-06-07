async function InitSvgText(tagToUpdateInnerHTML) {

    let svgText;
    if (!window.location.search.includes('default')) svgText = await (await fetch('./target/index.svg')).text();
    else svgText = await (await fetch('./svg/index.svg')).text();

    svgText = svgText
        .replace(/_x21_/g, '!')
        .replace(/_x40_/g, '@')
        .replace(/_x23_/g, '#')
        .replace(/_x24_/g, '$')
        .replace(/_x25_/g, '%')
        .replace(/_x5E_/g, '^')
        .replace(/_x26_/g, '&')
        .replace(/_x2A_/g, '*')
        .replace(/_x28_/g, '(')
        .replace(/_x29_/g, ')')
        .replace(/_x2D_/g, '-')
        .replace(/_x5F_/g, '_')
        .replace(/_x2B_/g, '+')
        .replace(/_x3D_/g, '=')
        .replace(/_x2C_/g, ',')
        .replace(/<\?xml(.*?)>/g, '')
        .replace(/<!--(.*?)-->/g, '')
        .replace(
            /xlink\:href\=\"/g,
            window.location.search.includes('default')
                ? 'xlink:href="./svg/'
                : 'xlink:href="./target/'
        );
    // console.log(svgText);

    tagToUpdateInnerHTML.innerHTML = svgText;
};