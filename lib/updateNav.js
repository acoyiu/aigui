function UpdateNav() {
    // console.log(MissionCache.navElements);

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

    MissionCache
        .navElements
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

                    // console.warn('actStr', actStr);

                    const [actName, fullStr] = actStr.split('(');

                    const [targetPageNum, toRangeNum] = fullStr.split(')')[0].split(',').map(el => Number(el));
                    // console.warn('targetPageNum', targetPageNum, toRangeNum);

                    window.changePageCallback.push(
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
}