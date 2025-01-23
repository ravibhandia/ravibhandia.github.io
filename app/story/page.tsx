import Link from 'next/link'

export default function Story() {
  return (
    <main className="min-h-screen flex justify-center p-[2vw] box-border">
      <div className="w-full max-w-[800px] min-h-[80vh] p-5 m-0">
        <p className="back mb-8">
          <Link href="/">←Back</Link>
        </p>
        
        <h1 className="text-[14.5px] font-normal leading-normal tracking-normal text-center text-white border-b border-white pb-5 mb-10">
          My Story
        </h1>

        <div className="space-y-8 max-w-[90%] mx-auto">
          <p className="gray-text text-center">Raised in Los Altos, California</p>
          
          <p className="text-center">Went to Harker.</p>
          
          <p className="text-center">Moved to LA for College</p>
          
          <p className="text-center">
            Studied engineering and finance at USC Got <Link href="https://pubs.aip.org/avs/jva/article/34/4/041403/245811/Solventless-grafting-of-functional-polymer" className="text-white no-underline border-b border-white">published</Link>!
          </p>
          
          <p className="text-center">
            Had some cool internships. First tried to help solve a hard problem of putting a <Link href="https://www.crunchbase.com/organization/kinestral-technologies" className="text-white no-underline border-b border-white">battery in a window</Link>. Second, making awesome <Link href="https://www.silanano.com/" className="text-white no-underline border-b border-white">silicon based anodes.</Link>
          </p>
          
          <p className="text-center">
            Learned how to make Gatorade more efficiently at a PepsiCo factory in East Oakland.
          </p>
          
          <p className="quote text-center italic text-gray-400 my-12 mx-auto max-w-[80%]">
            "Do you want to sell sugar water for the rest of your life, or do you want to come with me and change the world?" - Steve Jobs to John Sculley
          </p>
          
          <p className="gray-text text-center">
            Read the Goal by Eliyahu M. Goldratt → Became Interested in Data Science
          </p>
          
          <p className="text-center">Went back to school to study Data Science at UC Berkeley</p>
          
          <p className="text-center">
            Tried to build my own startup: Dial Health. "Remove the dialing from healthcare". Learned a lot!
          </p>
          
          <p className="text-center">
            Joined Armorblox to help build an an amazing email security product.
          </p>
          
          <p className="text-center">
            Moved to SF, performed standup comedy for the first time, and biked a lot in Marin.
          </p>
          
          <p className="gray-text text-center">
            Moved from SF to NYC. First time living outside of California
          </p>
          
          <p className="text-center">
            Joined Cisco as part of the Armorblox <Link href="https://blogs.cisco.com/news/cisco-announces-intent-to-acquire-armorblox" className="text-white no-underline border-b border-white">acquisition</Link>.
          </p>
          
          <p className="text-center">
            <Link href="https://blogs.cisco.com/security/the-challenges-of-building-generative-ai-applications-in-cybersecurity" className="text-white no-underline border-b border-white">Building</Link> Generative AI for Security at Cisco
          </p>
        </div>
      </div>
    </main>
  )
} 