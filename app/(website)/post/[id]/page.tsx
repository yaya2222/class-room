interface  PostPageProps {
    params: {
      id: string;
    };
  }


export default function PostPage({params:{id}}:PostPageProps) {
  return (
    <div>Post {id}</div>
  )
}
