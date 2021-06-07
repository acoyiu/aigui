async function InsertPageConfiguration() {

    let instruction = undefined,
        transitionMode = 'topDownScroll';


    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


    let aPages;


    window.AiGUI.PageConfiguration = (AllPages, currentPageIndex) => {

        if (!aPages) aPages = AllPages;

        if (!instruction) {
            instruction = Array
                .from(document.querySelectorAll('[id^="pageConfig"]'))
                .map(el => {
                    el = el.id.split('::');
                    el.shift();
                    return el;
                });
            // console.log(instruction);

            instruction.forEach(
                ([instruct, param]) => {
                    switch (instruct) {
                        case 'transitionMode':
                            transitionMode = param.split('_')[0];
                            break;
                        case 'transition':
                            let tStr = param.split('*').reverse();
                            tStr[0] += 's';
                            window.AiGUI.LaterPageTransition = 'all ' + tStr.join(' ');
                            break;
                    }
                }
            );
            // console.log('transitionMode', transitionMode);
        }



        switch (transitionMode) {

            // -----------------------------------------------------------------------------

            case 'topDownScroll':
            default:
                AllPages.forEach((pageG, rindex) => {
                    pageG.style.transform = `translateY(${rindex * 100 - currentPageIndex * 100}%)`;
                });
                break;

            // -----------------------------------------------------------------------------

            case 'fade':
                AllPages.forEach(pageG => {

                    if (MissionCache.allPages.indexOf(pageG) === currentPageIndex) {
                        pageG.style.opacity = 1;
                        pageG.style.pointerEvents = 'all';
                    }
                    else {
                        pageG.style.opacity = 0;
                        pageG.style.pointerEvents = 'none';
                    }
                });
                break;

            // -----------------------------------------------------------------------------

            case 'sharpFade':
                AllPages.forEach(pageG => {
                    pageG.style.transition = '';
                });
                AllPages.forEach(pageG => {

                    if (MissionCache.allPages.indexOf(pageG) === currentPageIndex) {
                        pageG.style.opacity = 1;
                        pageG.style.pointerEvents = 'all';
                    }
                    else {
                        pageG.style.opacity = 0;
                        pageG.style.pointerEvents = 'none';
                    }
                });
                break;

            // -----------------------------------------------------------------------------
        }
    };


    return () => {
        // setup page transition after first position update
        setTimeout(() => {
            aPages.forEach(pageTag => {
                pageTag.style.transition = window.AiGUI.LaterPageTransition;
            });
        }, 100);
    }
}
