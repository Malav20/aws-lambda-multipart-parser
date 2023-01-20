const busboy = require('busboy')

function parseMultipartEvent (event) {
  return new Promise((resolve, reject) => {
    const bb = busboy({
      headers: {
        'content-type': event.headers['content-type'] || event.headers['Content-Type']
      }
    })
    const result = {
        files = []
    }
    bb.on('file', (fieldname, file, filename) => {
        const uploadFile = {}
        file.on('data', data => {
            uploadFile.content = data
        })

        file.on('end', () => {
            if(uploadFile.content){
                uploadFile.filename = filename.filename
                uploadFile.contentType = filename.mimeType
                uploadFile.encoding = filename.encoding
                uploadFile.fieldname = fieldname
                result.files.push(uploadFile)
            }
        })
    })

    bb.on('field', (fieldname, value) => {
        result[fieldname] = value
    })

    bb.on('error', error => {
        reject(error)
    })

    bb.on('finish', () => {
        resolve(result)
    })

    const encoding = event.encoding || (event.isBase64Encoded ? 'base64' : 'binary')
    bb.write(event.body, encoding)
    bb.end()
  })
}
