import PostList from "@/components/PostList";

interface PageProps {
    params: Promise<{ id: string }>; // Changed to string since URL params are strings
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Add this function to pre-generate pagination pages
export async function generateStaticParams(): Promise<
    { params: { id: string } }[]
> {
    // Calculate how many pages we need
    // Total Pokemon: ~1300, 15 per page = ~87 pages
    const totalPages = 87;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push({
            params: { id: i.toString() }, // Convert to string since URL params are strings
        });
    }
    
    return pages;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    return (
        <PostList pageId={parseInt(id)} />
    );
}