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
    enableCrop?: boolean

}
