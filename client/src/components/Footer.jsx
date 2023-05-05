import React from 'react'

const Footer = () => {
    return (
        <div className='px-16 py-6 mt-10 bg-gray-100'>
            <div className='grid grid-cols-4 w-full'>
                <div className='flex flex-col'>
                    <h2 className='text-l font-bold my-4'>Support</h2>
                    <p className='my-2'>Help Center</p>
                    <p className='my-2'>AirCover</p>
                    <p className='my-2'>Cancellation options</p>
                    <p className='my-2'>Report a neighbourhood concern</p>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-l font-bold my-4'>Community</h2>
                    <p className='my-2'>Airbnb.org: disaster relief housing</p>
                    <p className='my-2'>Combating discrimination</p>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-l font-bold my-4'>Hosting</h2>
                    <p className='my-2'>Airbnb your home</p>
                    <p className='my-2'>AirCover for Hosts</p>
                    <p className='my-2'>Explore hosting resources</p>
                    <p className='my-2'>Visit our community forum</p>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-l font-bold my-4'>Airbnb</h2>
                    <p className='my-2'>Newsroom</p>
                    <p className='my-2'>Learn about new features</p>
                    <p className='my-2'>Letter from our founders</p>
                </div>
            </div>
            <div className='border-t border-black w-full mt-8 flex justify-between'>
                <div className='flex my-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173"></path>
                    </svg>
                    <span className='mx-2'>2023 Airbnb,Inc.</span>
                    <span className='mx-2'>Privacy</span>
                    <span className='mx-2'>Terms</span>
                    <span className='mx-2'>Sitemap</span>
                    <span className='mx-2'>Company details</span>
                </div>
                <div className='my-4 flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span>India</span>
                </div>
            </div>
        </div>
    )
}

export default Footer