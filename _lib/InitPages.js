async function InitPages() {

    const allPages =
        Array
            .from(document.querySelectorAll('[id^="Page"]'))
            .filter(page => page.style.display != 'none' && page.getAttribute('display') != 'none')
            .map(pageTag => {
                pageTag.classList.add('pageContainer');
                pageTag.id = pageTag.id.split('_')[0];
                return pageTag;
            })
            .sort((a, b) => {
                return a.id.split('@')[1] - b.id.split('@')[1];
            });


    let currentPageIndex = -1;


    const updatePageByIndex = () => window.AiGUI.PageConfiguration(allPages, currentPageIndex);


    window.AiGUI.ChangePageCallback = [];

    window.AiGUI.ChangePage = toNext => {
        // console.log('toNext', toNext);

        if (typeof toNext === 'boolean') {
            toNext
                ? currentPageIndex++
                : currentPageIndex--;
        }
        else if (typeof toNext === 'number') {
            currentPageIndex = toNext;
        }

        updatePageByIndex();

        allPages.forEach((pageTag, pageIndex) => {
            if (pageIndex === currentPageIndex) {
                pageTag.classList.add('activated');
                pageTag.classList.remove('deactivated');
            } else {
                pageTag.classList.add('deactivated');
                pageTag.classList.remove('activated');
            }
        });

        // console.log('AiGUI.ChangePageCallback', AiGUI.ChangePageCallback);
        AiGUI.ChangePageCallback.forEach(func => func(currentPageIndex, allPages.length));
    };
}