export const findSelectedWordClassName = (selectedAllWords, selectedWords, p) => {
    const isSelected = selectedAllWords.find((selectedWord) =>
        selectedWord.index === p.index &&
        selectedWord.length === p.length);
    if (isSelected)
        return "word-disabled"
    return !!selectedWords.find(
        (selectedWord) =>
            selectedWord.index === p.index &&
            selectedWord.length === p.length
    ) && "word-selected"
}

export const findWordClassName = (selectedAllWords, selectedWords, p) => {
    const isSelected = !!selectedWords.find(
        (selectedWord) =>
            selectedWord.index === p.index &&
            selectedWord.length === p.length
    )
    if (isSelected)
        return "word-selected"
    return selectedAllWords.find((selectedWord) =>
        selectedWord.index === p.index &&
        selectedWord.length === p.length) && "word-disabled"
}