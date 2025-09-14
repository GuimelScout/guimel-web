import React from "react";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode2";
import { BulbIcon } from "../../../../../../components/Guimel/icons";
import { MENU_ITEM_CLASSES } from "../constants";

const DarkModeToggle: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
      <div className="flex items-center">
        <div className={MENU_ITEM_CLASSES.iconContainer}>
          <BulbIcon className="text-current" size={24} />
        </div>
        <div className={MENU_ITEM_CLASSES.textContainer}>
          <p className={MENU_ITEM_CLASSES.text}>Tema oscuro</p>
        </div>
      </div>
      <SwitchDarkMode2 />
    </div>
  );
};

export default React.memo(DarkModeToggle);