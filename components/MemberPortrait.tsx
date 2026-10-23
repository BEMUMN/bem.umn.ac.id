import Image from "next/image";
import type { Member } from "@/constants/divisionMembers";

type Props = {
    member: Member;
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
};

export function MemberPortrait({ member, src, alt, sizes, priority }: Props) {
    const crop = src === member.imageUrl ? member.portraitCrop : undefined;
    if (!crop) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-contain"
            />
        );
    }
    const height = crop.width * 1.25;
    return (
        <Image
            src={src}
            alt={alt}
            width={800}
            height={1200}
            sizes="800px"
            priority={priority}
            data-portrait-crop
            className="absolute max-w-none"
            style={{
                width: `${(800 / crop.width) * 100}%`,
                height: "auto",
                left: `${(-crop.x / crop.width) * 100}%`,
                top: `${(-crop.y / height) * 100}%`,
            }}
        />
    );
}
