function createInt8TypedArray(lenght, position, value) {
    const buffer = new ArrayBuffer(lenght);
    const view = new DataView(buffer);

    try {
        view.setInt8(position, value);
    } catch (error) {
        throw new Error('Position outside range');
    }

    return view;
}
export default createInt8TypedArray;
