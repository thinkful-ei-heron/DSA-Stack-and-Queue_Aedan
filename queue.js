const node = require('./_Node');

class queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(value) {
        let newLast = new node(value, null);
        if (this.last !== null) {
            this.last.next = newLast;
            this.last = newLast;
        } else {
            this.last = newLast;
            this.first = this.last;
        }
    }

    dequeue() {
        if (this.first !== null) {
            let oldFirst = this.first;
            this.first = this.first.next;
            if(this.first === null) this.last = this.first;
            return oldFirst.value;
        }

    }
}

const peek = function (qu) {
    if (qu.first === null) return null;
    return qu.first.value;
};

const isEmpty = function (qu) {
    return qu.first === null;
};

const display = function (qu) {
    if (qu.first === null) return null;
    console.log(`First: ${qu.first.value}, Last: ${qu.last.value}`);
};

const pairOff = function (str, mQ, fQ) {
    if (str.charAt(0) === 'M') {
        mQ.enqueue(str);
    } else {
        fQ.enqueue(str);
    }

    if (!isEmpty(mQ) && !isEmpty(fQ)) {
        console.log(`F dancer is ${fQ.dequeue()}, and the M dancer is ${mQ.dequeue()}`);
    }
};

const banker = function(qu) {
    while(!isEmpty(qu)) {
        console.log(peek(qu) + ' is talking with the banker.');
        let d4 = Math.floor(Math.random() * 4);
        if(d4 === 0) {
            console.log('But they failed to fill out proper paperwork and have to go to the back of the line.');
            qu.enqueue(qu.dequeue());
        }else  {
            console.log(peek(qu) + ' left the bank.');
            qu.dequeue();
        }
        console.log(' '); 
    }
};


function main() {
    let starTrekQ = new queue();

    starTrekQ.enqueue('Kirk');
    starTrekQ.enqueue('Spock');
    starTrekQ.enqueue('Uhura');
    starTrekQ.enqueue('Sulu');
    starTrekQ.enqueue('Checkov');
    
    display(starTrekQ);

    console.log('');
    console.log('');

    console.log('Removing first two from queue');
    console.log('Dequeueing ' + starTrekQ.dequeue());
    console.log('Dequeueing ' + starTrekQ.dequeue());
    display(starTrekQ);

    console.log('');
    console.log('');

    banker(starTrekQ);

    console.log('');
    console.log('');


    let mQ = new queue();
    let fQ = new queue();

    let dancers = [
        'F Jane',
        'M Frank',
        'M John',
        'M Sherlock',
        'F Madonna',
        'M David',
        'M Christopher',
        'F Beyonce'];

    dancers.forEach(dancer => {
        pairOff(dancer, mQ, fQ);
    });
}

main();