const markdownInput = document.querySelector("#markdown-input");
const htmlOutput = document.querySelector("#html-output");
const htmlPreview = document.querySelector("#preview");

function searchChar(string, char) {
    let result = string.length * -1;
    [...string].forEach((el, i) => {
        if (el == char && result == string.length * -1) {
            result = i;
        }

    });
    return result;

}

function convertMarkdown() {
    let markdownText = markdownInput.value;

    let markdownTextArray = markdownText.split("\n");

    markdownTextArray.forEach((el, i) => {
        let lineContent;
        let charIndex;

        if (el[0] == "#") {
            if (el[1] == " " && el[2]) {
                markdownTextArray[i] = "<h1>" + el.slice(2) + "</h1>";
            }
            else if (el[1] == "#") {
                if (el[2] == " " && el[3]) {
                    markdownTextArray[i] = "<h2>" + el.slice(3) + "</h2>";
                }
                else if (el[2] == "#" && el[3] == " " && el[4]) {
                    markdownTextArray[i] = "<h3>" + el.slice(4) + "</h3>"
                }
            }
        }
        if (el[0] == ">") {
            if (el[1] == " ") {
                markdownTextArray[i] = "<blockquote>" + el.slice(2) + "</blockquote>"
            }
        }
        if (searchChar(markdownTextArray[i], "*") >= 0 || searchChar(markdownTextArray[i], "_") >= 0) {
            let char = searchChar(markdownTextArray[i], "*") >= 0 ? "*" : "_"
            charIndex = searchChar(markdownTextArray[i], char);
            if (markdownTextArray[i][charIndex + 1] == char) {
                let textAfterChar = markdownTextArray[i].slice(charIndex + 2);
                if (searchChar(textAfterChar, char) >= 0) {
                    let secondCharIndex = searchChar(textAfterChar, char);
                    if (textAfterChar[secondCharIndex + 1] == char) {
                        markdownTextArray[i] = markdownTextArray[i].slice(0, charIndex) + "<strong>" + markdownTextArray[i].slice(charIndex + 2, secondCharIndex + charIndex + 2) + "</strong>" + markdownTextArray[i].slice(secondCharIndex + charIndex + 4);
                    }
                    else{
                        console.log("OK")
                        textAfterChar = textAfterChar.replace("*", "");
                        secondCharIndex = searchChar(textAfterChar, char);

                        if (textAfterChar[secondCharIndex + 1] == char) {
                            markdownTextArray[i] = markdownTextArray[i].slice(0, charIndex) + "<strong>" + markdownTextArray[i].slice(charIndex + 2, secondCharIndex + charIndex + 4) + "</strong>" + markdownTextArray[i].slice(secondCharIndex + charIndex + 6);
                        }
                    }
                }
            }
        }
        if (searchChar(markdownTextArray[i], "*") >= 0 || searchChar(markdownTextArray[i], "_") >= 0) {
            let char = searchChar(markdownTextArray[i], "*") >= 0 ? "*" : "_"
            charIndex = searchChar(markdownTextArray[i], char);
            if ((markdownTextArray[i][charIndex + 1] != char)) {
                let textAfterChar = markdownTextArray[i].slice(charIndex + 1);
                if (searchChar(textAfterChar, char) >= 0 && searchChar(textAfterChar, char) != -0) {
                    let secondCharIndex = searchChar(textAfterChar, char);
                    console.log(markdownTextArray[i]);
                    markdownTextArray[i] = markdownTextArray[i].slice(0, charIndex) + "<em>" + markdownTextArray[i].slice(charIndex + 1, secondCharIndex + charIndex + 1) + "</em>" + markdownTextArray[i].slice(secondCharIndex + charIndex + 2);
                }
            }
        }
        if (searchChar(markdownTextArray[i], "[") >= 0) {
            let charIndex = searchChar(markdownTextArray[i], "[");
            if (markdownTextArray[i][charIndex - 1] == "!" && searchChar(markdownTextArray[i], "]") > charIndex) {
                let alt = markdownTextArray[i].slice(charIndex + 1, searchChar(markdownTextArray[i], "]"));
                let secondCharIndex = searchChar(markdownTextArray[i], "(");
                if (secondCharIndex >= 0 && searchChar(markdownTextArray[i], ")") > secondCharIndex) {
                    let src = markdownTextArray[i].slice(secondCharIndex + 1, searchChar(markdownTextArray[i], ")"));
                    markdownTextArray[i] = markdownTextArray[i].slice(0, charIndex - 1) + '<img alt="' + alt + '" src="' + src + '">' + markdownTextArray[i].slice(searchChar(markdownTextArray[i], ")") + 1);
                }
            }
            else {
                console.log("Test")
                if (searchChar(markdownTextArray[i], "]") > charIndex) {
                    let text = markdownTextArray[i].slice(charIndex + 1, searchChar(markdownTextArray[i], "]"));
                    let secondCharIndex = searchChar(markdownTextArray[i], "(");
                    if (secondCharIndex >= 0 && searchChar(markdownTextArray[i], ")") > secondCharIndex) {
                        let url = markdownTextArray[i].slice(secondCharIndex + 1, searchChar(markdownTextArray[i], ")"));
                        markdownTextArray[i] = markdownTextArray[i].slice(0, charIndex) + '<a href="' + url + '">' + text + '</a>' + markdownTextArray[i].slice(searchChar(markdownTextArray[i], ")") + 1);
                    }
                }
            }
        }

    }
    );

    markdownText = markdownTextArray.join("\n");

    htmlOutput.textContent = markdownText;
    htmlPreview.innerHTML = markdownText;

    return markdownText;
}

markdownInput.addEventListener("input", convertMarkdown)