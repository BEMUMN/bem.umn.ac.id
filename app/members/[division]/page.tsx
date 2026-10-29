import { redirect } from "next/navigation";

type PageProps = {
    params: Promise<{ division: string }>;
};

const Division = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    redirect(`/divisi/${resolvedParams.division.toLowerCase()}`);
};

export default Division;
