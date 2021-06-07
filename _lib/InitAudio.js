function InitAudio() {

    const allAudio =
        Array
            .from(document.querySelectorAll('[id^="audio::"]'))
            .map(ele => ele.id)
            .map(idStr => idStr.split('::'))
            .map(arr => { arr.shift(); return arr; })
            .map(([name, fileName]) => {
                return [
                    name,
                    `${window.targetPath}/sound/${fileName}`.replace(/.mp3(.*?)$/g, '.mp3')
                ];
            })

    window.AudioCache = {};

    return new Promise(async res => {

        await Promise.all(
            allAudio.map(async ([name, path]) => {
                // console.log(name, path);

                let returnValue;

                switch (name) {
                    case 'bgm':
                        returnValue = await AiJs.Audio.UseBgm(path);
                        break;
                    case 'basic':
                        returnValue = await AiJs.Audio.UseGlobalClickSound(path);
                        break;
                    default:
                        returnValue = await AiJs.Audio.UseNormalSound(path);
                        break;
                }

                window.AudioCache[name] = returnValue;
            })
        );

        // console.log('window.AudioCache', window.AudioCache);

        // try play bgm
        window?.AudioCache?.bgm?.play();

        res();
    });
};