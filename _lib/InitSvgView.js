async function InitSvgView() {

    let isHorizontal = true;
    if (window.location.search.includes('vertical=true'))
        isHorizontal = false;

    AiGUI.SvgRootTag = document.querySelector('svg');
    AiGUI.TheView = new AiJs.View(
        AiGUI.SvgRootTag,
        {
            isMobile: true,
            isHorizontal,
        }
    );
}