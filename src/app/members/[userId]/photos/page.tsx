import { getMemberPhotosByUseId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

export default async function Photos({
  params,
}: {
  params: { userId: string };
}) {
  const photos = await getMemberPhotosByUseId(params.userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <Image
                width={300}
                height={300}
                src={photo.url}
                alt="Image of member"
                className="object-cover aspect-square"
                key={photo.id}
              />
            ))}
        </div>
      </CardBody>
    </>
  );
}
