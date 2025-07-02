import PostList from "@/components/PostList";
import PostListType from "@/components/PostListType";

interface PageProps {
    params: Promise<{ id: string }>; // Changed to string since URL params are strings
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Force dynamic rendering
export const revalidate = 3600; // Revalidate every hour


export default async function Page({ params, searchParams }: PageProps) {
    const { id } = await params;
    const search = await searchParams;

    const type = search.type as string;

    console.log('Type:', type);

    return (
        type !== undefined ? <PostListType pageId={parseInt(id)} type={type} /> : <PostList pageId={parseInt(id)} />
    );
}