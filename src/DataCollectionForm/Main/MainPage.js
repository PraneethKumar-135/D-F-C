import React, { useState } from 'react';
import PersonalInformation from '../Components/personalInformation';
import HotelInformation from '../Components/hotelInformation';
import SocialMediaInfo from '../Components/SocialMediaInfo';
import SocialMediaInfo2 from '../Components/SocialMediaInfo2';
// App Component
function MainPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const pageComponents = {
        1: <PersonalInformation />,
        2: <HotelInformation />,
        3: <SocialMediaInfo />,
        4: <SocialMediaInfo2 />
    };

    return (
        <div>
            {/* {currentPage === 1 ? <PersonalInformation /> : currentPage === 2 ? <HotelInformation /> : currentPage === 3 ? <SocialMediaInfo /> : currentPage === 4 ? <SocialMediaInfo2 /> : null} */}
            {pageComponents[currentPage] || null}
            <footer className='relative top-0 flex items-center justify-end gap-5 mt-3'>
                {currentPage === 1 ? null : (
                    <button className='px-2 rounded-sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
                        {"<< Back"}
                    </button>
                )}
                {currentPage === 4 ? (<button className='border bg-green-500 rounded-md px-3 py-1 text-white' onClick={handleNextPage}>
                    {"Save and Submit"}
                </button>) : (
                    <button className='px-2 rounded-sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
                        {"Next >>"}
                    </button>
                )}
            </footer>
        </div>
    );
}

export default MainPage;
