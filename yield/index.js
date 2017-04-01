'use strict'

const fs = require('fs')

function *fileIterator() {
    const files = fs.readdirSync('./samples/')
    for(let i = 0; i < files.length; i++) {
        yield files[i]
    }
}

const fileI = fileIterator()
let currentFile

do {
    currentFile = fileI.next()

    console.log(currentFile.value || "[EOF]")
} while (!currentFile.done)
