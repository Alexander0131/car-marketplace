import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaBars } from 'react-icons/fa'
import { customRoutes } from './../../configs/allRoutes'
import { Link } from 'react-router-dom'

function DropdownMenuField() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline"><FaBars/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-65">
            <DropdownMenuGroup>
                {customRoutes.map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <Link className='font-bold w-full p-1 border-b' to={item.route}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default DropdownMenuField
