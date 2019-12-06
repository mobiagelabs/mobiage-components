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

    export async function upload(files: Array<string>, folder = '') {
        return await Promise.all(files.map(async (base64) => {
            const imageID = this.guid()
            const storageRef = getStorage().ref().child(folder ? `${folder}/${imageID}` : imageID)
            const response = await storageRef.putString(base64, 'data_url')
            const imageURL = folder ? URL_FIREBASE.replace(/bucket/g, response.metadata.bucket).replace(/id/g, `${folder}%2F${response.metadata.name}`)
                : URL_FIREBASE.replace(/bucket/g, response.metadata.bucket).replace(/id/g, response.metadata.name)
            const image = { url: imageURL, idStorage: imageID }
            return image
        }))
    }
    export function uploadFile(file: File, config: { onProgress, onPause, onResume, onError, onSuccess }, folder = '') {
        const imageID = this.guid()
        const storageRef = getStorage().ref().child(folder ? `${folder}/${imageID}` : imageID)
        const uploadTask = storageRef.put(file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            config.onProgress(progress)
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    config.onPause()
                    break
                case firebase.storage.TaskState.RUNNING:
                    config.onResume()
                    break
            }
        }, (e) => {
            config.onError()
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    config.onSuccess({ fileName: file.name, fileURL: downloadURL, fileSize: file.size })
                })
                .catch(() => {
                    config.onError()
                })
        })
        return uploadTask
    }
}
