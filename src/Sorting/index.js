import React, { Component } from 'react';
import { getQuickSortAnimations } from './Algorithms/QuickSort';
import { getBubbleSortAnimations } from './Algorithms/BubbleSort';
import { getInsertionSortAnimations } from './Algorithms/InsertionSort';
import { getMergeSortAnimations } from './Algorithms/MergeSort';
import { getSelectionSortAnimations } from './Algorithms/SelectionSort';
import './index.css';

const ANIMATION_SPEED_MS = 5;

const NUMBER_OF_ARRAY_BARS = 65;
const MAX_HEIGHT_OF_ARRAY_BARS = 100;
const MIN_HEIGHT_OF_ARRAY_BARS = 1;

const SORT_TYPES = ['Quick', 'Bubble', 'Merge', 'Insertion', 'Selection', 'Heap', 'Radix', 'Bucket'];

const PRIMARY_COLOR = 'MediumSpringGreen';
const SECONDARY_COLOR = 'crimson';
const TERTIARY_COLOR = 'Tomato';
const QUATERNARY_COLOR = 'red';

class Sorting extends Component {
    constructor(){
        super();
        this.state = {
            quick: [],
            bubble: [],
            merge: [],
            insertion: [],
            selection: [],
            heap: [],
            radix: [],
            bucket: []
        };
        this.durations = [];
        this.rank =0;
    }

    componentDidMount(){
        this.randomizeArray();
    }

    randomizeArray(){
        this.resetColors();
        this.resetBadges();
        var array = [];
        for (let i = 0;i < NUMBER_OF_ARRAY_BARS;i++) {
            // array.push(200 + 10 * i); //pushing sorted increasing array
            // array.push(500 - 5 * i); //pushing sorted decreasing array
            array.push(Math.floor(Math.random() * MAX_HEIGHT_OF_ARRAY_BARS + MIN_HEIGHT_OF_ARRAY_BARS)); //random array
        }
        this.setState({quick: array, bubble: array, merge: array, insertion: array, selection: array, heap: array, radix: array, bucket: array});
    }

    resetColors(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    resetBadges(){
        this.rank = 0;
        for(let i = 0; i < SORT_TYPES.length; i++){
            document.getElementById("info-"+SORT_TYPES[i].toLowerCase()).innerHTML = "";
        }
    }

    enableButtons(){
        document.getElementById("start-button").disabled = false;
        document.getElementById("rand-button").disabled = false;
    }

    disableButtons(){
        document.getElementById("start-button").disabled = true;
        document.getElementById("rand-button").disabled = true;
    }

    startSorting(){
        this.disableButtons();
        this.quickSort();
        this.bubbleSort();
        this.mergeSort();
        this.insertionSort();
        this.selectionSort();
        // this.heapSort();
        // this.radixSort();
        // this.bucketSort();
    }

    quickSort(){
        const animations = getQuickSortAnimations(this.state.quick);
        this.sortHelper(animations,"Quick");
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.bubble);
        this.sortHelper(animations,"Bubble");
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.merge);
        this.sortHelper(animations,"Merge");
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.insertion);
        this.sortHelper(animations,"Insertion");
    }

    selectionSort(){
        const animations = getSelectionSortAnimations(this.state.selection);
        this.sortHelper(animations,"Selection");
    }

    sortHelper(animations, type){
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar '+type.toLowerCase());
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length + 100);
        const arrayBars = document.getElementsByClassName('array-bar '+type.toLowerCase());
        for(let i = 0; i < arrayBars.length; i++){
            setTimeout(() => arrayBars[i].style.backgroundColor = TERTIARY_COLOR, RESTORE_TIME);
        }
        // setTimeout(() => this.durations.push({type: type, time: RESTORE_TIME-100}), RESTORE_TIME-100);
        // update badge
        // this.setState({array: sortArray})
        setTimeout(() => { var badge = (this.rank === 0)?'warning':((this.rank === 1)?'secondary':(this.rank === 2)? 'black': 'white'); document.getElementById("info-"+type.toLowerCase()).innerHTML = "<sup><i class='fa fa-star text-"+badge+"' ></i></sup>"; this.rank++; if(this.rank===5){this.enableButtons();}   }, RESTORE_TIME-100);
        console.log(type + " Sort: Completed in "+(RESTORE_TIME-100)+" ms");
    }

    render(){
        const quick = this.state.quick;
        const bubble = this.state.bubble;
        const merge = this.state.merge;
        const insertion = this.state.insertion;
        const selection = this.state.selection;
        const heap = this.state.heap;
        const radix = this.state.radix;
        const bucket = this.state.bucket;
        return (
            // Quick Sort.
            // Bubble Sort.
            // Merge Sort.
            // Insertion Sort.
            // Selection Sort.
            // Heap Sort.
            // Radix Sort.
            // Bucket Sort.
            <div className="container-fluid">
                <div className="row align-items-center bg-dark p-2">
                    <div className="col-md-8">
                        <h4 className="text-white text-md-left text-center" >SA Visualizer</h4>
                        <small className="d-block text-white text-md-left text-center py-2" >Developed with &hearts; by Tirtharaj Ghosh</small>
                    </div>
                    <div className="col-md-4 text-center">
                        <button id="rand-button" className="btn btn-primary" onClick={ () => this.randomizeArray()}> <i className="fa fa-refresh"></i> Randomize</button>
                        &nbsp;
                        <button id="start-button" className="btn btn-success" onClick={ () => this.startSorting()}> <i className="fa fa-play"></i> Start</button>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="array-container" >
                            {quick.map((value, id) => (
                                <div
                                    className="array-bar quick"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Quick Sort <span id="info-quick"></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="array-container" >
                            {bubble.map((value, id) => (
                                <div
                                    className="array-bar bubble"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Bubble Sort <span id="info-bubble"></span>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="array-container" >
                            {merge.map((value, id) => (
                                <div
                                    className="array-bar merge"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Merge Sort <span id="info-merge"></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="array-container" >
                            {insertion.map((value, id) => (
                                <div
                                    className="array-bar insertion"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Insertion Sort <span id="info-insertion"></span>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="array-container" >
                            {selection.map((value, id) => (
                                <div
                                    className="array-bar selection"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Selection Sort <span id="info-selection"></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="array-container" >
                            {heap.map((value, id) => (
                                <div
                                    className="array-bar heap"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Heap Sort <span id="info-heap"></span>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="array-container" >
                            {radix.map((value, id) => (
                                <div
                                    className="array-bar radix"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Radix Sort <span id="info-radix"></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="array-container" >
                            {bucket.map((value, id) => (
                                <div
                                    className="array-bar bucket"
                                    key={id}
                                    style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-center">
                            Bucket Sort <span id="info-bucket"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sorting;
