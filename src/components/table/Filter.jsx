import React,{ useEffect,useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from "./DatePicker"
import { useNavigate, useLocation } from 'react-router';
import {dateString} from "../../commons/dateTime"

const Filter = ({DataFilter ,sortBy, sortValue, setSortBy, setSortValue, search, setsearch ,setDropDown}) => {
  const queryParams = new URLSearchParams(window.location.search)
  const keywordURL = queryParams.get("keyword")
  const sort_byURL = queryParams.get("sort_by")
  const sortValueURL = queryParams.get("sort_value")
  const statusURL = queryParams.get("status")
  const start_dateURL = queryParams.get("start_date")
  const end_dateURL = queryParams.get("end_date")
  const [isOpenFilter,setIsOpenFilter] = useState(false)
  const pageURL = Number(queryParams?.get('page'))
  const perpageURL = Number(queryParams?.get('perpage'))

  const [dates,setDates] = useState(start_dateURL && end_dateURL ? [new Date(dateString(start_dateURL)),new Date(dateString(end_dateURL))] : undefined)
  const [status, setStatus] = useState('');
  const [keyword,setKeyWord ] = useState('');
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  useEffect(()=>{
    if(keywordURL){
      setKeyWord(keywordURL)
    }

    if(sort_byURL){
      setSortBy(sort_byURL)
    }

    if(sortValueURL){
      setSortValue(sortValueURL)
    }

  },[keywordURL, sort_byURL, setSortBy, sortValueURL, setSortValue, statusURL])

  function convertDate(arr) {
      const data = []
      for (let i = 0; i < arr.length;i++){
        const date = new Date(arr[i]),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        data.push([day, mnth, date.getFullYear()].join("-"))
      }
      return data;
  }

  const handleReset = ()=>{
    setDates(undefined)
    setStatus("")
    setKeyWord("")
    DataFilter({})
    navigate({
      pathname: pathname,
      search: "",
    });
  }

  useEffect(()=>{
    let data = {}
    if(dates?.length > 0 && dates[1]){
        const arr = convertDate(dates)
        data.start_date = arr[0]
        data.end_date = arr[1]
    }

    if(status !==""){
        data.status = status.trim()
    }

      data.keyword = keyword

    if(sortBy !== "" && sortValue !== "" && sortBy){
      data.sort_by = sortBy
      data.sort_value = sortValue
    }

    if(Object.keys(data)?.length > 0){
      let result = "" ;
      Object.keys(data).forEach((item)=>{
        result += `&${item}=${data[item]}`
      })
      if(result !== ""){
        if(keyword === ""){
          let removeKey = result.replace("keyword=","")
          removeKey = result.replace("&keyword=","")
          result = removeKey
        }
        
        const newResult = result.replace("&","?").trim()
        setsearch(newResult)
      }
    }
  },[dates, keyword, sortBy, sortValue, status, setsearch])

  const sendFilter = React.useCallback(()=>{
    let result = search
    if(pageURL){
      result += `&page=${pageURL}`
    }
    if(perpageURL){
      result += `&perpage=${perpageURL}`
    }

    navigate({
      pathname: pathname,
      search: result,
    });

    DataFilter(search)

  },[search, navigate, pathname, DataFilter, pageURL, perpageURL])

  useEffect(()=>{
    const timeout = setTimeout(() => {
      sendFilter()
    }, 700);

    return () => clearTimeout(timeout);

  },[sendFilter])

  useEffect(() => {
    const handleClickOutSide = (e)=>{
      const el = document.querySelector(".page__filter")
      if(isOpenFilter && !el?.contains(e.target)){
        setIsOpenFilter(false)
      }
    }
    window.addEventListener('mousedown', handleClickOutSide);

    return ()=>{
      window.removeEventListener('mousedown',handleClickOutSide)
    }

  },[isOpenFilter])

  return (
    <>
      <img src="images/filter_btn.svg" alt="" className="btn_filter" onClick={()=>setIsOpenFilter(!isOpenFilter)}/>
      <div className={`page__filter align-items-center flex grid ${!isOpenFilter && "hide_filter"} `}>
        <img src="images/reset.svg" alt="" onClick={handleReset}/>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className="filter__search field col-6 md:col-3"
      >
        <TextField
          label="Tìm kiếm"
          id="outlined-size-small"
          value={keyword}
          size="small"
          className="filter__input--search"
          onChange={(e)=>setKeyWord(e.target.value)}
        />
        <img src="../../images/search_blue.svg" alt="" className="filter__btn--search"/>
      </Box>
      
      <DatePicker dates={dates} setDates={setDates} />
      
      <FormControl sx={{ m: 1, minWidth: 270 }} size="small" className="fiter__status">
      <InputLabel id="filter__label">Trạng thái</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="status__select"
          value={status}
          label="Age"
          onChange={(e)=>setStatus(e.target.value)}
        >
        {
            setDropDown.map((item, index) => (
                <MenuItem value={item.id} key={index} className="status__option">
                    <span className="status__content">{item.status}</span>
                </MenuItem>
            ))
        }
        </Select>
      </FormControl>
      </div>
    </>
  )
}

export default Filter 




