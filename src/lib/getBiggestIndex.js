export default function getBiggestIndex(array) {
    if (array?.length) {
        var highest = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i]?.index) {
                if (array[i].index > highest) {
                    highest = array[i].index;
                }
            }
        }
        return highest;
    }
}