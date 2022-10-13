import type { NextApiRequest, NextApiResponse } from "next";
import { CardProps } from "../../components/Card";

import { data } from "../../utils/data";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CardProps[]>
) {
  res.status(200).send(data);
}
