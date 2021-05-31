function UpdateNav() {
    // console.log(MissionCache.navElements);

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

                    const targetPageNum = Number(actStr.split('(')[1].split(')')[0]);
                    // console.log('targetPageNum', targetPageNum);

                    window.changePageCallback.push(
                        (currentPageIndex, amountOfPages) => {
                            if (targetPageNum == currentPageIndex) {
                                switch (actStr.substring(0, 7)) {
                                    case 'NavHide':
                                        transformerObj.updateCss({
                                            opacity: 0,
                                            pointerEvents: 'none',
                                        });
                                        break;
                                    case 'NavShow':
                                        transformerObj.updateCss({
                                            opacity: 1,
                                            pointerEvents: 'all',
                                        });
                                        break;
                                }
                            }
                        }
                    );
                }
            );
        });
}