import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import {
  FaGithub,
  FaDiscord,
  FaThreads,
} from "react-icons/fa6";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  logout: HiOutlineArrowRightStartOnRectangle,
  settings: HiOutlineCog6Tooth,
  github: FaGithub,
  discord: FaDiscord,
  threads: FaThreads,
  book: HiOutlineBookOpen,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;