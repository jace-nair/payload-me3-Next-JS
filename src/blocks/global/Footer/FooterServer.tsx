import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";

export default async function FooterServer() {

   const payload = await getPayload({config});
    const footer = await payload.findGlobal({
        slug: "footer",
    })

    return(
        <div className="bg-slate-500">
            <footer className="p-12 max-w-5xl mx-auto flex items-center justify-between">
            <div><Image src={footer.logo.url} width={200} height={100} alt={footer.logo.alt} /></div>
            <div>{footer.copyrightNotice}</div>
            <nav className="flex justify-evenly text-white">{footer.nav.map((item) => (
                <Link href={item.link}>{item.label}</Link>
            ))}</nav>
        </footer>
        </div>
    );
}