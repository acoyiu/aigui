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
            winCrossButton = new AiJs.Button(
                winGroup.children[winGroup.children.length - 1],
                {
                    scaleRatio: 0.9,
                    center: 5,
                    end: async () => {
                        await resetGame();
                        toggleWinGroup(false);
                    },
                });

        winGroup = new AiJs.Transformer(winGroup);

        async function toggleWinGroup(boo) {
            if (boo) {
                winGroup.transformElement.style.opacity = 1;
                winGroup.transformElement.style.pointerEvents = 'all';
                await winGroup.update({ sx: 1, sy: 1 });
                winCrossButton.disabled = false;
            } else {
                winCrossButton.disabled = true;
                winGroup.transformElement.style.opacity = 0;
                winGroup.transformElement.style.pointerEvents = 'none';
                await winGroup.update({ sx: 0.9, sy: 0.9 });
            }
        }

        toggleWinGroup(false);

        function showWin() {
            winGroup.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinGroup(true);
            resetGame();
        }

        // // dev use
        // setTimeout(() => {
        //     showWin();
        //     // showLose();
        // }, 1000);

        let score;
        function scored() {
            score--;
            if (score <= 0) {
                showWin();
            }
        }

        let arr_listenerRemover = [];

        const resetGame = () => new Promise(res => {
            console.log('reset game');


            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


            arr_listenerRemover.forEach(ƒ => ƒ());
            arr_listenerRemover = [];


            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


            const dotsGroup = Array.from(lineGroup.children);
            console.warn('dotsGroup', dotsGroup);


            score = dotsGroup.length;


            Array.from(lineGroup.querySelectorAll('polyline')).forEach(el => {
                el.parentElement.removeChild(el);
            });


            const allCircle = lineGroup.querySelectorAll('circle');
            allCircle.forEach(el => {
                el.style.pointerEvents = 'all';
            });


            const lineControl = [];
            dotsGroup.forEach(gTag => {

                const lineDrawer = new AiJs.LineDrawer(
                    gTag,
                    {
                        stroke: 'black',
                        strokeWidth: 3,
                        fill: 'none'
                    }
                );

                // console.log('lineDrawer', lineDrawer);

                lineControl.push(lineDrawer);

                const [cir1, cir2] = Array.from(gTag.children);

                // console.warn('[cir1, cir2]', [cir1, cir2]);
                [cir1, cir2].forEach(currentCir => {

                    // console.warn('currentCir', currentCir);

                    const tStart = e => {
                        let [x, y] = [
                            currentCir.getAttribute('cx'),
                            currentCir.getAttribute('cy'),
                        ].map(el => Number(el));

                        lineDrawer.addPoint([x, y]);
                        lineDrawer.current([x, y]);
                    };
                    currentCir.addEventListener('touchstart', tStart);

                    // ][][][][]][][][][]][][][][]][][][][]][][][][]][][][][]][][][][]

                    const tMove = e => {
                        // if (lineDrawer.pathTag.style.opacity == 0)
                        //     lineDrawer.pathTag.style.opacity = 1;

                        let [x, y] = AiJs.Library.GetSvgCoorByViewboxPos(MissionCache.svgRootTag, [e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
                        lineDrawer.current([x, y]);
                    };
                    currentCir.addEventListener('touchmove', tMove);

                    // ][][][][]][][][][]][][][][]][][][][]][][][][]][][][][]][][][][]

                    const tEnd = e => {
                        let stackedEles = document.elementsFromPoint(
                            e.changedTouches[0].clientX,
                            e.changedTouches[0].clientY,
                        );

                        console.log('stackedEles', stackedEles);

                        const checkingCircle = currentCir === cir1 ? cir2 : cir1;

                        stackedEles = stackedEles.filter(el => el === checkingCircle);

                        if (stackedEles.length < 1) {
                            while (lineDrawer.getArr().length > 0) {
                                lineDrawer.pop();
                            }
                        }
                        else {
                            setTimeout(() => {
                                lineDrawer.addPoint([checkingCircle.getAttribute('cx'), checkingCircle.getAttribute('cy')]);
                                lineDrawer.current([checkingCircle.getAttribute('cx'), checkingCircle.getAttribute('cy')]);
                            }, 100);

                            currentCir.removeEventListener('touchstart', tStart);
                            currentCir.removeEventListener('touchmove', tMove);
                            currentCir.removeEventListener('touchend', tEnd);

                            [cir1, cir2].forEach(el => el.style.pointerEvents = 'none');

                            scored();
                        }
                    };
                    currentCir.addEventListener('touchend', tEnd);


                    arr_listenerRemover.push(
                        () => {
                            currentCir.removeEventListener('touchstart', tStart);
                            currentCir.removeEventListener('touchmove', tMove);
                            currentCir.removeEventListener('touchend', tEnd);
                        }
                    );
                });
            });

            console.log('arr_listenerRemover', arr_listenerRemover);
            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


            res();
        });

        resetGame();

        // // dev use
        // setTimeout(() => {
        //     resetGame();
        // }, 5000);
    },
};