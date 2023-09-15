const {
    S3Client, 
    PutObjectCommand, 
    GetObjectCommand, 
    HeadObjectCommand, 
    DeleteObjectCommand
} = require('@aws-sdk/client-s3')
const {S3Provider} = require('./S3Provider')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
class AWSS3Provider extends S3Provider {
    constructor(){
        super()
        const options = {
            region: this.connectionProps.region,
            endpoint: this.connectionProps.endpoint,
            credentials: {
                accessKeyId: this.connectionProps.credentials.accessKeyId,
                secretAccessKey: this.connectionProps.credentials.secretAccessKey
            }
        }
        this.client = new S3Client(options)
    }

    async upload(key, resource, contentType = null) {
        const type = contentType ? {mime: contentType} : await this.getFileType(resource)
        const input = {
            Bucket: this.connectionProps.bucket,
            Key: key,
            Body: resource,
            ContentType: type.mime,
        }
        const command = new PutObjectCommand(input)
        await this.client.send(command)
        return {location: this.connectionProps.bucket, key }
    }

    async download(key, toBase64 = true) {
        const input = {
            Key: key,
            Bucket: this.connectionProps.bucket
        }
        const command = new GetObjectCommand(input)
        const response = await this.client.send(command)
        const { Body } = response
        const buffer = await this.streamToBuffer(Body)
        let content
        if(toBase64){
            content = this.bufferToBase64(buffer)
        }
        else{
            content = buffer
        }
        const type = await this.getFileType(content)
        return {
            ...type,
            content
        }
    }

    async exists(key){
        const input = {
            Key: key,
            Bucket: this.connectionProps.bucket
        }
        const command = new HeadObjectCommand(input)
        try{
            await this.client.send(command)
            return true
        }
        catch(err){
            return false
        }
    }

    async delete(key) {
        const exists = await this.exists(key)
        if(!exists) return null
        const input = {
            Key: key,
            Bucket: this.connectionProps.bucket
        }
        const command = new DeleteObjectCommand(input)
        return this.client.send(command)
    }

    signedURL(key, expiresIn = 36000, fileName){
        const input = {
            Key: key,
            Bucket: this.connectionProps.bucket
        }
        if (fileName) {
            input.ResponseContentDisposition = 'attachment; filename = "' + fileName + '"'
        }
        const command = new GetObjectCommand(input)
        return getSignedUrl(this.client, command, { expiresIn })
    }
}

module.exports = {AWSS3Provider}