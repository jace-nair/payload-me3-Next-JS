import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";


export default async function HeaderServer() {

    const payload = await getPayload({config});
    const header = await payload.findGlobal({
        slug: "header",
    })

    return(
       <div className="bg-slate-700">
             <header className="py-12 max-w-5xl mx-auto flex items-center justify-between">
            <div><Image src={header.logo.url} width={300} height={150} alt={header.logo.alt} /></div>
            <nav className="w-full flex justify-evenly text-white">{header.nav?.map((item) => (
                <Link href={item.link}>{item.label}</Link>
            ))}</nav>
        </header>
       </div>
    );
}