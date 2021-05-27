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
        console.warn('params', tag, params);

        const [direction, minVal, maxVal] = params;

        // get the upper-most ele for drag
        const dragTarget = tag.children[tag.children.length - 1];
        console.log('dragTarget', dragTarget);


        // remaining children
        let remainingChildren = Array.from(tag.children);
        remainingChildren.pop();
        remainingChildren = remainingChildren.map(el => new AiJs.Transformer(el));
        console.log('remainingChildren', remainingChildren);


        const limits = [Number(minVal), Number(maxVal)];
        new AiJs.DraggableInertia(
            dragTarget,
            {
                direction,
                limitX: direction === 'horizontal' ? limits : undefined,
                limitY: direction === 'vertical' ? limits : undefined,
                bouncingEffect: false,
                move: (_, dragIns) => {
                    console.log(dragIns);
                    // direction === 'horizontal'
                    //     ? this.updateHorizon(dragIns.coorX, limits[0], limits[1] - limits[0])
                    //     : this.updateVertical(dragIns.coorY, limits[0], limits[1] - limits[0]);
                }
            }
        );
    },
    updateHorizon(coorX, minVal, rangeOfDiff) {
        // console.log('coorX', coorX);
        // remainingChildren.forEach(chi => {
        //     const tarValue = 
        // });
    },
    updateVertical(coorY, minVal, rangeOfDiff) {
        console.log('coorY', coorY);
    },
};