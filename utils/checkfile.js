const checkFile = (file) => {
    let error = {};
    if (!file.title) {
        error.title = "Title is required";
    }
    if (!file.text) {
        error.text = "Text is required";
    }
    if (!file.phile) {
        error.phile = "File is required";
    }
    if (file.title && file.title.length < 3) {
        error.title = "Title must be at least 3 characters";
    }
    if (file.text && file.text.length < 10) {
        error.text = "Text must be at least 10 characters";
    }
    return error;
};

export default checkFile;