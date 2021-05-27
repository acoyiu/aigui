const GameSet = {

    init() {
        MissionCache.gameSet.forEach(transformerObj => {

            const rootOfGameSet = transformerObj.transformElement;
            console.log('rootOfGameSet', rootOfGameSet);


            const [gameName, ...params] = rootOfGameSet.id.split('GameSet(')[1].split(')')[0].split(',')
            console.log('gameName, ...params', gameName, ...params);


            // No game set name is set.
            if (!this[gameName]) {
                alert('No game set name is set.');
                throw new Error('No game set name is set.');
            }


            this[gameName](transformerObj, transformerObj.transformElement.children[0], params);
        });
    },


    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    RadiationDrag(tObj, tag, params) {
        console.log('params', tag, params);


        // get the upper-most ele for drag
        const dragTarget = tag.children[tag.children.length - 1];
        console.log('dragTarget', dragTarget);
    },
};