import Link from 'next/link'

export default function Quotes() {
  return (
    <main className="min-h-screen flex justify-center p-[2vw] box-border">
      <div className="w-full max-w-[600px] min-h-[80vh] p-5 m-0">
        <p className="back-link">
          <Link href="/">←Back</Link>
        </p>
        <h1 className="text-[14.5px] font-normal leading-normal tracking-normal text-center text-white border-b border-white pb-5 mb-10">
          My Favorite Quotes
        </h1>

        <p className="my-5 text-center max-w-[800px]">
          "Do you want to sell sugar water for the rest of your life, or do you want to come with me and change the world?"
          <span className="quote-author">- Steve Jobs to John Sculley</span>
        </p>
        
        <p className="my-5 text-center max-w-[800px]">
          "My mind is at ease knowing that what was meant for me will never miss me and what misses me was never meant for me"
          <span className="quote-author">- Imam Al- Shafi</span>
        </p>
        
        {/* Add remaining quotes similarly */}
      </div>
    </main>
  )
} 