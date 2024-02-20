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
    if (inputWord.length > 0) {
        for (let element of elements) {
            let symbol = element.symbol.toLowerCase();
            if (symbol.length <= inputWord.length) {
                // checking if the symbol matches the first
                // one or two characters of the inputWord
                if (inputWord.slice(0, symbol.length) == symbol) {
                    if (inputWord.length > symbol.length) {
                        // check if there's any characters left after a match.
                        let rest = check(inputWord.slice(symbol.length));
                        if (rest.length > 0) {
                            // the rest of the word had matching elements
                            // return current symbol & result
                            return [symbol, ...rest];
                        } else {
                            return [symbol];
                        }
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
