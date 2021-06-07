async function PreloadImage() {

    // preload image
    if (document.querySelector('image')) {
        await new Promise(res => {
            AiJs
                .Library
                .LoadImageSrc(
                    AiGUI.SvgRootTag,
                    {
                        xLinked: true,
                        removeSrc: true,
                        loadedNum: per => { if (per > 0.95) res(); }
                    }
                );
        });
    }
};