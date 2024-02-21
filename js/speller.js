export default {
    check,
    lookup,
};

var elements;
var symbols = {};
// { au : { "name": "Gold",...} }

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
    elements = await (await fetch("periodic-table.json")).json();
    for (let element of elements) {
        symbols[element.symbol.toLowerCase()] = element;
    }
}

function findCandidates3(inputWord) {
    var oneLetterSymbols = [];
    var twoLetterSymbols = [];

    for (let i = 0; i < inputWord.length; i++) {
        // collect one letter symbol options
        if (
            inputWord[i] in symbols &&
            !oneLetterSymbols.includes(inputWord[i])
        ) {
            oneLetterSymbols.push(inputWord[i]);
        }

        // collect two letter symbol options
        if (i <= inputWord.length - 2) {
            let two = inputWord.slice(i, i + 2);
            if (two in symbols && !twoLetterSymbols.includes(two)) {
                twoLetterSymbols.push(two);
            }
        }
    }

    return [...twoLetterSymbols, ...oneLetterSymbols];
}

function findCandidates(inputWord) {
    var oneLetterSymbols = [];
    var twoLetterSymbols = [];
    for (let i = 0; i < inputWord.length; i++) {
        // check if the single letter exist in symbols
        // and check for doubles: *Y* U C K *Y*
        // do not double add *Y*
        if (
            inputWord[i] in symbols &&
            !oneLetterSymbols.includes(inputWord[i])
        ) {
            oneLetterSymbols.push(inputWord[i]);
        }
        // stop one letter before end because
        // we are matching two at a time
        if (i <= inputWord.length - 2) {
            let two = inputWord.slice(i, i + 2);
            // same as above
            if (two in symbols && !twoLetterSymbols.includes(two)) {
                twoLetterSymbols.push(two);
            }
        }
    }
    // The order of the return matters because it determines
    // if one or two letter symbols are preferred
    // two letters preferred here
    return [...twoLetterSymbols, ...oneLetterSymbols];
}

function spellWord(candidates, charactersLeft) {
    console.log({ candidates });
    if (charactersLeft.length == 0) {
        return [];
    } else {
        if (charactersLeft.length >= 2) {
            let two = charactersLeft.slice(0, 2);
            let rest = charactersLeft.slice(2);
            // if match found
            if (candidates.includes(two)) {
                // more characters to match
                if (rest.length > 0) {
                    let result = [two, ...spellWord(candidates, rest)];
                    if (result.join("") == charactersLeft) {
                        return result;
                    }
                } else {
                    return [two];
                }
            }
        }
    }
    if (charactersLeft.length >= 1) {
        let one = charactersLeft[0];
        let rest = charactersLeft.slice(1);
        if (candidates.includes(one)) {
            if (rest.length > 0) {
                let result = [one, ...spellWord(candidates, rest)];
                if (result.join("") == charactersLeft) {
                    return result;
                }
            } else {
                return [one];
            }
        }
    }
    return [];
}

function check(inputWord) {
    var candidates = findCandidates(inputWord);
    return spellWord(candidates, inputWord);
}

function lookup(elementSymbol) {
    return symbols[elementSymbol];
}
