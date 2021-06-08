async function InitAnimation() {

    AiGUI.AllAnimatable = {};


    const allAnimate = Array.from(document.querySelectorAll('[id^="animate::"]'));
    // console.log('allAnimate', allAnimate);


    await Promise.all(allAnimate.map(async aniEle => {
        // console.log('aniEle', aniEle);


        const idStr = aniEle.id;
        // console.log('idStr', idStr);


        aniEle.style.pointerEvents = 'none';
        // console.log('aniEle', aniEle);
        // console.log(`aniEle.getAttribute('xlink:href')`, aniEle.getAttribute('xlink:href'));


        let [_, name, timePattern] = idStr.split('::');
        timePattern = Number(timePattern.split('=')[1]);
        // console.log('name, timePattern', name, timePattern);


        let timeOutObj,
            playTime = timePattern * 1000;
        const mainPlayer = await AiJs.Visual.UseStatedImg(
            aniEle,
            {
                play: [
                    aniEle.getAttribute('xlink:href'),
                    thisControl => {
                        clearTimeout(timeOutObj);
                        timeOutObj = setTimeout(
                            () => thisControl.hide(),
                            playTime
                        )
                    }
                ],
            }
        );
        mainPlayer.playTime = playTime;


        // stop animation
        (async () => {
            await new Promise(res => setTimeout(res, 50));
            mainPlayer.hide();
            await new Promise(res => requestAnimationFrame(res));
            mainPlayer.hide();
            await new Promise(res => setTimeout(res, 50));
            mainPlayer.hide();
            await new Promise(res => requestAnimationFrame(res));
            mainPlayer.hide();
        })();


        AiGUI.AllAnimatable[name] = mainPlayer;

        // console.warn('=-=-=-=-=-=-=-=-=-=-=-=-');
    }));


    // console.log('AllAnimatable', AiGUI.AllAnimatable);
}