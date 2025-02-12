import type { FC } from 'react'

import Link from 'next/link'
import ChevronDown from 'public/img/chevron-up.svg'
import { useState } from 'react'

import { NavS } from './styled'

const Nav: FC<{ data: any }> = ({ data }) => {
  const [activeDropdown, setActiveDropdown] = useState(false)

  const handleOpen = (e: any) => {
    e.preventDefault()
    setActiveDropdown(!activeDropdown)
  }

  return (
    <NavS>
      <ul>
        {data.map((item: any, idx: number) => {
          return item.child.length ? (
            <li key={idx} className={`dropdown-parent${activeDropdown ? ' active' : ''}`}>
              <Link href={'/'} onClick={(e) => handleOpen(e)}>
                {item.title}
                <ChevronDown />
              </Link>
              <div className={'dropdown'}>
                <ul>
                  {item.child.map((itemChild: any, idxChild: number) => (
                    <li key={idxChild}>
                      <Link href={itemChild.link}>{itemChild.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ) : (
            <li key={idx}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </NavS>
  )
}

export default Nav
