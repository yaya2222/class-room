/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"img.freepik.com"},
            {hostname:"res.cloudinary.com"},
            {hostname:"lh3.googleusercontent.com"}
        ]
    }
};

export default nextConfig;
