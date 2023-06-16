import Link from "next/link";
import { NavS } from "./styled";
import ChevronDown from "public/img/chevron-up.svg";
import { FC, useState } from "react";

const Nav: FC<{ data: any }> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavS>
      <ul>
        {data.map((item: any, idx: number) => {
          return !!item.child.length ? (
            <li key={idx} className="dropdown-parent">
              <Link href="/">
                {item.title}
                <ChevronDown />
              </Link>
              <div className="dropdown">
                <ul>
                  {item.child.map((itemChild: any, idxChild: number) => <li key={idxChild}><a href={itemChild.link}>{itemChild.title}</a></li>)}
                </ul>
              </div>
            </li>
          ) : (
            <li key={idx}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </NavS>
  );
};

export default Nav;
