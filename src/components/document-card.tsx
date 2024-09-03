import React from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import { Doc } from "../../convex/_generated/dataModel";
import Link from "next/link";

export default function DocumentCard({document} : {document: Doc<'documents'>}) {
  return (
    <Card 
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Random image"
        className="object-cover rounded-lg"
        height={200}
        src="https://random-image-pepebigotes.vercel.app/api/random-image"
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 rounded-lg">
        <p className="text-tiny text-white/80 rounded-full">{document.title}</p>
        <Button className="text-tiny text-white bg-black/20 rounded-lg" variant="flat" color="default" size="sm">
        <Link href={`/documents/${document._id}`}> 
          View more
        </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
