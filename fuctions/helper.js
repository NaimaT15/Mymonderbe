const noIdFound = (res) => {
    try {
        res.send({
            message: "No record found with given ID",
            error: {}
        })
    } catch (er) {

    }
}

const permissionDenied = (res) => {
    res.send({
        message: 'Permission denied',
        error: {}
    });
}

const idRequired = (res) => {
    res.send({
        message: "Id required",
        error: {}
    })
}

const duplicateEmailOrPhone = (res) => {
    res.send({
        message: "Duplicate email or phone",
        error: {}
    })
    return;
}

const someFeildAreMissing = (res) => {
    res.send({
        message: "Some feild are missing",
        error: {}
    });
    return;
}

module.exports = {
    noIdFound,
    idRequired,
    duplicateEmailOrPhone,
    someFeildAreMissing,
    permissionDenied
}