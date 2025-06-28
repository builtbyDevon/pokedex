import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      
      <h1 className="text-center py-5 text-3xl font-bolds uppercase">Pokemon Database!</h1>

      <PostList pageId={1} />

    </div>
  );
}
