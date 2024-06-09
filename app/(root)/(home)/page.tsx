// import MeetingTypeList from '@/components/MeetingTypeList';

// const Home = () => {
//   const now = new Date();

//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = (new Intl.DateTimeFormat('en-US', {
//     dateStyle: 'full'
//   })).format(now);
//   return (
//     <section className='flex size-full flex-col gap-10 text-white'>
//       <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
//         <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
//           <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base'>Upcoming Meeting at: {time}</h2>
//             <div className='flex flex-col gap-2'>
//               <h1 className='text-4xl font-extrabold lg:text-7xl'>
//                 {time}
//               </h1>
//               <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
//             </div>
//         </div>
//       </div>

//       <MeetingTypeList/>
//     </section>
//   )
// }

// export default Home

// "use client"


// import { useGetCalls } from '@/hooks/useGetCalls';
// import MeetingTypeList from '@/components/MeetingTypeList';
// import Loader from '@/components/Loader';
// import React from 'react';

// const Home = () => {
//   const { upcomingCalls, isLoading } = useGetCalls();
//   const now = new Date();
//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = new Intl.DateTimeFormat('en-US', {
//     dateStyle: 'full'
//   }).format(now);

//   // Find the earliest upcoming meeting
//   const earliestUpcomingMeeting = upcomingCalls?.length > 0
//     ? upcomingCalls.reduce((earliest, current) =>
//       new Date(current.state.startsAt!) < new Date(earliest.state.startsAt!) ? current : earliest)
//     : null;

//   const upcomingMeetingTime = earliestUpcomingMeeting
//     ? new Date(earliestUpcomingMeeting.state.startsAt!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//     : 'No Upcoming Meetings';

//   if (isLoading) return <Loader />;

//   return (
//     <section className='flex size-full flex-col gap-10 text-white'>
//       <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
//         <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
//           <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base'>
//             Upcoming Meeting at: {upcomingMeetingTime}
//           </h2>
//           <div className='flex flex-col gap-2'>
//             <h1 className='text-4xl font-extrabold lg:text-7xl'>
//               {time}
//             </h1>
//             <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
//           </div>
//         </div>
//       </div>
//       <MeetingTypeList />
//     </section>
//   );
// };

// export default Home;

"use client"

import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingTypeList from '@/components/MeetingTypeList';
import Loader from '@/components/Loader';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(currentTime);

  // Find the earliest upcoming meeting
  const earliestUpcomingMeeting = upcomingCalls?.length > 0
    ? upcomingCalls.reduce((earliest, current) =>
      new Date(current.state.startsAt!) < new Date(earliest.state.startsAt!) ? current : earliest)
    : null;

  const upcomingMeetingTime = earliestUpcomingMeeting
    ? new Date(earliestUpcomingMeeting.state.startsAt!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : 'No Upcoming Meetings';

  if (isLoading) return <Loader />;

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base'>
            Upcoming Meeting at: {upcomingMeetingTime}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
