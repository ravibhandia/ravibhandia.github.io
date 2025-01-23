import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-[2vw] box-border border-l-[12vw] border-b-[12vw] border-[#1e1e1e] max-w-[90vw]">
      <div className="px-[12vw] pb-[12vw] w-full min-h-[80vh] m-0">
        <h1 className="text-[clamp(32px,5vw,48px)] font-normal mb-[clamp(30px,5vw,60px)] leading-normal tracking-normal text-left">
          Ravi Bhandia
        </h1>
        <ol className="list-none p-0 [counter-reset:item]">
          <li className="my-5 text-[clamp(16px,2.5vw,20px)] before:content-[counter(item,decimal-leading-zero)] before:[counter-increment:item] before:opacity-70 before:mr-2.5">
            See my <Link href="/story" className="text-white no-underline border-b border-white">story</Link>
          </li>
          <li className="my-5 text-[clamp(16px,2.5vw,20px)] before:content-[counter(item,decimal-leading-zero)] before:[counter-increment:item] before:opacity-70 before:mr-2.5">
            Read my <Link href="https://ravibhandia.substack.com/" className="text-white no-underline border-b border-white">posts</Link>
          </li>
          <li className="my-5 text-[clamp(16px,2.5vw,20px)] before:content-[counter(item,decimal-leading-zero)] before:[counter-increment:item] before:opacity-70 before:mr-2.5">
            Follow my <Link href="https://twitter.com/ravi_bhandia" className="text-white no-underline border-b border-white">thoughts</Link>
          </li>
          <li className="my-5 text-[clamp(16px,2.5vw,20px)] before:content-[counter(item,decimal-leading-zero)] before:[counter-increment:item] before:opacity-70 before:mr-2.5">
            My favorite <Link href="/quotes" className="text-white no-underline border-b border-white">quotes</Link>
          </li>
          <li className="my-5 text-[clamp(16px,2.5vw,20px)] before:content-[counter(item,decimal-leading-zero)] before:[counter-increment:item] before:opacity-70 before:mr-2.5">
            Send me a <Link href="mailto:ravi@bhandia.com" className="text-white no-underline border-b border-white">message</Link>
          </li>
        </ol>
      </div>
    </main>
  )
} 