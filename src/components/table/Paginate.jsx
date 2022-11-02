import React,{ useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {useNavigate,useLocation} from "react-router-dom"

const Paginate = ({ itemOffset, setCurrentItems, setPageCount, setItemOffset, perpage, dataTable, pageCount, setPerpage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const urlParams = new URLSearchParams(window.location.search);
    const myParamURL = Number(urlParams?.get('page')) - 1 > 0 ? Number(urlParams?.get('page')) - 1 : 1;
    const ParamPerpage = Number(urlParams?.get('perpage'))
    
    useEffect(() => {
      if(ParamPerpage){
        setPerpage(ParamPerpage)
      }
    },[setPerpage,ParamPerpage])

    useEffect(() => {
        if(dataTable?.length > 0){
          const endOffset = itemOffset + perpage;
          setCurrentItems(dataTable?.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(dataTable?.length / perpage));
        }
      }, [itemOffset, perpage, dataTable, setCurrentItems, setPageCount]);

    useEffect(()=>{
        const newOffset = (myParamURL * perpage) % dataTable?.length;
        setItemOffset(newOffset);
    })
    
      const handlePageClick = (event) => {
        navigate({
          pathname: pathname,
          search: '?page=' + (event.selected + 1) + "&perpage=" + perpage,
        });
      }

  return (
    <ReactPaginate
    breakLabel="..."
    nextLabel=">"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount}
    previousLabel="<"
    renderOnZeroPageCount={null}
    className="paginate"
    // forcePage={myParamURL}
    />
  )
}

export default Paginate