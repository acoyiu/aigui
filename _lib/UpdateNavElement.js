{

    /**
     * 
     * @param {transformerObj} tObj 
     * @param {boolean} boo 
     */
    function updateVisibility(tObj, boo) {
        if (boo) {
            tObj.updateCss({
                opacity: 1,
                pointerEvents: 'all',
            });
        } else {
            tObj.updateCss({
                opacity: 0,
                pointerEvents: 'none',
            });
        }
    }


    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


    window.UpdateNavElement = async function () {

        window
            .AiGUI
            .AllInteractives
            .filter(inter => inter.transformElement.id.includes('Nav'))
            .map(el => {
                let attis = el.transformElement.id.split('::');
                attis.shift();
                attis.shift();
                attis = attis.filter(attr => attr.startsWith('Nav'));
                return [attis, el]
            })
            .forEach(([arr_navAction, transformerObj]) => {
                // console.log('arr_navAction, transformerObj', arr_navAction, transformerObj);

                arr_navAction.forEach(
                    actStr => {

                        // console.log('actStr', actStr);

                        const [actName, fullStr] = actStr.split('(');

                        const [targetPageNum, toRangeNum] = fullStr.split(')')[0].split(',').map(el => Number(el));
                        // console.log('targetPageNum', targetPageNum, toRangeNum);

                        window.AiGUI.ChangePageCallback.push(
                            (currentPageIndex, amountOfPages) => {

                                // console.log("actName", actName, targetPageNum, toRangeNum);
                                // console.log('current', currentPageIndex);

                                if (targetPageNum == currentPageIndex) {
                                    switch (actName) {
                                        case 'NavHideAt':
                                            updateVisibility(transformerObj, false);
                                            return;
                                        case 'NavShowAt':
                                            updateVisibility(transformerObj, true);
                                            return;
                                    }
                                }

                                if (actName === 'NavAtRange') {
                                    if (currentPageIndex >= targetPageNum && currentPageIndex <= toRangeNum) updateVisibility(transformerObj, true);
                                    else updateVisibility(transformerObj, false);
                                }
                            }
                        );
                    }
                );
            });



        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


        // playOn
        window
            .AiGUI
            .AllInteractives
            .filter(playsOn => playsOn.transformElement.id.includes('PlayOn'))
            .forEach(tObj => {

                const
                    tEle = tObj.transformElement,
                    pageContainer = tEle.closest('.pageContainer'),
                    actions = tEle.id.split('::').filter(txt => txt.startsWith('PlayOn'));
                    
                // console.log(tEle);
                // console.log('actions: ', actions);

                actions.forEach(actString => {
                    const paramOfAction = actString.split('(')[1]?.split(')')[0].split(',').filter(tx => tx).map(tx => Number(tx));
                    // console.log('paramOfAction', paramOfAction);

                    actString = actString.split('(')[0];
                    // console.log('actString: ', actString);

                    let pageChangeCallback;

                    switch (actString) {
                        case 'PlayOnShow':
                            pageChangeCallback = (currentPageIndex, amountOfPages) => {
                                updateVisibility(tObj, pageContainer?.classList.contains('activated') ? true : false);
                            }
                            break;
                        case 'PlayOnMove':
                            pageChangeCallback = (currentPageIndex, amountOfPages) => {
                                pageContainer?.classList.contains('activated')
                                    ? tObj.restore()
                                    : tObj.update({ x: paramOfAction[0], y: paramOfAction[1], r: paramOfAction[2] })
                            }
                            break;
                    };

                    // console.log('pageChangeCallback', pageChangeCallback);
                    if (pageChangeCallback) {
                        window.AiGUI.ChangePageCallback.push(pageChangeCallback);
                    }
                });
            });


    };
}