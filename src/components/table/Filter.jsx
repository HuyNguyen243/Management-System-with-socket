import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {arrStatus} from "./status"
import DatePicker from "./DatePicker"

const Filter = ({DataFilter}) => {
  const [dates,setDates] = React.useState(undefined)
  const [status, setStatus] = React.useState('');
  const [keyword,setKeyWord ] = React.useState('');

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

  useEffect(()=>{
    let data = {}
    if(dates?.length > 0 && dates[1]){
        const arr = convertDate(dates)
        data.startDate = arr[0]
        data.endDate = arr[1]
    }
    if(status !==""){
        data.status = status
    }

    if(keyword !== ""){
      data.keyword = keyword
    }

    const timeout = setTimeout(() => {
      if(Object.keys(data).length > 0){
        DataFilter(data)
      }
      }, 1000);
    return () => clearTimeout(timeout);

  },[DataFilter,dates,keyword,status])

  const handleReset = ()=>{
    setDates(undefined)
    setStatus("")
    setKeyWord("")
    DataFilter({})
  }

  return (
      <div className="page__filter align-items-center flex grid">
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
      
      <DatePicker dates={dates} setDates={setDates}/>

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
            arrStatus.map((item,index)=>(
                <MenuItem value={item.id} key={index} className="status__option">
                    <img src={`../../images/${item.image}.svg`} alt="" className="status__image"/>
                    <span className="status__content">{item.status}</span>
                </MenuItem>
            ))
        }
        </Select>
      </FormControl>
      </div>
  )
}

export default Filter 