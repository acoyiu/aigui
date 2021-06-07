async function TransformerSubtitution() {

    // replace original svg tag by transformer
    window.AiGUI.AllInteractives = Array.from(
        document.querySelectorAll('[id^="in"]'))
        .map(tag => {

            // remove _1_ or similar char in id
            tag.id = tag.id.replace(/_\d\d?\d?_/, '');

            // create transformer for all as standard
            let transformerObj = new AiJs.Transformer(tag);
            transformerObj.transformElement.id = tag.id;
            tag.id = '';

            // interchange of opacity
            transformerObj.transformElement.style.opacity = (tag.style.opacity || tag.getAttribute('opacity'));
            tag.style.opacity = 1;

            return transformerObj;
        });


    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


    // extract name
    window.AiGUI.AllNamedObj = {};
    window.AiGUI.AllInteractives.forEach(tObj => {

        const allAttributes = tObj.transformElement.id.split('::');
        // console.log('allAttributes', allAttributes);

        const eleName = allAttributes[1];
        if (eleName != '*') {
            tObj.transformElement.dataset.ainame = eleName;
            if (!window.AiGUI.AllNamedObj[eleName]) window.AiGUI.AllNamedObj[eleName] = [];
            window.AiGUI.AllNamedObj[eleName].push(tObj);
        }
    });
    // console.log('window.AiGUI.AllNamedObj ', window.AiGUI.AllNamedObj);
};