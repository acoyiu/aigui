async function InitSvgView() {
    AiGUI.SvgRootTag = document.querySelector('svg');
    AiGUI.TheView = new AiJs.View(
        AiGUI.SvgRootTag,
        {
            isMobile: true,
            isHorizontal: true,
        }
    );
}