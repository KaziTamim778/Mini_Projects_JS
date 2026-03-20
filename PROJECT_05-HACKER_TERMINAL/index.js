let hacker = document.querySelector('.hacker')

function hackerDotGen(node, numDot = 5, time = 250) {
    let addCount = 0, removeCount = numDot;
    let interval = setInterval(() => {
        if (addCount < numDot) {
            node.textContent += '.'
            addCount++
            if (addCount === numDot) {
                removeCount = numDot;
            }
        } else {
            node.textContent = node.textContent.slice(0, -1)
            removeCount--
        }
    }, time);
    return interval;
}
function RandomMessage(parentNode, message) {
    return new Promise((resolve) => {
        let node = document.createElement('div');
        node.classList.add('message');
        parentNode.append(node);
        let randomTime = Math.floor(Math.random() * 5 + 1) + 1000;
        setTimeout(() => {
            node.innerText = "~ " + message;
            resolve(true);
        }, randomTime)
    });
}

async function callHacker() {
    await RandomMessage(hacker, "Initializing Hacking");
    let init1 = hackerDotGen(hacker.children[0]);
    await RandomMessage(hacker, "Reading Your Files");
    let init2 = hackerDotGen(hacker.children[1]);
    clearInterval(init1);
    await RandomMessage(hacker, "Password Files Detected");
    let init3 = hackerDotGen(hacker.children[2]);
    clearInterval(init2);
    await RandomMessage(hacker, "Sending all your Passwords and personal files to server");
    let init4 = hackerDotGen(hacker.children[3]);
    clearInterval(init3);
    await RandomMessage(hacker, "Cleaning up");
    hackerDotGen(hacker.children[4]);
    clearInterval(init4);
}
callHacker();