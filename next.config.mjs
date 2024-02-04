/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"img.freepik.com"},
            {hostname:"res.cloudinary.com"}
        ]
    }
};

export default nextConfig;
