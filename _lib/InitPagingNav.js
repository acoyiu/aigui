{
    window.InitPagingNav = async function () {
        window
            .AiGUI
            .AllInteractives
            .filter(inter => inter.transformElement.id.includes('Page'))
            .forEach(pagingElementTransformObj => casePage(pagingElementTransformObj));
    }


    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################


    function casePage(tObj) {


        const tag = tObj.transformElement;
        // console.log('tag', tag);


        let [sign, pageToGo] = tag.id.split('Page')[1].split(')')[0].split('(');
        pageToGo = pageToGo === '' ? NaN : Number(pageToGo);
        // console.log('sign', sign, pageToGo);


        switch (sign) {
            case 'Next':
                tag.nodeName === 'image'
                    ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => window.AiGUI.ChangePage(true) })
                    : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => window.AiGUI.ChangePage(true) });
                break;
            case 'Prev':
                tag.nodeName === 'image'
                    ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => window.AiGUI.ChangePage(false) })
                    : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => window.AiGUI.ChangePage(false) });
                break;
            case 'To':
                if (!pageToGo) console.warn('pageToGo is undefined.');
                tag.nodeName === 'image'
                    ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => window.AiGUI.ChangePage(pageToGo) })
                    : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => window.AiGUI.ChangePage(pageToGo) });
                break;
        }
    }
}







