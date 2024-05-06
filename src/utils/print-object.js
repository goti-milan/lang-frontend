export function printObject(object, name) {
    let jsonString = JSON.stringify(object, null, 4);
    console.log(`${name} ${jsonString}`)
}