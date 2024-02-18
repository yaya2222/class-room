/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"img.freepik.com"},
            {hostname:"res.cloudinary.com"},
            {hostname:"lh3.googleusercontent.com"},
            {hostname:"files.edgestore.dev"}
        ]
    }
};

export default nextConfig;
