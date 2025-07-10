import PostList from "@/components/PostList";
import SelectType from "@/components/SelectType";

interface PageProps {
  params: Promise<{ id: string }>; // Changed to string since URL params are strings
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const search = await searchParams;
  const type = search?.type as string || undefined;


  return (
    
    <div>
      
      
      <SelectType type={type} />
      <PostList pageId={1} />
    </div>
  );
}
