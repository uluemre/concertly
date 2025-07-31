import { getVenueWithPosts } from '@/server/venue';
import { notFound } from 'next/navigation';
import ClientVenuePage from '@/components/ClientVenuePage';

type Props = {
    params: { name: string };
};

export default async function VenuePage({ params }: Props) {
    const decodedName = decodeURIComponent(params.name);
    const venue = await getVenueWithPosts(decodedName);

    if (!venue) return notFound();

    return <ClientVenuePage venue={venue} />;
}
