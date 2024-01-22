import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers:[
        Google({}),
        Github({}),
        Credentials({})
    ]
}