import PostListType from "@/components/PostListType";

interface PageProps {
    params: Promise<{ id: string, name: string }>; // Changed to string since URL params are strings
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';


export default async function Page({ params }: PageProps) {
    const { id, name } = await params;
    console.log('id here  ', params)
    return (
        <PostListType type={name} pageId={parseInt(id)} />
    );
}