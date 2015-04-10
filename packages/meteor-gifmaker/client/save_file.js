Meteor.saveFile = function(blob, name, path, type, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary', type = type || 'binary';
    switch (type) {
        case 'image/png':
        case 'image/jpeg':
        case 'binary':
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
        default:
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
    }
    fileReader.onload = function(file) {
        Meteor.call('saveFile', file.target.result, name, path, encoding, callback);
    }

    fileReader[method](blob);
}