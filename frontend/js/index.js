const SERVER_URL = 'http://127.0.0.1:8000'

async function serverAddSudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json()

    return data
}

async function serverGetSudents() {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json()

    return data
}

async function serverDeleteSudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/' + `?id=${id}`, {
        method: "DELETE",
    })

    let data = await response.json()

    return data
}


function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    // return dd + '.' + mm + '.' + yy;
    return `${yy}-${mm}-${dd}`
}


function $getNewStudentTR(studObj) {
    const $tr = document.createElement("tr")
    const $tdFIO = document.createElement("td")
    const $tdBirthday = document.createElement("td")
    const $tdfaculty = document.createElement("td")
    const $tdStudyStart = document.createElement("td")
    const $tdCountry = document.createElement("td")
    const $tdDelete = document.createElement("td")
    const $btnDelete = document.createElement("button")

    $btnDelete.classList.add("btn", "btn-danger", "w-100")
    $btnDelete.textContent = "Delete"

    $tdFIO.textContent = `${studObj.first_name} ${studObj.last_name}`
    $tdBirthday.textContent = formatDate(new Date(studObj.date_of_birth))
    $tdfaculty.textContent = studObj.faculty
    $tdStudyStart.textContent = studObj.year_joined
    $tdCountry.textContent = studObj.country

    $btnDelete.addEventListener("click", async function() {
        await serverDeleteSudent(studObj.id)
        $tr.remove()
    })

    $tdDelete.append($btnDelete)
    $tr.append($tdFIO, $tdBirthday, $tdfaculty, $tdStudyStart, $tdCountry, $tdDelete)
    return $tr
}

function redner(arr) {
    let copyArr = [...arr]

    const $studTable = document.getElementById("stud-table")


    $studTable.innerHTML = ''
    for (const studObj of copyArr) {
        const $newTr = $getNewStudentTR(studObj)
        $studTable.append($newTr)
    }
}

document.getElementById("add-form").addEventListener("submit", async function(event) {
    event.preventDefault()
    let birthday = new Date(document.getElementById("birthday-inp").value)
    birthday = `${birthday.getFullYear()}-${birthday.getMonth()}-${birthday.getDay()}`
    let newStudentObj = {
        first_name: document.getElementById("name-inp").value,
        last_name: document.getElementById("lastname-inp").value,
        year_joined: document.getElementById("studyStart-inp").value,
        date_of_birth: birthday,
        faculty: document.getElementById("faculty-inp").value,
        country: document.getElementById("country-inp").value,
    }

    let serverDataObj = await serverAddSudent(newStudentObj)

    serverDataObj.date_of_birth = new Date(serverDataObj.date_of_birth)

    listStudents.push(serverDataObj)

    console.log(listStudents);
    redner(listStudents)
})

let serverData = await serverGetSudents()
let listStudents = []
if (serverData) {
    listStudents = serverData
}
redner(listStudents)
