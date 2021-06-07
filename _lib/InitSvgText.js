async function InitSvgText(tagToUpdateInnerHTML) {

    try {
        const
            urlParams = new URLSearchParams(window.location.search),
            pathParam = decodeURI(urlParams.get('path'));
        // console.log('pathParam', pathParam);


        if (!pathParam)
            throw 'No param passed in.';


        window.targetPath = pathParam;


        let svgText = await (await fetch(`${pathParam}/index.svg`)).text();


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
                `xlink:href="${pathParam}/`
            );
        // console.log(svgText);


        tagToUpdateInnerHTML.innerHTML = svgText;
    }
    catch (error) {
        alert('Content Load Error.');
        throw error;
    }
};