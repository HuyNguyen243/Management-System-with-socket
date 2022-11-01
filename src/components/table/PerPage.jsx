import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate,useLocation} from "react-router-dom"

const limitBtn = [10,25,50]

const PerPage = ({perpage, setPerpage}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const {pathname} = location

    const handlePerPage = (e)=>{
        setPerpage(e.target.value)

        navigate({
            pathname: pathname,
            search: "?perpage=" + e.target.value,
          });
    }

  return (
    <div className="table__limit">
        <span>Rows per page:</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="table__limit">
            <Select
                value={perpage}
                onChange={handlePerPage}
            >
            {
                limitBtn.map((item,index)=>(
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                ))
            }

            </Select>
        </FormControl>
    </div>
  )
}

export default PerPage