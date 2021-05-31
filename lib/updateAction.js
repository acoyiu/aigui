const MissionContent = {


    UpdateAction() {

        // console.log('allInteractive', MissionCache.allInteractive);
        // console.log('actElement', MissionCache.actElement);
        // console.log('pageChanger', MissionCache.pageChanger);
        // console.log('namedObj', MissionCache.namedObj);

        MissionCache.actElement.forEach(actEle => MissionContent.Act(actEle));
        MissionCache.pageChanger.forEach(pageEle => MissionContent.Page(pageEle));
    },




    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################
    Page: tObj => {

        const tag = tObj.transformElement;
        // console.log('tag', tag);


        const [sign] = tag.id.split('Page')[1].split(')')[0].split('(');
        // console.log('sign', sign, paramString);


        switch (sign) {
            case 'Next':
                tag.nodeName === 'image'
                    ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => window.changePage(true) })
                    : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => window.changePage(true) });
                break;
            case 'Prev':
                tag.nodeName === 'image'
                    ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => window.changePage(false) })
                    : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => window.changePage(false) });
                break;
        }
    },





    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################
    Act: tObj => {

        const tag = tObj.transformElement;
        // console.log('tag', tag);

        let arr_targetCallback = [
            // AiJsButtonInstance => {
            //     console.log('clicked');
            // }
        ];

        tag.nodeName === 'image'
            ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => arr_targetCallback.forEach(ƒ => ƒ()) })
            : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => arr_targetCallback.forEach(ƒ => ƒ()) });


        // each action adding
        Array.from(tag.id.split('::').filter(str => str.startsWith('Act'))).forEach(actionSignature => {
            // console.log('actionSignature', actionSignature);

            let [targetAction, targetParam] = actionSignature.replace(')', '').split('(');
            targetParam = targetParam.split(',');
            // console.log('targetAction', targetAction);
            // console.log('targetParam', targetParam);

            switch (targetAction) {


                // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


                case 'ActClickShow':
                    console.log('ActClickShow', targetAction, targetParam);
                    {
                        const [targetEleName, isToggle] = targetParam;
                        let isShown = false;

                        arr_targetCallback.push(
                            () => {
                                console.log(MissionCache.namedObj);
                                console.log(targetEleName);
                                try {
                                    MissionCache.namedObj[targetEleName].forEach(transformerObj => {
                                        if (isToggle) {
                                            if (isShown) transformerObj.updateCss({
                                                opacity: 0,
                                                pointerEvents: 'none',
                                            });
                                            else transformerObj.updateCss({
                                                opacity: 1,
                                                pointerEvents: 'all',
                                            });
                                        }
                                        else transformerObj.updateCss({
                                            opacity: 1,
                                            pointerEvents: 'all',
                                        });
                                    });
                                    isShown = !isShown;
                                } catch (error) {
                                    console.error(error);
                                    console.error(targetEleName);
                                }
                            }
                        );
                    }
                    break;


                // ----------------------------------------------------------------------------------------------


                case 'ActClickHide':
                    // console.log('ActClickShow', targetAction, targetParam);
                    {
                        const [targetEleName, isToggle] = targetParam;
                        let isUsing = false;

                        arr_targetCallback.push(
                            () => {
                                MissionCache.namedObj[targetEleName].forEach(transformerObj => {
                                    if (isToggle) {
                                        if (isUsing) transformerObj.updateCss({
                                            opacity: 1,
                                            pointerEvents: 'all',
                                        });
                                        else transformerObj.updateCss({
                                            opacity: 0,
                                            pointerEvents: 'none',
                                        });
                                    }
                                    else transformerObj.updateCss({
                                        opacity: 0,
                                        pointerEvents: 'none',
                                    });
                                });
                                isUsing = !isUsing;
                            }
                        );
                    }
                    break;


                // ----------------------------------------------------------------------------------------------


                case 'ActClickMove':
                    // console.log('ActClickMove', targetAction, targetParam);
                    {
                        const [targetEleName, x, y, rotate, isToggle] = targetParam;
                        let toggleState = true;

                        arr_targetCallback.push(
                            () => {
                                MissionCache.namedObj[targetEleName].forEach(transformerObj => {
                                    if (isToggle) {
                                        if (toggleState) transformerObj.update({ x: Number(x), y: Number(y), r: Number(rotate) });
                                        else transformerObj.restore();
                                    }
                                    else transformerObj.update({ x: Number(x), y: Number(y), r: Number(rotate) });
                                });
                                toggleState = !toggleState;
                            }
                        );
                    }
                    break;


                // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            }
        });
    },
};