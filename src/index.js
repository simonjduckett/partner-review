var nameInput = document.querySelector('#name');
var realName = nameInput.value;
var clientName = document.querySelector('.client-name');
var aliasCheck = document.querySelector('#provide-anom');
var infoTitles = document.querySelectorAll('.info-title');
var infoBoxes = document.querySelectorAll('.info-box');
var starLabels = document.querySelectorAll('.rate-experience label');
var requiredFields = document.querySelectorAll('.required')
var firstSub = true;

aliasCheck.addEventListener('click', handleCheckClick)

function handleCheckClick() {
    if (aliasCheck.checked == true) {
        nameInput.disabled = false
        nameInput.value = ''
        nameInput.focus()
    } else {
        nameInput.disabled = true
        nameInput.value = realName
    }
}

function hideInfoBoxes() {
    for (var i = 0; i < infoTitles.length; i++) {
        infoBoxes[i].classList.remove('info-box-show')
    }
}

for (const key in starLabels) {
    starLabels[key].onclick = () => {
        document.querySelector('#your-experience').focus()
    }
}

for (var i = 0; i < infoTitles.length; i++) {
    infoTitles[i].firstElementChild.onclick = (e) => {
        hideInfoBoxes()
        e.target.nextElementSibling.classList.add('info-box-show')
    }
}

document.body.onclick = e => {
    if (e.target.className !== "fa-solid fa-circle-info") hideInfoBoxes()
}

function handlePartnerReviewForm(event) {
    event.preventDefault()
    firstSub = false
    for (let i = 0; i < requiredFields.length; i++) {
        validate(requiredFields[i])
    }
}

function validate(input) {
    if(firstSub) return
    switch (input.dataset.type) {
        case 'radio':
            let r = input.querySelectorAll('input[type=radio]')

            let n = [{name: r[0].name, pass: false}]
            let currentGroup = 0;
            for (const el of r) {
                //if new radio group found, add to radio groups array
                if(el.name !== n[n.length - 1].name) {
                    n.push({name: el.name, pass: false})
                    currentGroup++
                }
                if(el.checked === true) {
                    n[currentGroup].pass = true
                }
            }
            //each group must pass to be valid
            n.forEach(radiogroup => {
                if(!radiogroup.pass) {
                    input.classList.add('error');
                    return
                } else input.classList.remove('error');
            })
            break;
        case 'textarea':
            let text = input.querySelector('textarea')
            if(text.value === '') {
                input.classList.add('error')
            } else {
                input.classList.remove('error')
            }
            break;
        default:
        // code block
    }
}