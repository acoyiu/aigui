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
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
                start: () => {
                    remainingChildren.forEach(el => el.transformElement.style.transition = '');
                },
                move: (_, dragIns) => {
                    console.log(dragIns);
                    direction === 'horizontal'
                        ? this.updateHorizon(remainingChildren, dragIns.coorX)
                        : this.updateVertical(remainingChildren, dragIns.coorY);
                },
                end: (_, dragIns) => {
                    console.log(dragIns);
                    remainingChildren.forEach(el => el.transformElement.style.transition = 'all 0.2s ease');
                    direction === 'horizontal'
                        ? this.updateHorizon(remainingChildren, dragIns.coorX)
                        : this.updateVertical(remainingChildren, dragIns.coorY);
                },
            }
        );
    },
    updateHorizon(remainingChildren, coorX) {

        let portion = coorX / remainingChildren.length;

        remainingChildren.forEach((chi, kindex) => {
            let indentDistance = kindex * portion;
            chi.update({ x: indentDistance });
        });
    },
    updateVertical(coorY) {
        // console.log(coorY, minVal, rangeOfDiff);
    },






    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    ConnectLine(tObj, tag, params) {
        console.log('tObj, tag, params', tObj, tag, params);

        let [lineGroup, winGroup] = Array.from(tag.children),
            crossButton = new AiJs.Button(
                winGroup.children[winGroup.children.length - 1],
                {
                    scaleRatio: 0.9,
                    center: 5,
                    end: () => {
                        toggleWinGroup(false);
                        resetGame();
                    },
                });

        winGroup = new AiJs.Transformer(winGroup);

        async function toggleWinGroup(boo) {
            if (boo) {
                winGroup.transformElement.style.opacity = 1;
                winGroup.transformElement.style.pointerEvents = 'all';
                await winGroup.update({ sx: 1, sy: 1 });
                crossButton.disabled = false;

            } else {
                crossButton.disabled = true;
                winGroup.transformElement.style.opacity = 0;
                winGroup.transformElement.style.pointerEvents = 'none';
                await winGroup.update({ sx: 0.9, sy: 0.9 });
            }
        }

        toggleWinGroup(false);

        // dev use
        setTimeout(() => {
            winGroup.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinGroup(true);
        }, 1000);


        async function resetGame() { 

        }


        lineGroup
    },
};