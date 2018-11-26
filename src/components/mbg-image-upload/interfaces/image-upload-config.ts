import { ImageUploadPosition } from './image-upload-position'

export interface ImageUploadConfig {
    /**
     * @description Define os tipos de arquivos que serão aceitos.
     */
    accept?: string,
    /**
     * @description Quantidade maxima de imagens.
     */
    maxImages?: number,
    /**
     * @description Define o tamanho do componente.
     */
    size?: {
        width?: string,
        height?: string,
    },
    /**
     * @description Define as configrações do elemento que agrupa as imagens adicionais.
     */
    children?: {
        position?: ImageUploadPosition,
    }
    /**
    * @description Configuração de arredondamento (default : false = Square)
    */
    rounded?: boolean
    /**
    * @description Habilitar crop da imagem (dafault : false)
    */
    enableCrop?: boolean,
    /**
    * @description Desabilita a integração com firebase (dafault : false)
    */
    disableFirebase?: boolean
    /**
    * @description Habilita o modo apenas visualização (dafault : false)
    */
    viewMode?: boolean
    /**
    * @description Desabilita o modulo webcam (dafault : false)
    */
    disableWebcam?: boolean
}
