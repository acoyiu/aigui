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
        // console.log('params', tag, params);

        const [direction, minVal, maxVal] = params;

        // get the upper-most ele for drag
        const dragTarget = tag.children[tag.children.length - 1];
        // console.log('dragTarget', dragTarget);


        // remaining children
        let remainingChildren = Array.from(tag.children);
        remainingChildren.pop();
        remainingChildren = remainingChildren.map(el => new AiJs.Transformer(el));
        // console.log('remainingChildren', remainingChildren);


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

        let portion = coorY / remainingChildren.length;

        remainingChildren.forEach((chi, kindex) => {
            let indentDistance = kindex * portion;
            chi.update({ y: indentDistance });
        });
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
            if (params[0]) {
                AudioCache?.[params[0]]?.play();
            }

            winGroup.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinGroup(true);
            resetGame();
        }

        // // dev use
        // setTimeout(() => {
        //     showWin();
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


            arr_listenerRemover.forEach(func => func());
            arr_listenerRemover = [];


            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


            const dotsGroup = Array.from(lineGroup.children);
            console.log('dotsGroup', dotsGroup);


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

                // console.log('[cir1, cir2]', [cir1, cir2]);
                [cir1, cir2].forEach(currentCir => {

                    // console.log('currentCir', currentCir);

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







    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    DragSlot(tObj, tag, params) {
        console.log('tObj, tag, params', tObj, tag, params);

        let [dragGroup, winGroup] = Array.from(tag.children),
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
            if (params[0]) {
                AudioCache?.[params[0]]?.play();
            }

            winGroup.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinGroup(true);

        }

        // // dev use
        // setTimeout(() => {
        //     showWin();
        // }, 1000);


        // ==-=-=-=-=-=--=-=-=--


        let scoreOfDrag;
        function scorePlus() {
            scoreOfDrag--;
            console.log('scoreOfDrag', scoreOfDrag);
            if (scoreOfDrag <= 0) {
                showWin();
            }
        };


        const resetGame = () => new Promise(res => {

            console.log('dragGroup', dragGroup);

            const allDraggable = Array.from(dragGroup.children);

            scoreOfDrag = allDraggable.length;

            allDraggable.forEach(dGroup => {

                let [dragger, ansArea] = Array.from(dGroup.children);
                // console.log('ansArea, dragger', ansArea, dragger);

                if (dragger.nodeName === 'g') {
                    let tempTag = dragger.children[0],
                        parentTag = dragger.parentElement;
                    parentTag.removeChild(dragger);
                    dragger = tempTag;
                    parentTag.appendChild(dragger);

                }

                dragger.style.pointerEvents = 'all';
                dragger.style.opacity = 1;
                ansArea.style.opacity = 0;

                // =-=-=-=-=-=--=--=-=-=-=-=-=-=-=---===-=-=-

                new AiJs.Draggable(
                    new AiJs.Transformer(dragger), {
                    start(e, trans) {
                        trans.update({
                            sx: 1.5,
                            sy: 1.5
                        });
                    },
                    async end(e, trans, destroyer) {

                        trans.update({
                            sx: 1,
                            sy: 1
                        });

                        const isCorrect =
                            document
                                .elementsFromPoint(
                                    e.changedTouches[0].clientX,
                                    e.changedTouches[0].clientY,
                                )
                                .filter(el => el === ansArea)
                                .length > 0;

                        console.log('isCorrect', isCorrect);

                        if (isCorrect) {

                            ansArea.style.opacity = 1;

                            dragger.style.opacity = 0;
                            dragger.style.pointerEvents = 'none';

                            destroyer();

                            scorePlus();
                        }
                    },
                });
            });


            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

            res();
        });


        resetGame();
    },







    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    Mc(tObj, tag, params) {
        // console.log('tObj', tObj);
        // console.log('tag', tag);
        // console.log('params', params);

        // remove _ by split
        const allRelatedEle = Array
            .from(tag.querySelectorAll('[id^="Mc::"]'))
            .map(el => {
                el.id = el.id.split('_')[0];
                return el;
            })

        let [ansGroup, failPop, winPop] = Array.from(tag.children);

        console.log(failPop, winPop);


        // =-=-=-=-=-=-=-=-=-=-=-=-


        const winCrossButton = new AiJs.Button(
            allRelatedEle.find(el => el.id === 'Mc::SuccBackButton'),
            {
                scaleRatio: 0.9,
                center: 5,
                end: async () => {
                    await resetGame();
                    toggleWinPop(false);
                },
            });


        winPop = new AiJs.Transformer(winPop);

        async function toggleWinPop(boo) {
            if (boo) {
                winPop.transformElement.style.opacity = 1;
                winPop.transformElement.style.pointerEvents = 'all';
                await winPop.update({ sx: 1, sy: 1 });
                winCrossButton.disabled = false;
            } else {
                winCrossButton.disabled = true;
                winPop.transformElement.style.opacity = 0;
                winPop.transformElement.style.pointerEvents = 'none';
                await winPop.update({ sx: 0.9, sy: 0.9 });
            }
        }

        toggleWinPop(false);

        function showWinMc() {
            if (params[0]) {
                AudioCache?.[params[0]]?.play();
            }

            winPop.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinPop(true);
        }


        // // dev use
        // setTimeout(() => {
        //     showWinMc();
        // }, 1000);


        // =-=-=-=-=-=-=-=-=-=-=-=-


        const failCrossButton = new AiJs.Button(
            allRelatedEle.find(el => el.id === 'Mc::FailBackButton'),
            {
                scaleRatio: 0.9,
                center: 5,
                end: async () => {
                    await resetGame();
                    toggleFailPop(false);
                },
            });


        failPop = new AiJs.Transformer(failPop);

        async function toggleFailPop(boo) {
            if (boo) {
                failPop.transformElement.style.opacity = 1;
                failPop.transformElement.style.pointerEvents = 'all';
                await failPop.update({ sx: 1, sy: 1 });
                failCrossButton.disabled = false;
            } else {
                failCrossButton.disabled = true;
                failPop.transformElement.style.opacity = 0;
                failPop.transformElement.style.pointerEvents = 'none';
                await failPop.update({ sx: 0.9, sy: 0.9 });
            }
        }

        toggleFailPop(false);

        function showFailMc() {
            if (params[1]) {
                AudioCache?.[params[1]]?.play();
            }

            failPop.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleFailPop(true);
        }


        // // dev use
        // setTimeout(() => {
        //     showFailMc();
        // }, 1000);



        // =-=-=-=-=-=-=-=-=-=-=-=-

        // console.log('ansTranformeransTranformeransTranformeransTranformeransTranformer', ansTranformer);
        // const ansGroup = Array.from(ansTranformer.transformElement.children);

        let inited = false;

        const resetGame = async () => {

            // console.log('ansGroup', ansGroup);

            if (!inited) {
                Array.from(ansGroup.children).forEach(
                    el => {

                        const cBack = () => {
                            console.log('el.id', el.id);
                            if (el.id === 'Mc::Answer') {
                                // correct
                                console.log('correct');
                                showWinMc();
                            }
                            else {
                                // wrong
                                console.log('wrong');
                                showFailMc();
                            }
                        };

                        return new AiJs.Button(
                            el,
                            {
                                scaleRatio: 0.9,
                                center: 5,
                                start: el.nodeName !== 'image' ? cBack : undefined,
                                end: el.nodeName === 'image' ? cBack : undefined,
                            })
                    }
                );
                inited = true;
            }
        };
        resetGame();
    },









    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    Comparing(tObj, tag, params) {

        console.log('tObj', tObj);
        console.log('tag', tag);
        console.log('params', params);


        // remove _ by split
        const allRelatedEle = Array
            .from(tag.querySelectorAll('[id^="Comparing::"]'))
            .map(el => {
                el.id = el.id.split('_')[0];
                return el;
            })

        let [scoreG, pairingG, winPop] = Array.from(tag.children);

        console.log(scoreG, pairingG, winPop);


        // =-=-=-=-=-=-=-=-=-=-=-=-


        const winCrossButton = new AiJs.Button(
            allRelatedEle.find(el => el.id === 'Comparing::BackButton'),
            {
                scaleRatio: 0.9,
                center: 5,
                end: async () => {
                    await resetGame();
                    toggleWinPop(false);
                },
            });


        winPop = new AiJs.Transformer(winPop);

        async function toggleWinPop(boo) {
            if (boo) {
                winPop.transformElement.style.opacity = 1;
                winPop.transformElement.style.pointerEvents = 'all';
                await winPop.update({ sx: 1, sy: 1 });
                winCrossButton.disabled = false;
            } else {
                winCrossButton.disabled = true;
                winPop.transformElement.style.opacity = 0;
                winPop.transformElement.style.pointerEvents = 'none';
                await winPop.update({ sx: 0.9, sy: 0.9 });
            }
        }

        toggleWinPop(false);

        function showWinPair() {
            if (params[0]) {
                AudioCache?.[params[0]]?.play();
            }

            winPop.setTransition('all 0.8s cubic-bezier(0.49, 1.77, 0.62, 1.6)');
            toggleWinPop(true);
        }


        // // dev use
        // setTimeout(() => {
        //     showWinPair();
        // }, 1000);


        // =-=-=-=-=-=-=-=-=-=-=-=-


        let currentScore = 0;
        const
            addScore = () => {
                currentScore++;
                updateScoreView();
            },
            updateScoreView = () => {
                console.log('scoreG', scoreG);
                Array.from(scoreG.children).forEach((el, kindex) => {
                    if (kindex >= currentScore) {
                        // show
                        el.style.opacity = 0;
                    } else {
                        // hide
                        el.style.opacity = 1;
                    }
                });

                if (currentScore >= scoreG.children.length) {
                    showWinPair();
                }
            };


        let isInited = false;
        const resetGame = async () => {

            currentScore = 0;
            updateScoreView();


            Array
                .from(pairingG.children)
                .map(el => Array.from(el.children))
                .map(([ele1, ele2, ele3, ele4]) => {
                    // console.log('ele1, ele2, ele3, ele4', ele1, ele2, ele3, ele4);

                    [ele3, ele4].forEach(el => {
                        el.style.opacity = 0;
                        el.style.pointerEvents = 'none';
                    });

                    if (!isInited) {
                        [ele1, ele2].forEach(el => {
                            new AiJs.Button(
                                el,
                                {
                                    scaleRatio: 0.9,
                                    center: 5,
                                    end: async () => {
                                        [ele3, ele4].forEach(el => {
                                            el.style.opacity = 1;
                                        });

                                        addScore();
                                    },
                                });
                        });
                    };
                });
                
            isInited = true;
        }

        resetGame();
    },
};