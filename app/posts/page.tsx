import Link from "next/link";
import { Container } from "../components/Container";

const Posts = async () => {
  const posts = await getPosts();

  console.log(posts);

  return (
    <Container>
      {/* @ts-expect-error */}
      {posts.data.map((post) => (
        <Link key={post.id} href={post.attributes.slug}>
          <h2>{post.attributes.title}</h2>
        </Link>
      ))}
    </Container>
  );
};

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts`);
  if (!res.ok) {
    console.log(res.statusText);
    throw new Error(res.statusText);
  }

  return await res.json();
}

export default Posts;
