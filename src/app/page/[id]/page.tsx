import PostList from "@/components/PostList";
import PostListType from "@/components/PostListType";
import SelectType from "@/components/SelectType";

interface PageProps {
    params: Promise<{ id: string }>; // Changed to string since URL params are strings
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


export const revalidate = 3600;

export default async function Page({ params, searchParams }: PageProps) {
    const { id } = await params;
    const search = await searchParams;

    const type = search.type as string;

    return (
        <>
            <SelectType type={type} />
            {type !== undefined ? <PostListType pageId={parseInt(id)} type={type} /> : <PostList pageId={parseInt(id)} />}
        </>
    );
}