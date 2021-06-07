function UpdateTransition() {

    Array
        .from(document.querySelectorAll(`[id*="transition="]`))
        .forEach(transformElement => {
            // console.log('transformElement', transformElement);
            // console.log('transformElement.id', transformElement.id);

            const [transitionType, transitionTime] = transformElement.id.split('transition=')[1].split(',')[0].split('*');
            // console.log(transitionType, transitionTime);

            transformElement.style.transition = `all ${transitionTime}s ${transitionType}`;
        });
};