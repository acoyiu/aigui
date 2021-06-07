function UpdateTransition(transformerTag) {

    // console.log('transformerTag', transformerTag);

    const [transitionType, transitionTime] = transformerTag.id.split('transition=')[1].split(',')[0].split('*')
    // console.log(transitionType, transitionTime);

    transformerTag.style.transition = `all ${transitionTime}s ${transitionType}`;
};