export default {
    check,
    lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
    elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
    // check if there are characters.
    // else return []
    if (inputWord.length > 0) {
        // go through all elements in JSON object
        for (let element of elements) {
            let symbol = element.symbol.toLowerCase();
            // if the symbol length is longer than inputWord -> skip
            if (symbol.length <= inputWord.length) {
                // if the symbol matches the first 1 or 2 letters
                if (inputWord.slice(0, symbol.length) == symbol) {
                    // if there are still letters left in inputWord
                    if (inputWord.length > symbol.length) {
                        // recurse for rest of word
                        let restOfWord = check(inputWord.slice(symbol.length));
                        // if more symbols are found
                        if (restOfWord.length > 0) {
                            return [symbol, ...restOfWord];
                        }
                    } else {
                        return [symbol];
                    }
                }
            }
        }
    }
    return [];
}

function lookup(elementSymbol) {
    for (let element of elements) {
        if (element.symbol.toLowerCase() == elementSymbol) {
            return element;
        }
    }
}
