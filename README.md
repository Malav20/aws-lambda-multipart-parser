# AWS Lambda Multipart Parser

# Introduction
A latest lambda multipart parser that uses latest version of busboy to parse the base64 encoded multipart body of lambda and returns file and other fields

## Description
```
@param {event} - This event will be base64 encoded string that will contain all the file data and fielddata
@return {object} - a JSON object containing array of files and fields, sample below.

{
    files: [
        {
            filename: 'test.pdf',
            content: <Buffer 25 50 6f 62 ... >,
            contentType: 'application/pdf',
            encoding: '7bit',
            fieldname: 'uploadFile1'
        }
    ],
    field1: 'VALUE1',
    field2: 'VALUE2',
}
```

## Usage
```
const { parseMultipartEvent } = require('aws-lambda-multipart-parser');

const result = await parseMultipartEvent(event);
console.log(result.files);
```

**Important**

Please make sure to enable the "Use Lambda Proxy integration" in API Gateway method Integration request. 

For some reason if your event is not encoded to base64 then follow below steps
1. Navigate to the API gateway resource that you are using
2. Go to settings
3. At the bottom you will find Binary media type
4. Add ```*/*``` to it and save changes
5. Deploy you API again to reflect the changes
