import firebase from 'firebase/app'
import 'firebase/storage'

export namespace ImageUploadFirebase {
    const URL_FIREBASE = 'https://firebasestorage.googleapis.com/v0/b/bucket/o/id?alt=media'

    export function getStorage(): any {
        return window['firebase'] ? window['firebase'].storage() : firebase.storage()
    }

    export function guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }

    export async function removeFiles(files) {
        files.forEach((file) => {
            if (file) {
                const storageRef = getStorage().ref().child(file.idStorage)
                storageRef.delete()
            }
        })
    }

    export async function upload(files: Array<string>) {
        return await Promise.all(files.map(async (base64) => {
            const imageID = this.guid()
            const storageRef = getStorage().ref().child(imageID)
            const response = await storageRef.putString(base64, 'data_url')
            const imageURL = URL_FIREBASE.replace(/bucket/g, response.metadata.bucket).replace(/id/g, response.metadata.name)
            const image = { url: imageURL, idStorage: imageID }
            return image
        }))
    }
}
