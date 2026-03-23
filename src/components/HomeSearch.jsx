import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from './ui/separator'
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa6';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FaSearch } from 'react-icons/fa';

function HomeSearch() {

    const [searchValue, setSearchValue] = useState("");



  return (
    <div className='w-full flex flex-col items-center justify-center'>

        <div className='p-2 md:p-5 bg-white rounded-md md:rounded-full w-[60%] flex mt-10 gap-5'>
          <Input 
            type="text"
            name="homeSearchBox"
            placeholder="Search for any car or hint"
            className="bg-inherit"
            onChange={(e) => setSearchValue(e.target.value)}
          />
            <Button>
                <Link to={'/search?q='+searchValue} className='flex gap-2 items-center'>
                    <FaSearch/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default HomeSearch
