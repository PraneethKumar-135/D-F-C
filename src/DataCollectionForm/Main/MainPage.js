import React, { useState, useEffect } from 'react';
import PersonalInformation from '../Components/personalInformation';
import HotelInformation from '../Components/hotelInformation';
import SocialMediaAgency from '../Components/SocialMediaAgency';
import SocialMediaInfo from '../Components/SocialMediaInfo';
import AllData from './AllData';
import { useDispatch, useSelector } from 'react-redux';
import { editMainPage, updatebuttonClick, updatedCurrentPage } from '../../Redux/Slice/PersonalInfoSlice';


function MainPage() {
    const PageUpdate = useSelector((state) => state.personalInformation.currentPage)
    const PageToogle = useSelector((state) => state.personalInformation.PageToogle)
    const Buttonclick = useSelector((state) => state.personalInformation.buttonClick)
    const SaveButton = useSelector((state) => state.socialMediaInfo.SaveButton);
    const [currentPage, setCurrentPage] = useState(PageUpdate);
    const [buttonclicked, setButtonclick] = useState(Buttonclick);
    const [Loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [Alldata, setAllData] = useState(false)
    const [Editor, setEditor] = useState({});
    const totalPages = 4;
    const dispatch = useDispatch();

    const LoadingPage = () => (
        <div className="absolute top-[50%] left-0 right-0 bottom-[50%] flex justify-center items-center bg-opacity-50 z-10 ">
            <div className="text-2xl text-center">Please Wait While Your Details are Loading...</div>
        </div>
    );

    const handleNextPage = () => {
        setTransitioning(true);
        if (Buttonclick) {
            setButtonclick(false)
            setTimeout(() => {
                setTransitioning(false);
            }, 500);
            setCurrentPage(PageUpdate);
            dispatch(updatebuttonClick(false));
        } else {
            setButtonclick(true);
            setCurrentPage(PageUpdate);
            setTransitioning(false);
        }
    };

    const handlePreviousPage = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
            setTransitioning(false);
        }, 300);
        dispatch(updatebuttonClick(true))
        dispatch(updatedCurrentPage(currentPage))

    };

    const handleAlldataPage = () => {
        if (SaveButton) {
            setLoading(true);
            setTimeout(() => {
                setAllData(true)
            }, 1000)
            dispatch(editMainPage(false));
        } else {
            setButtonclick(true)
        }
    }

    const pageComponents = {
        1: <PersonalInformation />,
        2: <HotelInformation />,
        3: <SocialMediaAgency />,
        4: <SocialMediaInfo />
    };

    useEffect(() => {
        setCurrentPage(PageUpdate);
        setAllData(false);
        setTimeout(() => {
            setLoading(false)
        }, 800)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PageToogle, Editor])

    const handleAlldataEdit = (data) => {
        setEditor(data);
        dispatch(updatedCurrentPage(data.currentPage));
        setLoading(false);
    }

    const handleLoading = (data) => {
        setLoading(data);
    }


    return (
        <>
            {Alldata ? (<AllData handleAlldataEdit={handleAlldataEdit} handleLoading={handleLoading} />) : (
                <div className="w-full relative">
                    {Loading ? <LoadingPage /> : (
                        <>
                            {currentPage === 1 ? null : (
                                <span className='flex items-center w-[2%] fixed left-0 top-[14rem]'>

                                    <button className="text-2xl p-2 h-32 translate-x-2 border border-black rounded-full" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        {"<"}
                                    </button>
                                </span>
                            )}

                            <div className={`w-[94%] absolute  ${currentPage === 1 ? "left-5" : "left-10"}  transition-opacity ${Buttonclick ? "duration-300" : "duration-0"} ${transitioning ? "opacity-0" : "opacity-100"}`}>
                                {buttonclicked && (
                                    <div
                                        className="fixed top-1/2 left-1/2 w-[30%] h-[20%] bg-white border border-black text-center p-4 rounded-md z-50"
                                        style={{ transform: 'translate(-50%, -50%)' }}
                                        role="dialog"
                                        aria-labelledby="popup-message"
                                    >
                                        <div id="popup-message" className="mb-4">
                                            Please fill in all required fields!
                                        </div>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                                            onClick={() => { setButtonclick(false); }}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                )}

                                {pageComponents[currentPage] || null}

                                {currentPage === 4 && (
                                    <div className="flex justify-end mt-5 mb-2">
                                        <button
                                            className="border bg-green-500 rounded-md px-3 py-1 text-white"
                                            onClick={handleAlldataPage}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>

                            {currentPage !== 4 && (
                                <span className='flex items-center w-[2%] fixed right-5 top-[14rem]'>
                                    <button className="text-2xl p-2 h-32 translate-x-2 border border-black rounded-full" onClick={handleNextPage} disabled={currentPage === totalPages} >
                                        {">"}
                                    </button>
                                </span>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default MainPage;
