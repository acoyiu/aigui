{
    window.InitAction = async function () {
        window
            .AiGUI
            .AllInteractives
            .filter(inter => inter.transformElement.id.includes('Act'))
            .forEach(inter => caseAct(inter));
    }


    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################


    function caseAct(tObj) {

        const namedObj = window.AiGUI.AllNamedObj;

        const tag = tObj.transformElement;
        // console.log('tag', tag);


        let arr_targetCallback = [
            /* sample of callback registration */
            // AiJsButtonInstance => console.log('clicked')
        ];


        tag.nodeName === 'image'
            ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => arr_targetCallback.forEach(func => func()) })
            : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => arr_targetCallback.forEach(func => func()) });


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
                    // console.log('ActClickShow', targetAction, targetParam);
                    {
                        const [targetEleName, isToggle] = targetParam;
                        let isShown = false;

                        arr_targetCallback.push(
                            () => {
                                // console.log(namedObj);
                                // console.log(targetEleName);
                                try {
                                    namedObj[targetEleName].forEach(transformerObj => {
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
                                namedObj[targetEleName].forEach(transformerObj => {
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
                                namedObj[targetEleName].forEach(transformerObj => {
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


                // ----------------------------------------------------------------------------------------------


                case 'ActClickSound':
                    // console.log('ActClickMove', targetAction, targetParam);
                    {
                        const [nameOfAudio] = targetParam;

                        arr_targetCallback.push(
                            () => {
                                // console.log('nameOfAudio', nameOfAudio);

                                // try play bgm
                                window?.AudioCache?.[nameOfAudio]?.play();
                            }
                        );
                    }
                    break;


                // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            }
        });
    }
}

























































































































































const MissionContentaweg3oug8 = {


    UpdateAction() {

        // console.log('allInteractive', MissionCache.allInteractive);
        // console.log('actElement', MissionCache.actElement);
        // console.log('pageChanger', MissionCache.pageChanger);
        // console.log('namedObj', namedObj);

        MissionCache.actElement.forEach(actEle => MissionContent.Act(actEle));
        MissionCache.pageChanger.forEach(pageEle => MissionContent.Page(pageEle));
    },




    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################
    Page: tObj => {

    },





    // ################################################################################################################################################################
    // ################################################################################################################################################################
    // ################################################################################################################################################################
    Act: tObj => {

        const tag = tObj.transformElement;
        // console.log('tag', tag);

        let arr_targetCallback = [
            // AiJsButtonInstance => {
            //     // console.log('clicked');
            // }
        ];

        tag.nodeName === 'image'
            ? new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, end: () => arr_targetCallback.forEach(func => func()) })
            : new AiJs.Button(tag, { scaleRatio: 0.9, center: 5, start: () => arr_targetCallback.forEach(func => func()) });


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
                    // console.log('ActClickShow', targetAction, targetParam);
                    {
                        const [targetEleName, isToggle] = targetParam;
                        let isShown = false;

                        arr_targetCallback.push(
                            () => {
                                // console.log(namedObj);
                                // console.log(targetEleName);
                                try {
                                    namedObj[targetEleName].forEach(transformerObj => {
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
                                namedObj[targetEleName].forEach(transformerObj => {
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
                                namedObj[targetEleName].forEach(transformerObj => {
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


                // ----------------------------------------------------------------------------------------------


                case 'ActClickSound':
                    // console.log('ActClickMove', targetAction, targetParam);
                    {
                        const [nameOfAudio] = targetParam;

                        arr_targetCallback.push(
                            () => {
                                // console.log('nameOfAudio', nameOfAudio);

                                // try play bgm
                                window?.AudioCache?.[nameOfAudio]?.play();
                            }
                        );
                    }
                    break;


                // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            }
        });
    },
};