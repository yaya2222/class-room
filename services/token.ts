import { createCodeToToken } from "@/utils/helperFunctions"
import TokenRegister from "@/models/TokenRegister"
import { ITokenRegister } from "@/types"

export const generateTokenRegister = async (email: string) => {
    try {
        const code = createCodeToToken()
        const exisitingTokenRegister: ITokenRegister | null = await TokenRegister.findOne({ email })

        if (exisitingTokenRegister) {

            await TokenRegister.findByIdAndDelete(exisitingTokenRegister._id)
        }
        const expires = new Date(Date.now() + 5 * 60 * 1000)
        const newToken: ITokenRegister = await TokenRegister.create({ token: code, email, expires })
        return newToken
    } catch (error) {
        return null
    }
}
