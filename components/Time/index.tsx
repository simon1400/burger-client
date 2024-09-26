import { parseDate } from "helpers/parseDate";
import { FC } from "react";

const Time: FC<{ from: string; to: string }> = ({ from, to }) => {
  const parseFrom = parseDate(from);
  const parseTo = parseDate(to);

  return (
    <time>
      {`${parseFrom.day}.${parseFrom.month + 1}.`} -{" "}
      {`${parseTo.day}.${parseTo.month + 1}.`} {parseFrom.year}
    </time>
  );
};

export default Time;
