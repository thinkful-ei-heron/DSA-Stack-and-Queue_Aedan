const node = require('./_Node');

class stack {
    constructor() {
        this.top = null;
    }

    push(value) {
        this.top = new node(value, this.top);
    }

    pop() {
        let oldTop = this.top;
        this.top = this.top.next;
        return oldTop.value;
    }
}

const peek = function (stk) {
    if(stk.top === null) return null;
    return stk.top.value;
};

const isEmpty = function (stk) {
    return stk.top === null;
};

const display = function (stk) {
    console.log(peek(stk));
};

const is_palindrome = function (str) {
    str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    let pStack = new stack();
    for (let i = 0; i < str.length; i++) {
        pStack.push(str.charAt(i));
    }

    for (let i = 0; i < str.length; i++) {
        if (pStack.pop() !== str.charAt(i)) {
            return false;
        }
    }
    return true;
};

const matching = function(str) {
    let held = new stack();

    for(let i = 0; i < str.length; i ++) {
        let top = peek(held);
        let matching = null;

        switch(str.charAt(i)) {
            case "'":
            case '"':
                if(top !== "'" || top !== '"') held.push(str.charAt(i));
                else if(top === str.charAt(i)) held.pop();
                break;
            case '{':
            case '(':
            case '[': 
                held.push(str.charAt(i));
                break;
            case '}': 
                matching = '{';
                break;
            case ')': 
                matching = '(';
                break;
            case ']':
                matching = '[';
                break;
        }

        if(matching) {
            if(matching === top) held.pop();
            else  {
                switch(top) {
                    case '{': 
                        matching = '}';
                        break;
                    case '(':
                        matching = ')';
                        break;
                    case '[':
                        matching = ']';
                        break;
                }
                return `Missing "${matching}" before location ${i}, "${str.charAt(i)}"`;
            }
        } 
    }

    if(!isEmpty(held)) {
        return `No closing ${held.pop()}`;
    }

    return true;
};


const sortStack = function (stk) {
    let sortedStack = new stack();

    sortedStack.push(stk.pop());

    while(!isEmpty(stk)) {
        let currentItem = stk.pop();
        while(currentItem > peek(sortedStack) && peek(sortedStack) !== null) {
            stk.push(sortedStack.pop());
        }
        sortedStack.push(currentItem);
    }

    return sortedStack;
};


// 8. queue implementation using a stack.

const stackQueue = function(value, stk) {
    let bufferStack = new stack();

    while(!isEmpty(stk)) {
        bufferStack.push(stk.pop());
    }

    stk.push(value);
    while(!isEmpty(bufferStack)) {
        stk.push(bufferStack.pop());
    }

    return stk;
}


function main() {
    let starTrek = new stack();

    starTrek.push('Kirk');
    starTrek.push('Spock');
    starTrek.push('McCoy');
    starTrek.push('Scotty');

    console.log('Top of stack => ');
    display(starTrek);
    
    console.log('');
    console.log('');

    console.log('Pop! ' + starTrek.pop());
    
    console.log('');
    console.log('');

    console.log('Top of stack => ');
    display(starTrek);

    console.log('');
    console.log('');

    console.log(is_palindrome('dad'));
    console.log(is_palindrome('A man, a plan, a canal: Panama'));
    console.log(is_palindrome('1001'));
    console.log(is_palindrome('Tauhida'));
    
    console.log('');
    console.log('');

    console.log(matching('{[(x + 1) * 2] * y * z = 1234'));
    console.log(matching('{[(x + 1 * 2] * y} * z = 1234'));
    console.log(matching('{[(x + 1) * 2] * y} * z = 1234'));
    console.log(matching('"Missing quote'));
    
    console.log('');
    console.log('');


    let dataArr = [4, 1, 3, -8, 7, 0, 123, 4];
    let unsorted = new stack();
    dataArr.forEach(item => {
        unsorted.push(item);
    });
    console.log('Sorting through stack of "4, 1, 3, -8, 7, 0, 123, 4"');
    let sorted = sortStack(unsorted);
    console.log('Smallest');
    while(!isEmpty(sorted)) {
        console.log(sorted.pop());
    }
    console.log('Largest');


    console.log('');
    console.log('');




}

main();