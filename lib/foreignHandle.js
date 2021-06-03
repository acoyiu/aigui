function ForeignHandle() {
    return new Promise(
        resolve => {

            const allForeign = Array.from(document.querySelectorAll('[id^="foreign"]'))
            console.log('allForeign', allForeign);

            allForeign.forEach(el => {

                const nameSpace = el.closest('svg').getAttribute('xmlns'),
                    containerG = document.createElementNS(nameSpace, 'g');

                el.parentElement.insertBefore(containerG, el);
                containerG.appendChild(el);

                containerG.id = el.id;
                el.id = '';

                el.style.opacity = 0;
                el.style.pointerEvents = 'none';

                // console.log(containerG.getBoundingClientRect());

                containerG.innerHTML += `
                    <foreignObject x="${el.getAttribute('x')}" y="${el.getAttribute('y')}" width="${el.getAttribute('width')}" height="${el.getAttribute('height')}">
                        <div class="forContainer" xmlns="http://www.w3.org/1999/xhtml">
                            <video autoplay loop muted playsinline>
                                <source src="./animation/movie-hevc.mov" type="video/mp4; codecs=&quot;hvc1&quot;">
                                <source src="./animation/movie-webm.webm" type="video/webm">
                            </video>
                        </div>
                    </foreignObject>
                `
            });

            resolve();
        }
    );
}