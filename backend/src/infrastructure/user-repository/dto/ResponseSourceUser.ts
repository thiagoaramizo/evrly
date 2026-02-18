export interface ResponseSourceUser {
    success: boolean,
    data: {
        encrypted: {
            iv: string,
            authTag: string,
            encrypted: string,
        },
        secretKey: string,
        algorithm: "aes-256-gcm" | string,
    }
}
