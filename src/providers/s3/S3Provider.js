const { Readable } = require('stream')
const config = require('../../config')

class S3Provider {
    constructor(){
        this.connectionProps = {
            bucket: config.S3.bucket,
            region: config.S3.region,
            endpoint: config.S3.endpoint ?? undefined,
            credentials: {
                accessKeyId: config.S3.credentials.accessKeyId,
                secretAccessKey: config.S3.credentials.secretAccessKey
            }
        }
    }

    async upload(key, resource, contentType = null) {
        return new Promise((resolve, reject) => {
            reject(new Error('Upload must be defined'))
        })
    }

    async download(key) {
        return new Promise((resolve, reject) => {
            reject(new Error('Download must be defined'))
        })
    }

    async exists(key){
        return new Promise((resolve, reject) => {
            reject(new Error('Exists must be defined'))
        })
    }

    async delete(key) {
        return new Promise((resolve, reject) => {
            reject(new Error('Delete must be defined'))
        })
    }

    getContentEncoding(data) {
        return data instanceof Readable ? 'binary' : 'base64'
    }

    async getFileType (data) {
        const FileType = await import('file-type')
        if(data instanceof Buffer){
            return FileType.fileTypeFromBuffer(data)
        }
        if(data instanceof Readable) {
            return FileType.fileTypeFromStream(data)
        }
        if(typeof data === 'string'){
            const rawString = data.replace(/^data.*;base64,/,'')
            const header = rawString.substring(0,2000)
            const bufferHead = Buffer.from(header, 'base64')
            return FileType.fileTypeFromBuffer(bufferHead)
        }
    }

    async streamToBuffer(stream) {
        return new Promise((resolve, reject) => {
            const chunks = []
            stream.on('data', chunk => {
                chunks.push(chunk)
            })
            stream.on('error', reject)
            stream.on('end', () => {
                const result = Buffer.concat(chunks)
                resolve(result)
            })
        })
    }

    bufferToBase64(buffer){
        return buffer.toString('base64')
    }
    
    base64ToBuffer(base64){
        return Buffer.from(base64.replace(/^data.*;base64,/,''), 'base64')
    }
}

module.exports = {S3Provider}