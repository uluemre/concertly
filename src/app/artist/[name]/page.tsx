import { getArtistWithPosts } from '@/server/artist';
import { notFound } from 'next/navigation';
import ClientArtistPage from '@/components/ClientArtistPage';

type Props = {
    params: { name: string };
};

export default async function ArtistPage({ params }: Props) {
    const decodedName = decodeURIComponent(params.name);
    const artist = await getArtistWithPosts(decodedName);

    if (!artist) return notFound();

    return <ClientArtistPage artist={artist} />;
}
