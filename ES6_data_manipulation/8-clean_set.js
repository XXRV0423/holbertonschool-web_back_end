function celanSet(set, startString) {
    if (!startingString) {
        return '';
    }

    const result = [];
    set.forEach((value) => {
        if (value.startsWith(startString)) {
            result.push(value.slice(startString.length));
        }
    });

    return result.join('-');
}

export default cleanSet;
