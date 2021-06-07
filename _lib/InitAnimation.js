async function InitAnimation() {

    AiGUI.AllAnimatable = {};


    const allAnimate = Array.from(document.querySelectorAll('[id^="animate::"]'));
    // console.log('allAnimate', allAnimate);


    await Promise.all(allAnimate.map(async aniEle => {
        // console.log('aniEle', aniEle);


        const idStr = aniEle.id
        // console.log('idStr', idStr);


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
        setTimeout(() => {
            mainPlayer.hide();
            requestAnimationFrame(() => {
                mainPlayer.hide();
            });
        }, 50);


        AiGUI.AllAnimatable[name] = mainPlayer;
    }));


    // console.log('AllAnimatable', AiGUI.AllAnimatable);
}