import Link from "next/link";
import { MenuS, NavS } from "./styled";
import ChevronDown from "public/img/chevron-up.svg";
import { FC, useState } from "react";
import { MenuItem } from "@mui/material";

const Nav: FC<{ data: any }> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: any) => {
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavS>
      <ul>
        {data.map((item: any, idx: number) => {
          return !!item.child.length ? (
            <li key={idx}>
              <Link
                href={item.link}
                className={anchorEl ? "active-dropdown" : undefined}
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                onMouseOver={handleClick}
              >
                {item.title}
                <ChevronDown />
              </Link>
              <MenuS
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                {item.child.map((child: any, idx: number) => (
                  <MenuItem key={idx} onClick={handleClose}>
                    <Link href={child.link}>{child.title}</Link>
                  </MenuItem>
                ))}
              </MenuS>
            </li>
          ) : (
            <li key={idx}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </NavS>
  );
};

export default Nav;
